import {CREATED, SuccessResponse} from "../core/success.response";
import CartService from "../services/cart.service";

class CartController {
	addToCart = async (req, res, next) => {
		return new SuccessResponse({
			message: "Create new cart successfully",
			metadata: await CartService.addToCart(req.body),
		}).send(res);
	};
	update = async (req, res, next) => {
		return new SuccessResponse({
			message: "Create new cart successfully",
			metadata: await CartService.addToCartV2(req.body),
		}).send(res);
	};
	delete = async (req, res, next) => {
		return new SuccessResponse({
			message: "Create new cart successfully",
			metadata: await CartService.deleteUserCart(req.body),
		}).send(res);
	};
	listToCart = async (req, res, next) => {
		return new SuccessResponse({
			message: "Create new cart successfully",
			metadata: await CartService.getListUserCart(req.body),
		}).send(res);
	};
}
export default new CartController();
