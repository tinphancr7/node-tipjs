import keyTokenModel from "../models/keytoken.model";
import {Types} from "mongoose";

class KeyTokenService {
	static createKeyToken = async ({
		userId,
		publicKey,
		privateKey,
		refreshToken,
	}) => {
		try {
			const tokens = await keyTokenModel.findOneAndUpdate(
				{user: userId},
				{publicKey, privateKey, refreshToken, refreshTokensUsed: []},
				{upsert: true, new: true}
			);
			return tokens ? tokens.publicKey : null;
		} catch (error) {
			return error;
		}
	};
	static findKeyToken = async (userId) => {
		const result = await keyTokenModel
			.findOne({user: new Types.ObjectId(userId)})
			.lean();
		return result;
	};
	static removeKeyToken = async (id) => {
		return await keyTokenModel.deleteOne({_id: id}).lean();
	};
}

export default KeyTokenService;
