import {isNull, isUndefined, omitBy} from "lodash";
import {BadRequestError} from "../core/error.response.js";
import {
	ClothingModel,
	ElectronicModel,
	FurnitureModel,
	ProductModel,
} from "../models/product.model.js";
import {
	findAllDraftsForShopRepo,
	findAllProductsRepo,
	findAllPublishForShopRepo,
	findSingleProductRepo,
	publishProductByShopRepo,
	searchProductsRepo,
	unPublishProductByShopRepo,
	updateProductRepo,
} from "../models/repositories/product.repo.js";
import insertInventory from "../models/repositories/inventory.repo.js";

class ProductFactory {
	static productRegister = {};
	static registerProductType(type, classRef) {
		ProductFactory.productRegister[type] = classRef;
	}
	//get all products
	static async getAllProductsService({
		limit = 50,
		sort = "ctime",
		page = 1,
		filter = {isPublished: true},
		select = ["product_name", "product_thumb", "product_price"],
	}) {
		return await findAllProductsRepo({limit, sort, page, filter, select});
	}
	//get single product
	static async getSingleProductService(product_id) {
		return await findSingleProductRepo({product_id, unSelect: ["__v"]});
	}
	// publish product by shop
	static async publishProductByShopService({product_shop, product_id}) {
		return await publishProductByShopRepo({product_shop, product_id});
	}
	// unPublish product by shop
	static async unPublishProductByShopService({product_shop, product_id}) {
		return await unPublishProductByShopRepo({product_shop, product_id});
	}
	// get all draft product by shop
	static async getAllDraftsForShopService({
		product_shop,
		limit = 50,
		skip = 0,
	}) {
		const query = {product_shop, isDraft: true};
		return await findAllDraftsForShopRepo({query, limit, skip});
	}
	// get all publish product by shop
	static async getAllPublishForShopService({
		product_shop,
		limit = 50,
		skip = 0,
	}) {
		const query = {product_shop, isPublished: true};
		return await findAllPublishForShopRepo({query, limit, skip});
	}

	//create product by shop
	static async createProductService(type, payload) {
		const productClass = ProductFactory.productRegister[type];
		if (!productClass) throw new BadRequestError("Invalid product type");
		return new productClass(payload).createProductService();
	}
	// update product by shop
	static async updateProductService(type, product_id, payload) {
		const productClass = ProductFactory.productRegister[type];
		if (!productClass) throw new BadRequestError("Invalid product type");
		return new productClass(payload).updateProductService(product_id);
	}
	// search product
	static async searchProductsService(keySearch) {
		return await searchProductsRepo(keySearch);
	}
}
class Product {
	constructor({
		product_name,
		product_thumb,
		product_description,
		product_price,
		product_quantity,
		product_type,
		product_shop,
		product_attributes,
	}) {
		this.product_name = product_name;
		this.product_thumb = product_thumb;
		this.product_description = product_description;
		this.product_price = product_price;
		this.product_quantity = product_quantity;
		this.product_type = product_type;
		this.product_shop = product_shop;
		this.product_attributes = product_attributes;
	}
	async createProductService(product_id) {
		const newProduct = await ProductModel.create({
			...this,
			_id: product_id,
		});
		if (newProduct) {
			await insertInventory({
				productId: newProduct.product_id,
				shopId: this.product_shop,
				stock: this.product_quantity,
			});
		}
		return newProduct;
	}
	async updateProductService(product_id, updateBody) {
		return await updateProductRepo({
			product_id,
			updateBody,
			model: ProductModel,
		});
	}
}

class Clothing extends Product {
	// create product by shop
	async createProductService() {
		const newClothing = await ClothingModel.create({
			...this.product_attributes,
			product_shop: this.product_shop,
		});

		if (!newClothing) throw new BadRequestError("Could not create clothing");

		const newProduct = await super.createProductService(newClothing._id);

		if (!newProduct) throw new BadRequestError("Could not create product 1");
		return newProduct;
	}
	// update product by shop
	async updateProductService(product_id) {
		const objectParams = this;
		if (objectParams.product_attributes) {
			await updateProductRepo({
				product_id,
				objectParams,
				model: ClothingModel,
			});
		}
		const updateProduct = await super.updateProductService(
			product_id,
			objectParams
		);
		return updateProduct;
	}
}

class Electronic extends Product {
	// create product by shop
	async createProductService() {
		const newElectronic = await ElectronicModel.create({
			...this.product_attributes,
			product_shop: this.product_shop,
		});
		if (!newElectronic)
			throw new BadRequestError("Could not create electronic");

		const newProduct = await super.createProductService(newElectronic._id);
		if (!newProduct) throw new BadRequestError("Could not create product");
		return newProduct;
	}
	// update product by shop
	async updateProductService(product_id) {
		const objectParams = omitBy(this, isUndefined);
		if (objectParams.product_attributes) {
			await updateProductRepo({
				product_id,
				objectParams: omitBy(objectParams.product_attributes, isUndefined),
				model: ElectronicModel,
			});
		}

		const updateProduct = await super.updateProductService(
			product_id,
			objectParams
		);
		return updateProduct;
	}
}
class Furniture extends Product {
	async createProductService() {
		const newFurniture = await FurnitureModel.create({
			...this.product_attributes,
			product_shop: this.product_shop,
		});

		if (!newFurniture) throw new BadRequestError("Could not create furniture");

		const newProduct = await super.createProductService(newFurniture._id);

		if (!newProduct) throw new BadRequestError("Could not create product 1");
		return newProduct;
	}
}
ProductFactory.registerProductType("Clothing", Clothing);
ProductFactory.registerProductType("Electronic", Electronic);
ProductFactory.registerProductType("Furniture", Furniture);
export default ProductFactory;
