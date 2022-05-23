//minimal-matrix.js

const
    {RawMatrix} = require('./raw-matrix');


/**
 * Minimal matrix
 * Implements MatrixInterface
 */
class MinimalMatrix {

    //--------------------------------
    //Ivars / fields

    contents;

    //--------------------------------
    //Public Constructing

    static fromMN(m, n, aFillValue) {
        //Convert aFillValue, if undefined values, to nulls
        return new this(RawMatrix.fromMN(m, n, aFillValue ?? null));
    }

    static fromRowArrays(rowArrays) {
        return new this(RawMatrix.fromRowArrays(rowArrays));
    }

    static fromRowArray(rowArray) {
        return new this(RawMatrix.fromRowArray(rowArray));
    }

    //--------------------------------
    //Private Constructing

    constructor(contents) {
        //contents is a RawMatrix
        this.contents = contents;
    }

    //--------------------------------
    //Accessing

    /**
     * Returns integer that is height (number of rows)
     * of matrix (i)
     */
    getM() {
        return this.contents.getM();
    }

    /**
     * Returns integer that is width (number of cols)
     * of matrix (j)
     */
    getN() {
        return this.contents.getN();
    }

    //--------------------------------
    //Cell Accessing

    at(i, j) {
        //row, col
        return this.contents.at(i, j);
    }

    get(i, j) {
        //row, col
        return this.contents.get(i, j);
    }

    atPut(i, j, value) {
        //row, col
        this.contents.atPut(i, j, value);
    }

    set(i, j, value) {
        this.contents.set(i, j, value);
    }


}

//--------------------------------
// Exporting

exports.MinimalMatrix = MinimalMatrix;