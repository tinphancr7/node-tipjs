import Redis from "redis";

class RedisPubSubService {
	constructor() {
		this.subscribe = Redis.createClient();
		this.publish = Redis.createClient();
	}

	subscribe(channel, message) {
		return new Promise((resolve, reject) => {
			this.subscribe.subscriber(channel, message, (err, data) => {
				if (err) {
					reject(err);
				}
				resolve(data);
			});
		});
	}

	publish(channel, message) {
		return new Promise((resolve, reject) => {
			this.publish.publisher(channel, message, (err, data) => {
				if (err) {
					reject(err);
				}
				resolve(data);
			});
		});
	}
}
