import {reasonPhrases} from "../utils/reasonPhrases";
import {statusCodes} from "../utils/statusCodes";

class SuccessResponse {
	constructor({
		message,
		statusCode = statusCodes.OK,
		reasonPhrase = reasonPhrases.OK,
		metadata = {},
	}) {
		this.message = !message ? reasonPhrase : message;
		this.statusCode = statusCode;
		this.metadata = metadata;
	}
	send = (res) => {
		return res.status(this.statusCode).json(this);
	};
}
class OK extends SuccessResponse {
	constructor({message, metadata}) {
		super({
			message,
			metadata,
		});
	}
}

class CREATED extends SuccessResponse {
	constructor({message, metadata}) {
		super({
			message,
			statusCode: statusCodes.CREATED,
			reasonPhrase: reasonPhrases.CREATED,
			metadata,
		});
	}
}

export {OK, CREATED, SuccessResponse};
