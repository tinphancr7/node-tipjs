import {Types} from "mongoose";
import {ProductModel} from "../product.model";

import {getSelectData, unSelectData} from "../../utils";
// find all drafts product by shop
const findAllDraftsForShopRepo = async ({query, limit, skip}) => {
	return await queryProduct({query, limit, skip});
};
// find all publish product by shop
const findAllPublishForShopRepo = async ({query, limit, skip}) => {
	return await queryProduct({query, limit, skip});
};
const queryProduct = async ({query, limit, skip}) => {
	return await ProductModel.find(query)
		.populate("product_shop", "name email -_id")
		.limit(limit)
		.skip(skip)
		.lean()
		.exec();
};
//publish product by shop
const publishProductByShopRepo = async ({product_shop, product_id}) => {
	const foundShop = await ProductModel.findOne({
		_id: new Types.ObjectId(product_id),
		product_shop: new Types.ObjectId(product_shop),
	});
	if (!foundShop) throw new BadRequestError("Product not found");
	foundShop.isDraft = false;
	foundShop.isPublished = true;
	const {modifiedCount} = await foundShop.updateOne(foundShop);
	return modifiedCount;
};
// unPublish product by shop
const unPublishProductByShopRepo = async ({product_shop, product_id}) => {
	const foundShop = await ProductModel.findOne({
		_id: new Types.ObjectId(product_id),
		product_shop: new Types.ObjectId(product_shop),
	});
	if (!foundShop) throw new BadRequestError("Product not found");
	foundShop.isDraft = true;
	foundShop.isPublished = false;
	const {modifiedCount} = await foundShop.updateOne(foundShop);
	return modifiedCount;
};
const findAllProductsRepo = async ({limit, sort, page, filter, select}) => {
	const skip = (page - 1) * +limit;
	const sortBy = sort === "ctime" ? {_id: -1} : {_id: 1};
	const selectObj = getSelectData(select);
	return await ProductModel.find(filter)
		.sort(sortBy)
		.skip(skip)
		.limit(limit)
		.select(selectObj)
		.lean()
		.exec();
};
const findSingleProductRepo = async ({product_id, unSelect}) => {
	return await ProductModel.findById(product_id)
		.select(unSelectData(unSelect))
		.lean()
		.exec();
};

// const searchProductsRepo = async (keySearch) => {
// 	const regexSearch = new RegExp(keySearch, "i");

// 	const products = await ProductModel.find(
// 		{
// 			isPublished: true,
// 			$text: {$search: regexSearch},
// 		},
// 		{score: {$meta: "textScore"}}
// 	)
// 		.sort({score: {$meta: "textScore"}})
// 		.lean();
// 	return products;
// };
const searchProductsRepo = async (keySearch) => {
	const products = await ProductModel.find({
		isPublished: true,
		$or: [
			{
				product_name: {
					$regex: keySearch,
				},
				product_description: {
					$regex: keySearch,
				},
			},
		],
	});
	return products;
};
const updateProductRepo = async ({
	product_id,
	updateBody,
	model,
	isNew = true,
}) => {
	return await model.findByIdAndUpdate(product_id, updateBody, {
		new: isNew,
	});
};

export {
	findAllDraftsForShopRepo,
	publishProductByShopRepo,
	unPublishProductByShopRepo,
	findAllPublishForShopRepo,
	searchProductsRepo,
	findAllProductsRepo,
	findSingleProductRepo,
	updateProductRepo,
};
