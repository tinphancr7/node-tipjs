import mongoose from "mongoose";
const DOCUMENT_NAME = "Shop";
const COLLECTION_NAME = "Shops";
const shopSchema = new mongoose.Schema(
	{
		name: {type: String, trim: true, maxLength: 150},
		email: {type: String, trim: true, required: true},
		password: {type: String, required: true},
		status: {type: String, enum: ["active", "inactive"], default: "inactive"},
		verify: {
			token: {type: Boolean, default: false},
		},
		roles: {type: Array, default: []},
	},
	{collection: COLLECTION_NAME, timestamps: true}
);

export default mongoose.model(DOCUMENT_NAME, shopSchema);
