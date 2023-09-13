class FifaOnlinePlayer {
	constructor(builder) {
		this.name = builder.name;
		this.position = builder.position;
		this.nationality = builder.nationality;
		this.age = builder.age;
		this.team = builder.team;
		this.stas = builder.stas;
	}
	toString() {
		let player = `Player: \n`;
		player += `Name: ${this.name}\n`;
		player += ` Age: ${this.age}\n`;
		player += `Nationality: ${this.nationality}\n`;
		player += `Position: ${this.position}\n`;
		player += ` Team: ${this.team}\n`;
		player += `Stats: ${JSON.stringify(this.stats)}\n`;
		return player;
	}
}
class FifaOnlinePlayerBuilder {
	constructor() {
		this.name = "";
		this.position = "";
		this.national = "";
		this.age = "";
		this.team = "";
		this.stas = {};
	}
	withName(name) {
		this.name = name;
		return this;
	}
	withPosition(position) {
		this.position = position;
		return this;
	}
	withNationality(nationality) {
		this.nationality = nationality;
		return this;
	}
	withAge(age) {
		this.age = age;
		return this;
	}
	withTeam(team) {
		this.team = team;
		return this;
	}
	withStats(stats) {
		this.stats = stats;
		return this;
	}
	builder() {
		return new FifaOnlinePlayer(this);
	}
}

const buiderPattern = new FifaOnlinePlayerBuilder();
const cr7 = buiderPattern
	.withName("Ronaldo")
	.withPosition("ST")
	.withNationality("Portugal")
	.withAge(35)
	.withTeam("Juventus")
	.withStats({
		pace: 90,
		shooting: 90,
		passing: 90,
		dribbling: 90,
		defending: 90,
	})
	.builder();

console.log(cr7.toString());
const m10 = buiderPattern
	.withName("Messi")
	.withPosition("ST")
	.withNationality("Argentina")
	.withAge(35)
	.withTeam("Barcelona")
	.withStats({
		pace: 90,
		shooting: 90,
		passing: 90,
		dribbling: 90,
		defending: 90,
	})
	.builder();

console.log(m10.toString());
