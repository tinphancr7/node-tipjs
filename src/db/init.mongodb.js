import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import countConnect from "../helpers/check.connect";
const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.7fkxswr.mongodb.net/ecommerce`;

class Database {
	constructor() {
		this.connectDB();
	}
	async connectDB() {
		if (1 === 1) {
			mongoose.set("debug", true);
			mongoose.set("debug", {color: true});
		}
		try {
			await mongoose.connect(url, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				maxPoolSize: 50,
			});
			console.log("Connect DB successfully", countConnect());
		} catch (error) {
			console.log(error);
		}
	}
	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}
}

const instanceMongodb = Database.getInstance();

export default instanceMongodb;
