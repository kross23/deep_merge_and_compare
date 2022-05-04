'use strict';
const { isArray, isObject, isSamtype } = require('./helpers');

module.exports = deepMerge;

function deepMerge(obj1, obj2) {
	if (!isObject(obj1) && !isArray(obj1) || !isSamtype(obj1, obj2)) {
		if (isArray(obj2)) {
			return deepCopyArray(obj2);
		}
		if (isObject(obj2)) {
			return deepCopyObject(obj2);
		}
		return obj2;
	}
	if (isArray(obj1)) {
		return deepMergeArray(obj1, obj2);
	}
	if (isObject(obj1)) {
		return deepMergeObject(obj1, obj2);
	}
}

//************************************************************ */
function deepMergeObject(obj1, obj2) {
	const result = deepCopyObject(obj1);
	for (const key of Object.keys(obj2)) {
		if (!Object.prototype.hasOwnProperty.call(result, key)) { //*!result.hasOwnProperty(key)
			if (isArray(obj2[key])) {
				result[key] = deepCopyArray(obj2[key]);
				continue;
			}
			if (isObject(obj2[key])) {
				result[key] = deepCopyObject(obj2[key]);
				continue;
			}
			result[key] = obj2[key];
			continue;
		}
		result[key] = deepMerge(result[key], obj2[key]);
	}
	return result;
}

function deepMergeArray(arr1, arr2) {
	return deepCopyArray([...arr1, ...arr2]);
}

function deepCopyArray(obj) {
	const  result = [...obj];
	for (let index = 0; index < result.length; index++) {
		if (isArray(result[index])) {
			result[index] = deepCopyArray(result[index]);
			continue;
		}
		if (isObject(result[index])) {
			result[index] = deepCopyObject(result[index]);
			continue;
		}
	}
	return result;
}

function deepCopyObject(obj) {
	const  result = { ...obj };
	for (const index of Object.keys(obj)) {
		if (isArray(result[index])) {
			result[index] = deepCopyArray(result[index]);
			continue;
		}
		if (isObject(result[index])) {
			result[index] = deepCopyObject(result[index]);
			continue;
		}
	}
	return result;
}
