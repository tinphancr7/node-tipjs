import {SuccessResponse} from "../core/success.response";
import ProductService from "../services/product.service";

class ProductController {
	//get all products
	getAllProducts = async (req, res, next) => {
		return new SuccessResponse({
			message: "Get list products successfully",
			metadata: await ProductService.getAllProductsService(req.query),
		}).send(res);
	};
	getSingleProduct = async (req, res, next) => {
		return new SuccessResponse({
			message: "Get single product successfully",
			metadata: await ProductService.getSingleProductService(
				req.params.product_id
			),
		}).send(res);
	};
	//create product by shop
	createProduct = async (req, res, next) => {
		return new SuccessResponse({
			message: "Product created successfully",
			metadata: await ProductService.createProductService(
				req.body.product_type,
				{
					...req.body,
					product_shop: req.user.userId,
				}
			),
		}).send(res);
	};
	// get all publish product by shop
	getAllPublishForShop = async (req, res, next) => {
		return new SuccessResponse({
			message: "Get list Publish successfully",
			metadata: await ProductService.getAllPublishForShopService({
				product_shop: req.user.userId,
			}),
		}).send(res);
	};
	// publish product by shop
	publishProductByShop = async (req, res, next) => {
		return new SuccessResponse({
			message: "Product published successfully",
			metadata: await ProductService.publishProductByShopService({
				product_shop: req.user.userId,
				product_id: req.params.id,
			}),
		}).send(res);
	};
	// unPublish product by shop
	unPublishProductByShop = async (req, res, next) => {
		return new SuccessResponse({
			message: "Product published successfully",
			metadata: await ProductService.unPublishProductByShopService({
				product_shop: req.user.userId,
				product_id: req.params.id,
			}),
		}).send(res);
	};
	// get all draft product by shop
	getAllDraftsForShop = async (req, res, next) => {
		return new SuccessResponse({
			message: "Get list drafts successfully",
			metadata: await ProductService.getAllDraftsForShopService({
				product_shop: req.user.userId,
			}),
		}).send(res);
	};
	// search products
	searchProducts = async (req, res, next) => {
		const {keySearch} = req.body;

		return new SuccessResponse({
			message: "Search products successfully",
			metadata: await ProductService.searchProductsService(keySearch),
		}).send(res);
	};

	//
	updateProduct = async (req, res, next) => {
		return new SuccessResponse({
			message: "Update product successfully",
			metadata: await ProductService.updateProductService(
				req.body.product_type,
				req.params.product_id,
				req.body
			),
		}).send(res);
	};
}
export default new ProductController();
