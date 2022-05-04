'use strict';
const { isArray, isObject, isSamtype } = require('./helpers');
module.exports = function deepCompare(obj1, obj2) {
	if (obj1 === obj2) {
		return true;
	}
	if (!isObject(obj1) && !isArray(obj1) || !isObject(obj2) && !isArray(obj2)) {
		return false;
	}
	if (!isSamtype(obj1, obj2) || Object.keys(obj1).length !== Object.keys(obj2).length) {
		return false;
	}
	for (const key of Object.keys(obj1)) {
		if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
			return false;
		}
		if (!deepCompare(obj1[key], obj2[key])) {
			return false;
		}
	}
	return true;
};
