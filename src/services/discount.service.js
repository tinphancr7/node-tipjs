import {Types} from "mongoose";
import discountModel from "../models/discount.model";
import {findAllProducts} from "../models/repositories/product.repo";
import {checkDiscountExists} from "../models/repositories/discount.repo";
import {NotFoundError} from "../core/error.response";

class DiscountService {
	static async createDiscountCode(payload) {
		const {
			code,
			name,
			description,
			max_value,
			start_date,
			end_date,
			shopId,
			is_active,
			type,
			value,
			max_uses,
			max_uses_per_user,
			min_order_value,
			uses_count,
			users_used,
			applies_to,
			product_ids,
		} = payload;

		if (
			new Date() < new Date(start_date) ||
			new Date() > new Date(end_date) ||
			new Date(start_date) > new Date(end_date)
		) {
			throw new BadRequestError("Invalid date");
		}

		const foundDiscount = await discountModel.find({
			discount_code: code,
			discount_shopId: new Types.ObjectId(shopId),
		});
		if (foundDiscount && foundDiscount.discount_is_active)
			throw new BadRequestError("Discount already exists");

		const newDiscount = await discountModel.create({
			discount_name: name,
			discount_description: description,
			discount_type: type,
			discount_code: code,
			discount_value: value,
			discount_min_order_value: min_order_value || 0,
			discount_max_value: max_value,
			discount_start_date: new Date(start_date),
			discount_end_date: new Date(end_date),
			discount_max_uses: max_uses,
			discount_uses_count: uses_count,
			discount_users_used: users_used,
			discount_shopId: shopId,
			discount_max_uses_per_user: max_uses_per_user,
			discount_is_active: is_active,
			discount_applies_to: applies_to,
			discount_product_ids: applies_to === "all" ? [] : product_ids,
		});
		return newDiscount;
	}

	static async getAllDiscountCodeWithProduct({code, shopId, limit, page}) {
		const foundDiscount = await discountModel.findOne({
			discount_code: code,
			discount_shopId: new Types.ObjectId(shopId),
		});
		if (!foundDiscount || !foundDiscount.discount_is_active)
			throw new BadRequestError("Discount not found");

		const {discount_applies_to, discount_product_ids} = foundDiscount;
		let products = [];
		if (discount_applies_to === "all") {
			products = await findAllProducts({
				filter: {
					product_shopId: new Types.ObjectId(shopId),
					isPublished: true,
				},
				limit: +limit,
				page: +page,
				sort: "ctime",
				select: ["product_name"],
			});
		}
		if (discount_applies_to === "specific") {
			products = await findAllProducts({
				filter: {
					_id: {$in: discount_product_ids},
					isPublished: true,
				},
				limit: +limit,
				page: +page,
				sort: "ctime",
				select: ["product_name"],
			});
		}
		return products;
	}
	static async getAllDiscountCodeByShop({shopId, limit, page}) {
		const discounts = await findAllDiscountCodeUnSelect({
			filter: {discount_shopId: new Types.ObjectId(shopId)},
			limit: +limit,
			page: +page,
			sort: "ctime",
			unSelect: ["discount_shopId", "__v"],
			model: discountModel,
		});
		return discounts;
	}

	static async getDiscountAmount({codeId, userId, shopId, products}) {
		const foundDiscount = checkDiscountExists({
			model: discountModel,
			filter: {
				discount_code: codeId,
				discount_shopId: new Types.ObjectId(shopId),
			},
		});
		if (!foundDiscount) throw new BadRequestError("Discount not found");

		const {
			discount_is_active,
			discount_max_uses,
			discount_min_order_value,
			discount_max_uses_per_user,
			discount_start_date,
			discount_end_date,
			discount_users_used,
			discount_type,
			discount_value,
		} = foundDiscount;
		if (!discount_is_active) throw new NotFoundError("Discount is expried");
		if (discount_max_uses === 0)
			throw new NotFoundError("Discount is out of stock");
		if (
			new Date() < new Date(discount_start_date) ||
			new Date() > new Date(discount_end_date)
		)
			throw new NotFoundError("Discount is expried");

		let totalOrder = 0;
		if (discount_min_order_value > 0) {
			totalOrder = products.reduce((total, product) => {
				return total + product.product_price * product.product_quantity;
			}, 0);
		}
		if (totalOrder < discount_min_order_value)
			throw new NotFoundError(
				"Discount is required min order value of " + discount_min_order_value
			);

		if (discount_max_uses_per_user > 0) {
			const userUseDiscount = discount_users_used.find(
				(user) => user.userId === userId
			);
			if (userUseDiscount && userUseDiscount.uses >= discount_max_uses_per_user)
				throw new NotFoundError(
					"Discount is out of stock for this user " + discount_max_uses_per_user
				);
		}
		//check discount  is fixed or percent
		const amount =
			discount_type === "fixed_amount"
				? discount_value
				: totalOrder * (discount_value / 100);
		return {
			totalOrder,
			discount: amount,
			totalPrice: totalOrder - amount,
		};
	}

	static async deleteDiscountCode({codeId, shopId}) {
		const foundDiscount = await checkDiscountExists({
			model: discountModel,
			filter: {
				discount_code: codeId,
				discount_shopId: new Types.ObjectId(shopId),
			},
		});
		if (!foundDiscount) throw new BadRequestError("Discount not found");
		const deleted = await discountModel.deleteOne({
			discount_code: codeId,
			discount_shopId: new Types.ObjectId(shopId),
		});
	}
}

export default DiscountService;
