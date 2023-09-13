import _ from "lodash";
const getInfoData = (fields = [], object = {}) => {
	return _.pick(object, fields);
};
const getSelectData = (select) => {
	return Object.fromEntries(select.map((item) => [item, 1]));
};
const unSelectData = (select) => {
	return Object.fromEntries(select.map((item) => [item, 0]));
};

export {getInfoData, getSelectData, unSelectData};
