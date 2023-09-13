import shopModel from "../models/shop.model";
import bcrypt from "bcrypt";
import KeyTokenService from "./keyToken.service";
import {createTokenPair} from "../auth/authUtils";
import crypto from "crypto";
import {getInfoData} from "../utils";
import {
	AuthFailureError,
	BadRequestError,
	ForbiddenError,
} from "../core/error.response";
import {findByEmail} from "./shop.service";
import KeyTokenModel from "../models/keytoken.model";
import {Types} from "mongoose";
const RoleShop = {
	SHOP: "SHOP",
	WRITER: "WRITER",
	EDITOR: "EDITOR",
	ADMIN: "ADMIN",
};
class AccessService {
	signUpService = async ({name, password, email}) => {
		const foundShop = await shopModel.findOne({email}).lean();
		if (foundShop) {
			throw new BadRequestError("Shop already exists");
		}
		const hashPassword = await bcrypt.hash(password, 10);
		const newShop = await shopModel.create({
			name,
			password: hashPassword,
			email,
			roles: [RoleShop.SHOP],
		});
		if (newShop) {
			const privateKey = crypto.randomBytes(64).toString("hex");
			const publicKey = crypto.randomBytes(64).toString("hex");

			const keyStore = await KeyTokenService.createKeyToken({
				userId: newShop._id,
				publicKey, //accessToken,
				privateKey, //refreshToken,
			});

			if (!keyStore) {
				return {
					code: "xxxx",
					message: "keyStore error",
				};
			}
			//created token pairs (accessToken, refreshToken)
			const tokens = await createTokenPair(
				{userId: newShop._id, email},
				publicKey,
				privateKey
			);

			return {
				code: "201",
				metadata: {
					shop: getInfoData(["id", "name", "email"], newShop),
					tokens,
				},
			};
		}
		return {
			code: "200",
			metadata: null,
		};
	};
	loginService = async ({email, password}) => {
		//1. check email
		const foundShop = await findByEmail({email});
		if (!foundShop) {
			throw new BadRequestError("Shop not signed up");
		}
		//2. compare password
		const isMatch = await bcrypt.compare(password, foundShop.password);
		if (!isMatch) {
			throw new BadRequestError("Authentication failed");
		}
		//3. create token pairs
		const privateKey = crypto.randomBytes(64).toString("hex");
		const publicKey = crypto.randomBytes(64).toString("hex");
		//4. generate token pairs
		const tokens = await createTokenPair(
			{userId: foundShop._id, email},
			publicKey,
			privateKey
		);
		//5. store key token
		await KeyTokenService.createKeyToken({
			userId: foundShop._id,
			publicKey,
			privateKey,
			refreshToken: tokens.refreshToken,
		});
		return {
			code: "201",
			metadata: {
				shop: getInfoData(["id", "name", "email"], foundShop),
				tokens,
			},
		};
	};
	logoutService = async (keyStore) => {
		return await KeyTokenService.removeKeyToken(keyStore._id);
	};
	handleRefreshTokenService = async ({refreshToken, keyStore, user}) => {
		const {userId, email} = user;

		if (keyStore?.refreshTokensUsed?.includes(refreshToken)) {
			await KeyTokenService.removeKeyToken(keyStore._id);
			throw new ForbiddenError("Something went wrong");
		}
		if (keyStore.refreshToken !== refreshToken) {
			throw new AuthFailureError("Shop not found 1");
		}
		const foundShop = await findByEmail({email});
		if (!foundShop) {
			throw new AuthFailureError("Shop not found 2");
		}
		const tokens = await createTokenPair(
			{userId, email},
			keyStore.publicKey,
			keyStore.privateKey
		);

		await KeyTokenModel.updateOne(
			{_id: new Types.ObjectId(keyStore._id)},
			{
				$set: {
					refreshToken: tokens.refreshToken,
				},
				$addToSet: {
					refreshTokensUsed: refreshToken,
				},
			}
		);
		return {
			user,
			tokens,
		};
	};
}
export default new AccessService();
