import {reasonPhrases} from "../utils/reasonPhrases";
import {statusCodes} from "../utils/statusCodes";

class ErrorResponse extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}
class ConflictRequestError extends ErrorResponse {
	constructor(
		message = reasonPhrases.CONFLICT,
		statusCode = statusCodes.CONFLICT
	) {
		super(message, statusCode);
	}
}
class BadRequestError extends ErrorResponse {
	constructor(
		message = reasonPhrases.BAD_REQUEST,
		statusCode = statusCodes.BAD_REQUEST
	) {
		super(message, statusCode);
	}
}
class AuthFailureError extends ErrorResponse {
	constructor(
		message = reasonPhrases.UNAUTHORIZED,
		statusCode = statusCodes.UNAUTHORIZED
	) {
		super(message, statusCode);
	}
}
class NotFoundError extends ErrorResponse {
	constructor(
		message = reasonPhrases.NOT_FOUND,
		statusCode = statusCodes.NOT_FOUND
	) {
		super(message, statusCode);
	}
}
class ForbiddenError extends ErrorResponse {
	constructor(
		message = reasonPhrases.FORBIDDEN,
		statusCode = statusCodes.FORBIDDEN
	) {
		super(message, statusCode);
	}
}
export {
	BadRequestError,
	ConflictRequestError,
	AuthFailureError,
	NotFoundError,
	ForbiddenError,
};
