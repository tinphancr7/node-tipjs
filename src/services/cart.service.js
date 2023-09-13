import CartModel from "../models/cart.model";

class CartService {
	static async createdUserCart({userId, product}) {
		const query = {cart_userId: userId, cart_state: "active"};
		const updateOrInsert = {
			$addToSet: {cart_products: product},
		};
		const options = {
			upsert: true,
			new: true,
		};
		return await CartModel.findOneAndUpdate(query, updateOrInsert, options);
	}
	static async updateUserCartQuantity({userId, product}) {
		const {productId, quantity} = product;
		const query = {
			cart_userId: userId,
			"cart_products.productId": productId,
			cart_state: "active",
		};
		const updateSet = {
			$inc: {
				"cart_products.$.quantity": quantity,
			},
		};
		const options = {
			upsert: true,
			new: true,
		};
		return await CartModel.findOneAndUpdate(query, updateSet, options);
	}
	static async addToCart({userId, product}) {
		//check if cart is empty
		const userCart = await CartModel.findOne({
			cart_userId: userId,
		});
		//cart is empty
		if (!userCart) {
			return await CartService.createdUserCart({userId, product});
		}
		//cart already has products, but product is not in cart
		if (!userCart.cart_products.length) {
			userCart.cart_products.push(product);

			return await userCart.save();
		}
		//cart already has products, and product is  in cart
		return await CartService.updateUserCartQuantity({userId, product});
	}
	//update cart
	// shop_order_ids:[
	//     {
	//         shopId,
	//         item_products:[
	//             {
	//                 productId,
	//                 quantity,
	//                 old_quantity,
	//                 shopId,
	//                 price,
	//             }
	//         ]
	//     }
	// ]
	static async addToCartV2({userId, product}) {
		const {productId, quantity, old_quantity} =
			shop_order_ids[0]?.item_products[0];
		const foundProduct = await ProductModel.findOne({
			_id: productId,
		});
		if (!foundProduct) {
			throw new Error("Product not found");
		}
		if (foundProduct.product_shop.toString() !== shop_order_ids[0]?.shopId) {
			throw new Error("Product not found");
		}
		return await CartService.updateUserCartQuantity({
			userId,
			product: {
				productId,
				quantity: quantity - old_quantity,
			},
		});
	}
	static async deleteUserCart({userId, productId}) {
		const query = {
			cart_userId: userId,
			cart_state: "active",
		};
		const updateSet = {
			$pull: {
				cart_products: {
					productId: productId,
				},
			},
		};
		return await CartModel.deleteOne(query, updateSet);
	}
}
export default CartService;
