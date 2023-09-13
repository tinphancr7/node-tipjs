import inventoryModel from "../inventory.model";

const insertInventory = async ({
	productId,
	shopId,
	stock,
	location = "unKnown",
}) => {
	return await inventoryModel.create({
		iven_productId: productId,
		iven_location: location,
		iven_stock: stock,
		iven_shopId: shopId,
	});
};

export default insertInventory;
