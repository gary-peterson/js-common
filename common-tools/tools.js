// tools.js

const
    CustomException = require('./custom-exception');

class Tools {
	
    //-----------------------------------------------------------
    //String Helpers

    static compareStrings(s1, s2) {
        if (s1 < s2) return -1;
        return (s1 > s2) ? 1 : 0;
    }

    static isStringValidNumber(str) {
        if (str.match(/^-?\d+$/))
            return true;
        return str.match(/^\d+\.\d+$/);
    }

    static isString(o) {
		return this.equalsIgnoreCase(typeof o, 'string');		
    }

	static equalsIgnoreCase(str1, str2) {
		//https://masteringjs.io/tutorials/fundamentals/compare-strings-ignore-case
		//could also do toLowerCase/toUpperCase and then simpmly "==="
		if (str1 === str2) return true;
		//localeCompare retuns a num <0, 0, a num >0
		//if target (str1) sorts before, equal, or after
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
		return str1.localeCompare(str2, undefined, { sensitivity: 'accent' }) === 0;
	}

	static hasContent(string) {
		if (!string) return false;
		/*
		regex
		http://www.javascriptkit.com/javatutors/redev2.shtml
		Search entire string for non-whitespace char:
			/\S/.test(s)
			\S match any non-whitespace char
		Variation:
			/^\S/.test(s)
			search must match from beginning of string (e.g. the "^")
		*/
		return /\S/.test(string);
	}	

    //-----------------------------------------------------------
    //Coercing

    static coerceNum(o) {
        if (!this.isString(o))
            return o;
        //it is a string
        if (!this.isStringValidNumber(o))
                throw new CustomException('');
        return parseFloat(o);
    }

    static coerceNumWithDefault(o, defaultNum) {
        //if number is not valid use defaultNum
        if (!o) {
            return defaultNum;
        }
        if (this.isString(o) && !this.isStringValidNumber(o))
            return defaultNum;
        return this.coerceNum(o);
    }
	
    static coerceClass(className) {
        //Return class for className, or null if not found
        if (typeof className === 'function')
            return className;
        let cl = null;
        try {
            const fct = new Function(`return ${className}`);
            cl = fct(className);
        } catch (ex) {
            //not found, nop
        }
        return cl;
    }	

    //-----------------------------------------------------------
    //Validating

    //static parseNumsString(anInput) {
    static coerceNumsString(anInput) {
        //Assume pre-validated
        //Allow either whitespace or comma delimiter
        if (!anInput)
            return [];
        const input = anInput.trim();
        //Handle special case first
        if (input.length === 0)
            return [];
        const strings = input.trim().split(/[\s,]+/);
        return strings.map(eaString => parseFloat(eaString));
    }

    static findInvalidNumberIn(numsString) {
        //validate a numbers string
        //Return null if okay
        const s = numsString.trim();
        if (s.length === 0) return null;
        const strings = s.split(/[\s,]+/);
        for (let each of strings)
            if (!this.isStringValidNumber(each))
                return each;
        return null;
    }

    //-----------------------------------------------------------
    //Helpers
	
    static prn(anObject) {
        console.log(this.valueToStringSafely(anObject));
    }		
	
    static className(o) {
        return o.constructor.name;
    }

    static decimalCount(num) {
        if (Math.floor(num) === num)
            return 0;
        const s = num.toString();
        if (!s.includes('.'))
            return 0;
        return s.split('.')[1].length;
    }
	
    static newArrayFromSizeFilledWith(sz, value) {
        const a = Array(sz);
        a.fill(null);
        return a;
    }

    //-----------------------------------------------------------
    //Exception Helpers

    static exceptionToDisplayStrings(ex) {
        const strings = [];
        try {
            const lines = ex.stack.split('\n');
            //Assume 0 is info, 1 is location
            strings.push(lines[0]);
            const line2 = lines[1];
            const
                messageLoc = this.parseExceptionMessageLocation(line2),
                fileLoc = this.parseExceptionFileLocation(line2);
            strings.push(`(method=${messageLoc}) ${fileLoc}`);
        } catch (ex) {
            //nop
        }
        return strings;
    }

    static parseExceptionMessageLocation(stackLine) {
        //Expecting something like:
        //	"    at Counter.getCount (file:/
        let key, i, sub;
        key = 'at ';
        i = stackLine.indexOf(key);
        if (i === -1) return '';
        sub = stackLine.substring(i + key.length);
        key = ' ';
        i = sub.indexOf(key);
        if (i === -1) return '';
        return sub.substring(0, i);
    }

    static parseExceptionFileLocation(stackLine) {
        //Expecting something like (at end of string):
        //	/model.js:17:5)"
        let i, sub, fn, lineNo;
        i = stackLine.lastIndexOf('/') + 1;
        if (i === -1) return '';
        sub = stackLine.substring(i);
        fn = sub.substring(0, sub.indexOf(':'));
        lineNo = sub.substring(sub.indexOf(':') + 1);
        lineNo = lineNo.substring(0, lineNo.indexOf(':'));
        //foo.js (line 101)
        return `(file="${fn}") (line=${lineNo})`;
    }
	
    static implementedBySubclass(o, methodName) {
        //throw new CustomException(`Class "${className(o)}" must implement method "${methodName}"`);
        throw new CustomException();
    }	
		
    //-----------------------------------------------------------
    //Formatting

    separator() {
        return "--------------------------------------------";
    }

    minorSeparator() {
        return "-----------";
    }

    cr() {
        //carriage return new line
        prn("");
    }

    static valueToStringSafely(value) {
        let safeValue = value;
        if (safeValue === undefined)
            return '*undefined*';
        if (safeValue === null)
            return '*null*';
        return safeValue.toString();
    }

}

//--------------------------------
// Exporting

exports.Tools = Tools;