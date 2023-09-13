import {HEADER} from "../constants";
import {findApiKeyService} from "../services/apiKey.service";

const apiKey = async (req, res, next) => {
	try {
		const key = req.headers[HEADER.API_KEY]?.toString();
		if (!key) {
			return res.status(403).json({
				message: "Forbidden Error",
			});
		}
		const objKey = await findApiKeyService(key);
		if (!objKey) {
			return res.status(403).json({
				message: "Forbidden Error",
			});
		}
		req.objKey = objKey;
		return next();
	} catch (error) {
		return next(error);
	}
};

const permission = (permission) => {
	return (req, res, next) => {
		if (!req.objKey.permissions) {
			return res.status(403).json({
				message: "permission denied",
			});
		}
		const validPermission = req.objKey.permissions.includes(permission);
		if (!validPermission) {
			return res.status(403).json({
				message: "permission denied",
			});
		}
		return next();
	};
};


export {apiKey, permission, HEADER};
