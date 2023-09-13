import {Schema, model} from "mongoose";
import slugify from "slugify";
const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";
const productSchema = new Schema(
	{
		product_name: {
			type: String,
			required: true,
			trim: true,
		},
		product_slug: {
			type: String,
		},
		product_thumb: {
			type: String,
			required: true,
		},
		product_description: {
			type: String,
		},
		product_price: {
			type: Number,
			required: true,
		},
		product_quantity: {
			type: String,
			required: true,
		},
		product_type: {
			type: String,
			required: true,
			enum: ["Electronic", "Clothing", "Furniture"],
		},
		product_shop: {
			type: Schema.Types.ObjectId,
			ref: "Shop",
		},
		product_attributes: {
			type: Schema.Types.Mixed,
			required: true,
		},
		product_ratingAvarage: {
			type: Number,
			default: 4.5,
			set: (val) => Math.round(val * 10) / 10,
		},
		product_variations: {
			type: Array,
			default: [],
		},
		isDraft: {
			type: Boolean,
			default: true,
			index: true,
			select: false,
		},
		isPublished: {
			type: Boolean,
			default: false,
			index: true,
			select: false,
		},
	},
	{collection: COLLECTION_NAME, timestamps: true}
);
productSchema.index({product_name: "text", product_description: "text"});
productSchema.pre("save", function (next) {
	this.product_slug = slugify(this.product_name, {lower: true});
	next();
});

const clothingSchema = new Schema(
	{
		brand: {
			type: String,
			required: true,
		},
		color: String,
		size: String,
		material: String,
		product_shop: {
			type: Schema.Types.ObjectId,
			ref: "Shop",
		},
	},
	{collection: "Clothings", timestamps: true}
);
const electronicSchema = new Schema(
	{
		manufacturer: {
			type: String,
			required: true,
		},
		model: String,
		color: String,
		product_shop: {
			type: Schema.Types.ObjectId,
			ref: "Shop",
		},
	},
	{collection: "Electronics", timestamps: true}
);
const furnitureSchema = new Schema(
	{
		brand: {
			type: String,
			required: true,
		},
		color: String,
		size: String,
		material: String,
		product_shop: {
			type: Schema.Types.ObjectId,
			ref: "Shop",
		},
	},
	{collection: "Furnitures", timestamps: true}
);
const ProductModel = model(DOCUMENT_NAME, productSchema);
const ClothingModel = model("Clothing", clothingSchema);
const ElectronicModel = model("Electronic", electronicSchema);
const FurnitureModel = model("Furniture", furnitureSchema);

export {ProductModel, ClothingModel, ElectronicModel, FurnitureModel};
