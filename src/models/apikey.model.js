import mongoose from "mongoose";
const DOCUMENT_NAME = "Apikey";
const COLLECTION_NAME = "Apikeys";
const apiKeySchema = new mongoose.Schema(
	{
		key: {
			type: String,
			required: true,
		},
		status: {
			type: Boolean,
			default: true,
		},
		permissions: {
			type: [String],
			required: true,
			enum: ["0000", "1111", "2222"],
		},
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	}
);

export default mongoose.model(DOCUMENT_NAME, apiKeySchema);
