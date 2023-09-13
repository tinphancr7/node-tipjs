import {model} from "mongoose";
import {Schema} from "mongoose";
const DOCUMENT_NAME = "Cart";
const COLLECTION_NAME = "Carts";
const cartSchema = new Schema(
	{
		cart_state: {
			type: String,
			enum: ["active", "completed", "cancelled", "pending"],
			default: "active",
		},

		cart_products: {
			type: Array,
			default: [],
			required: true,
		},
		cart_count_product: {
			type: Number,
			default: 0,
		},
		cart_userId: {
			type: Schema.Types.ObjectId,
			ref: "Shop",
			required: true,
		},
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	}
);

export default model(DOCUMENT_NAME, cartSchema);
