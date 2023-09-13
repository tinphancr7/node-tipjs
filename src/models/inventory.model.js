import {model} from "mongoose";
import {Schema} from "mongoose";
const DOCUMENT_NAME = "Inventory";
const COLLECTION_NAME = "Inventories";
const inventorySchema = new Schema(
	{
		iven_productId: {type: Schema.Types.ObjectId, ref: "Product"},
		iven_location: {type: String, default: "unKnown"},
		iven_stock: {type: Number, default: 0},
		iven_shopId: {type: Schema.Types.ObjectId, ref: "Shop"},
		iven_reservations: {type: Array, default: []},
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	}
);

export default model(DOCUMENT_NAME, inventorySchema);
