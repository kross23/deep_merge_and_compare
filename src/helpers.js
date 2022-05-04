'use strict';
const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';//* true если обьект.
const isArray = array => Array.isArray(array);//* true если массив
const isSamtype = (type1, type2) => Object.prototype.toString.call(type1) === Object.prototype.toString.call(type2);

//* true если одинаковые
module.exports = {
	isObject,
	isArray,
	isSamtype,
};

