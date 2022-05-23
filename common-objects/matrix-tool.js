//matrix-tool.js

/**
 * Minimal matrix
 * Implements MatrixInterface
 */
class MatrixTool {
    //Ivars/fields:
    matrix;

    //--------------------------------
    //Public Constructing

    static fromMatrix(mx) {
        return new this(mx);
    }

    //--------------------------------
    //Private Constructing

    constructor(mx) {
        this.matrix = mx;
    }

    //--------------------------------
    //Accessing

    getMatrix() {
        return this.matrix;
    }

    //--------------------------------
    //Instance Methods

    breadthFirstDo(fct) {
        for (let i = 1; i < this.getM(); i++) {
            for (let j = 1; j < this.getN(); j++) {
                fct(this.at(i, j));
            }
        }
    }

    //--------------------------------
    //Core

    at(i, j) {
        return this.matrix.at(i, j);
    }

    atPut(i, j, value) {
        this.matrix.atPut(i, j, value);
    }

    getM() {
        return this.matrix.getM();
    }

    getN() {
        return this.matrix.getN();
    }



}

//--------------------------------
// Exporting

exports.MatrixTool = MatrixTool;