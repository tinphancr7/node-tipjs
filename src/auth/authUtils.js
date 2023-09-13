import JWT from "jsonwebtoken";

import {AuthFailureError} from "../core/error.response";
import KeyTokenService from "../services/keyToken.service";
import {HEADER} from "../constants";

const createTokenPair = async (payload, publicKey, privateKey) => {
	try {
		const accessToken = await JWT.sign(payload, publicKey, {
			expiresIn: "2d",
		});
		const refreshToken = await JWT.sign(payload, privateKey, {
			expiresIn: "7d",
		});
		JWT.verify(accessToken, publicKey, (err, decoded) => {
			if (err) {
				console.log(err);
			} else {
				console.log(decoded);
			}
		});

		return {
			accessToken,
			refreshToken,
		};
	} catch (error) {}
};

const authentication = async (req, res, next) => {
	// 1 - check userId missing?
	// 2 - get access token
	// 3- verify access token
	// 4 - check user in db
	// 5 - check keystore with this userId?
	// 6 - Ok all => return next()
	const userId = req.headers[HEADER.CLIENT_ID];
	if (!userId) {
		throw new AuthFailureError("Invalid request");
	}
	const keyStore = await KeyTokenService.findKeyToken(userId);

	if (!keyStore) {
		throw new NotFoundError("KeyStore not found");
	}
	//3
	const refreshToken = req.headers[HEADER.REFRESHTOKEN];
	if (refreshToken) {
		try {
			const decodedUser = JWT.verify(refreshToken, keyStore.privateKey);

			if (userId != decodedUser.userId) {
				throw new AuthFailureError("Invalid request");
			}
			req.keyStore = keyStore;
			req.user = decodedUser;
			req.refreshToken = refreshToken;
			return next();
		} catch (error) {
			throw error;
		}
	}

	const accessToken = req.headers[HEADER.AUTHENTICATION];

	if (!accessToken) {
		throw new AuthFailureError("Invalid request");
	}
	try {
		const decodedUser = JWT.verify(accessToken, keyStore.publicKey);
		if (userId != decodedUser.userId) {
			throw new AuthFailureError("Invalid request");
		}
		req.keyStore = keyStore;
		req.user = decodedUser;
		req.refreshToken = refreshToken;
		return next();
	} catch (error) {
		throw error;
	}
};

export {createTokenPair, authentication};
