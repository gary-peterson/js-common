//raw-matrix.js

const
    {Tools} = require('../common-tools/tools');

/**
 * RawMatrix
 *
 * Model a raw matrix.
 *
 * Basically just provide access
 *        indexes are 1-based
 *            e.g.
 *                i = 1,....,M (rows)
 *                j = 1,....,N (cols)
 *
 */
class RawMatrix {
    //Ivars/Fields
    rowArrays;

    //--------------------------------
    //public Constructing

    static fromMN(m, n, aFillValue) {
        //m is rows, n cols
        let fillValue, rowArrays;
        fillValue = (aFillValue !== undefined) ? aFillValue : null;
        rowArrays = Tools.newArrayFromSizeFilledWith(m, null);
        for (let i = 1; i <= rowArrays.length; i++) {
            rowArrays[i - 1] = Tools.newArrayFromSizeFilledWith(n, fillValue);
        }
        return this.fromRowArrays(rowArrays);
    }

    static fromRowArray(rowArray) {
        return this.fromRowArrays([rowArray]);
    }

    static fromRowArrays(rowArrays) {
        return new this(rowArrays);
    }

    //--------------------------------
    //Private Constructing

    constructor(rowArrays) {
        //Private
        this.rowArrays = rowArrays;
    }

    //--------------------------------
    //Accessing

    getRowArrays() {
        return this.rowArrays;
    }

    setRowArrays(rowArrays) {
        this.rowArrays = rowArrays;
    }

    //--------------------------------
    //Ivar Accessing

    /** Returns number of rows */
    getM() {
        return this.rowArrays.length;
    }

    /** Returns number of cols */
    getN() {
        return this.getM() > 0 ? [this.rowArrays[0].length] : 0;
    }

    //--------------------------------
    //Cell Accessing

    at(i, j) {
        //row, col
        if (!this.validateCellIndices(i, j)) {
            const s = `$(1, 1) to (${this.getM()}, ${this.getN()})`;
            throw `Invalid (i, j) = (${i}, ${j}) -- expecting ${s}`;
        }
        return this.rowArrays[i - 1][j - 1];
    }

    get(i, j) {
        //Alias for "at"
        return this.at(i, j);
    }

    atPut(i, j, value) {
        //row, col
        if (!this.validateCellIndices(i, j)) {
            const s = `$(1, 1) to (${this.getM()}, ${this.getN()})`;
            throw `Invalid (i, j) for set: (${i}, ${j}) -- expecting ${s}`;
        }
        this.rowArrays[i - 1][j - 1] = value;
    }

    set(i, j, value) {
        //Alias for "atPut"
        return this.atPut(i, j, value);
    }

    //-------------------------------------------------
    //Validating

    validateCellIndices(i, j) {
        return i >= 1 && i <= this.getM()
            && j >= 1 && j <= this.getN();
    }

}

//--------------------------------
// Exporting

exports.RawMatrix = RawMatrix;