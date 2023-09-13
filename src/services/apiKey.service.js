import apiKeyModel from "../models/apiKey.model";
import crypto from "crypto";

const findApiKeyService = async (key) => {
	const newKey = await apiKeyModel.create({
		key: crypto.randomBytes(64).toString("hex"),
		status: true,
		permissions: ["0000"],
	});
	console.log(newKey);

	return await apiKeyModel.findOne({key, status: true}).lean();
};
export {findApiKeyService};
