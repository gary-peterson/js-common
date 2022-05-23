'use strict';

const
	{Tools} = require('../common-tools/tools');

class MetaModel {
	
	constructor() {
		this.coercers = {};
	}
	
	//---------------------------------
	
	setAllNumeric(...vars) {
		vars.forEach(v => this.setType(v, 'num'));
	}

	setType(v, type) {
		this.coercers[v] = type;
	}
	
	getCoercers() {
		return this.coercers;
	}
	
	coerce(v, value) {
		const c = this.coercers[v];
		if (c)
			return this.basicCoerce(v, value, c);
		return value;
	}
	
	basicCoerce(v, value, c) {
		if (c === 'num')
			return Tools.coerceNum(value);
		if (c === 'numsString')
			return Tools.coerceNumsString(value);
		//TODO consider throw
		console.log(`Coercer "${v}" not found`);
		return value;
	}
	
	validateValue(v, value) {
		const c = this.coercers[v];		
		if (!c) return true;
		if (c === 'numsString')
			return this.validateNumsString(value);
		if (c === 'num')
			return this.validateNum(value);		
		return true;
	}
	
	validateNum(o) {
		if (!Tools.isString(o))
			return null;
		//it is a string
		if (!Tools.isStringValidNumber(o))
			return `Invalid number "${o}"`;
		return null;
	}	
	
	validateNumsString(o) {
		if (!Tools.isString(o))
			return null;
		const invalidNum = Tools.findInvalidNumberIn(o);
		if (invalidNum)
			return `Invalid number "${invalidNum}"`;
		return null;
	}		
	
		
}

//--------------------------------
// Exporting

exports.MetaModel = MetaModel;