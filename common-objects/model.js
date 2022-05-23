'use strict';

const
	{MetaModel} = require('./meta-model');

class Model {
	
	constructor() {
		this.userMessage = '';	
		this.errorMessage = '';			
		this.meta = new MetaModel();
	}
	
	//---------------------------------
	
	getMessage() {
		return this.errorMessage || this.userMessage;
	}
	
	getUserMessage() {
		return this.userMessage;
	}	
	
	getErrorMessage() {
		return this.errorMessage;
	}	
	
	getUserTips() {
		//optional override to present tips
		//e.g. return 'Enter space delimited numbers';
		return null;
	}	
	
	//---------------------------------
	
	setUserMessage(msg) {
		this.userMessage = msg;
	}		
	
	clearUserMessage() {
		this.userMessage = '';
	}			
	
	setErrorMessage(msg) {
		this.errorMessage = msg;
	}		
	
	//---------------------------------	
	
	getTitle() {
		//Virtual optional
		//Default is class name
		return this.className();
	}	
	
	//---------------------------------		
	
	validate() {
		this.setUserMessage(this.basicValidate());
	}	
	
	basicValidate() {	
		//virtual optional
		return null;
	}
	
	//---------------------------------			
	//Meta (non-virtual)
	
	setAsNumeric(...vars) {
		this.meta.setAllNumeric(...vars);
	}
	
	setType(v, type) {
		this.meta.setType(v, type);
	}	
		
	coerce(v, value) {
		return this.meta.coerce(v, value);
	}
	
	validateValue(v, value) {
		const error = this.meta.validateValue(v, value);
		if (error !== null) {
			this.setUserMessage(error);
			return false;
		}
		//if we do this it clears error from other field
		//this.clearUserMessage();
		return true;
	}	

	//---------------------------------				
	
	getClass() {
		return this.constructor;
	}
		
	className() {
		return this.getClass().name;
	}	
		
}

//--------------------------------
// Exporting

exports.Model = Model;