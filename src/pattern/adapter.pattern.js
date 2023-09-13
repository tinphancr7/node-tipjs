class MomoPayMentAdapter {
	constructor(momoPayMent) {
		this.momoPayMent = momoPayMent;
	}
	paymentWithVisa(visaPayment) {
		const convertedPayment = this.convertToVisaPayment(this.momoPayMent);
		visaPayment.pay(convertedPayment);
	}
	convertToVisaPayment(momoPayMent) {
		//convert the momo to visaPayment
		const conversionRate = 23000; // 1 usd = 23000 vnd
		const visaAmount = momoPayMent.amount / conversionRate;
		const visaPayment = {
			amount: visaAmount,
			cardNumber: momoPayMent.cardNumber,
			cvv: momoPayMent.cvv,
			expiredDate: momoPayMent.expiredDate,
		};
		return visaPayment;
	}
}

class VisaPayment {
	pay(payment) {
		console.log(`Payment with visa: ${JSON.stringify(payment)}`);
	}
}
class MomoPayment {
	constructor(visaAmount, cardNumber, cvv, expiredDate) {
		this.visaAmount = visaAmount;
		this.cardNumber = cardNumber;
		this.cvv = cvv;
		this.expiredDate = expiredDate;
	}
}

const momoPayMent = new MomoPayment(1000000, "123456789", "123", "12/12/2021");
const momoAdapter = new MomoPayMentAdapter(momoPayMent);

const visaPayment = new VisaPayment();

momoAdapter.paymentWithVisa(visaPayment);
