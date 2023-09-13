import app from "./src/app";

app.listen(process.env.PORT || 3000, () => {
	console.log("Server is listening on port " + process.env.PORT || 3000);
});
process.on("SIGINT", () => {
	console.log("Bye bye!");
	process.exit();
});
