//custom-exception.js

class CustomException extends Error {
	constructor(msg) {
		super(msg);
		this.name = "CustomException";
	}
}

//----------------------------------------------------

exports.CustomException = CustomException;



