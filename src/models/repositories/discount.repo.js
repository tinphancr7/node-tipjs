import {getSelectData} from "../../utils";

const findAllDiscountCodeSelect = async ({
	limit = 50,
	page = 1,
	sort = "ctime",
	filter,
	select,
	model,
}) => {
	const skip = (page - 1) * +limit;
	const sortBy = sort === "ctime" ? {_id: -1} : {_id: 1};
	const selectObj = getSelectData(select);
	const result = await model
		.find(filter)
		.sort(sortBy)
		.skip(skip)
		.limit(limit)
		.select(selectObj)
		.lean()
		.exec();
	return result;
};
const findAllDiscountCodeUnSelect = async ({
	limit = 50,
	page = 1,
	sort = "ctime",
	filter,
	unSelect,
	model,
}) => {
	const skip = (page - 1) * +limit;
	const sortBy = sort === "ctime" ? {_id: -1} : {_id: 1};
	const selectObj = getSelectData(unSelect);
	const result = await model
		.find(filter)
		.sort(sortBy)
		.skip(skip)
		.limit(limit)
		.select(selectObj)
		.lean()
		.exec();
	return result;
};
const checkDiscountExists = async ({model, filter}) => {
	return await model.find(filter).lean();
};

export {
	findAllDiscountCodeSelect,
	findAllDiscountCodeUnSelect,
	checkDiscountExists,
};
