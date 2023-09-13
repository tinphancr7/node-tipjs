class Leader {
	recieveRequest = (request) => {
		console.log("Leader recieve request" + request);
	};
}

class Scerety {
	constructor() {
		this.leader = new Leader();
	}
	recieveRequest = (request) => {
		this.leader.recieveRequest(request);
	};
}
class Dev {
	constructor(offer) {
		this.offer = offer;
	}
	applyFor = (target) => {
		target.recieveRequest(this.offer);
	};
}
const dev = new Dev("I want to be a leader");
dev.applyFor(new Scerety());
