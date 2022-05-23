
const
    {Tools} = require('../common-tools/tools'),
    {prn} = require('../common-tools/common-helper-functions');

class Lab {

    compare(expected, actual, aMsg) {
        prn(`${this.basicCompare(expected, actual) === 0 ? 'passed' : 'FAILED'} -- ${aMsg ?? ''}`);
    }

    basicCompare(expected, actual) {
        //Return -1, 0, 1 for expected is less than, equal, greater than
        /*const msg = aMsg ?? '';
        const t = Tools;
        if (t.isString(expected) && t.isString(actual))
            return t.compareStrings(expected,actual);*/
        if (expected < actual) return -1;
        return (expected > actual) ? 1 : 0;
    }

}

//--------------------------------
// Exporting

exports.Lab = Lab;

