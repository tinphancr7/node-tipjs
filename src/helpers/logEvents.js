import fs from "fs";
import path from "path";
import {format} from "date-fns";
const fileName = path.join(__dirname, "../logs", "log.txt");
const logEvents = async (msg) => {
	const dateTime = `${format(new Date(), "dd/MM/yyyy HH:mm:ss")}`;
	const contentLog = `${dateTime}----${msg}\n`;
	try {
		fs.appendFileSync(fileName, contentLog);
	} catch (error) {
		console.log(error);
	}
};
export default logEvents;
