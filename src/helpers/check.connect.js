import mongoose from "mongoose";
import os from "os";

const countConnect = () => {
	const numConnection = mongoose.connections.length;
	console.log("Number of connections: ", numConnection);
};

const checkOverload = () => {
	setInterval(() => {
		const numConnection = mongoose.connections.length;
		const numsCore = os.cpus().length;
		const memoryUsage = process.memoryUsage().rss;

		const maxConnection = numsCore * 5;
		if (numConnection > maxConnection) {
			console.log("Connection overload detected");
		}
	});
};
export default countConnect;
