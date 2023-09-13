import {CREATED, SuccessResponse} from "../core/success.response";
import accessService from "../services/access.service";

class AccessController {
	login = async (req, res, next) => {
		new SuccessResponse({
			message: "Login successfully",
			metadata: await accessService.loginService(req.body),
		}).send(res);
	};
	signUp = async (req, res, next) => {
		new CREATED({
			message: "Sign up successfully",
			metadata: await accessService.signUpService(req.body),
		}).send(res);
	};
	logout = async (req, res, next) => {
		new SuccessResponse({
			message: "Logout successfully",
			metadata: await accessService.logoutService(req.keyStore),
		}).send(res);
	};
	handleRefreshToken = async (req, res, next) => {
		new SuccessResponse({
			message: "Get new token successfully",
			metadata: await accessService.handleRefreshTokenService({
				refreshToken: req.refreshToken,
				keyStore: req.keyStore,
				user: req.user,
			}),
		}).send(res);
	};
}
export default new AccessController();
