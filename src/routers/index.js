import {apiKey, permission} from "../auth/checkAuth";
import routeProduct from "./product";
import routeAccess from "./access";
import routeDiscount from "./discount";
import routeCart from "./cart";

const initalRouter = (app) => {
	app.use(apiKey);
	app.use(permission("0000"));
	app.use("/api/v1/shop", routeAccess);
	app.use("/api/v1/products", routeProduct);
	app.use("/api/v1/discounts", routeDiscount);
	// app.use("/api/v1/carts", routeCart);
};
export default initalRouter;
