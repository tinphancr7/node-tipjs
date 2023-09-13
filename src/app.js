import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import createError from "http-errors";
import {v4 as uuidv4} from "uuid";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import instanceMongodb from "./db/init.mongodb";
import dotenv from "dotenv";
import initalRouter from "./routers";
import logEvents from "./helpers/logEvents";
dotenv.config();

const app = express();
//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//init db
instanceMongodb;

//init router
initalRouter(app);

//handle error

app.use((req, res, next) => {
	// const error = new Error("Not found");
	// error.status = 404;
	// next(error);
	return next(createError(404, "Not Found"));
});
app.use((error, req, res, next) => {
	logEvents(
		`idError----${uuidv4()}----${req.url}----${req.method}----${error.message}`
	);
	const statusCode = error.status || 500;
	return res.status(statusCode).json({
		message: error.message,
		code: statusCode,
		stack: error.stack,
		status: "error",
	});
});

export default app;
