class Discount {
	calc = (value) => {
		return value * 0.9;
	};
	abv = () => {};
}
class text extends Discount {
	constructor() {
        super()
    }
}
class Shipping {
	calc = () => {
		return 5;
	};
}
class Fee {
	calc = (value) => {
		return value * 1.05;
	};
}

class ShopeeFadacePattern {
	constructor() {
		this.discount = new Discount();
		this.shipping = new Shipping();
		this.fee = new Fee();
	}
	calc = (price) => {
		price = this.discount.calc(price);
		price = this.fee.calc(price);
		price += this.shipping.calc();
		return price;
	};
}

const buy = (price) => {
	const shopee = new ShopeeFadacePattern();
	const res = shopee.calc(price);
	return res;
};
console.log(buy(12000));
