import {SuccessResponse} from "../core/success.response";
import DiscountService from "../services/discount.service";

class DiscountController {
	getDiscountAmount = async (req, res, next) => {
		return new SuccessResponse({
			message: "Product created successfully",
			metadata: await DiscountService.createProduct(req.body.product_type, {
				...req.body,
				product_shop: "64737177f0225c0dc7aaa4a9",
			}),
		}).send(res);
	};
	getAllDiscountWithProducts = async (req, res, next) => {
		return new SuccessResponse({
			message: "Product created successfully",
			metadata: await DiscountService.createProduct(req.body.product_type, {
				...req.body,
				product_shop: "64737177f0225c0dc7aaa4a9",
			}),
		}).send(res);
	};
	createDiscountCode = async (req, res, next) => {
		return new SuccessResponse({
			message: "Product created successfully",
			metadata: await DiscountService.createProduct(req.body.product_type, {
				...req.body,
				product_shop: "64737177f0225c0dc7aaa4a9",
			}),
		}).send(res);
	};
	getAllDiscountCodes = async (req, res, next) => {
		return new SuccessResponse({
			message: "Product created successfully",
			metadata: await DiscountService.createProduct(req.body.product_type, {
				...req.body,
				product_shop: "64737177f0225c0dc7aaa4a9",
			}),
		}).send(res);
	};
}
export default new DiscountController();
