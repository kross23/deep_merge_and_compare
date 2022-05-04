'use strict';
const { isArray, isObject, isSamtype } = require('./helpers');

module.exports = deepMerge;
function deepMerge(obj1, obj2) {
	if (!isObject(obj1) && !isArray(obj1) || !isSamtype(obj1, obj2)) {
		if (isArray(obj2) || isObject(obj2)) {
			return deepCopy(obj2);
		}
		return obj2;
	}
	if (isArray(obj1) || isObject(obj1)) {
		return deepMergeObject(obj1, obj2);
	}
}
//************************************************************ */
function deepMergeObject(obj1, obj2) { //* глубокое копирование
	if (isArray(obj1) && isArray(obj2)) {
		return deepCopy([...obj1, ...obj2]);
	}
	const result = deepCopy(obj1);
	for (const key of Object.keys(obj2)) {
		if (!Object.prototype.hasOwnProperty.call(result, key)) { //*!result.hasOwnProperty(key)
			if (isArray(obj2[key])  || isObject(obj2[key])) {
				result[key] = deepCopy(obj2[key]);
				continue;
			}
			result[key] = obj2[key];
			continue;
		}
		result[key] = deepMerge(result[key], obj2[key]);
	}
	return result;
}
//* глубокое копирование обьект или массив
function deepCopy(obj) {
	const  result = isObject(obj) ? { ...obj } : [...obj];
	for (const index of Object.keys(obj)) {
		if (isArray(result[index]) || isObject(result[index])) {
			result[index] = deepCopy(result[index]);
			continue;
		}
	}
	return result;
}

