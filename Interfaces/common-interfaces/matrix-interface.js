'use strict';

/**
 * MatrixInterface
 *
 *        indexes are 1-based
 *            e.g.
 *                i = 1,....,M (rows)
 *                j = 1,....,N (cols)
 *
 */
class MatrixInterface {

	/**
	 * Returns integer that is height (number of rows)
	 * of matrix
	 */
	getM()
		{}

	/**
	 * Returns integer that is width (number of cols)
	 * of matrix
	 */
	getN()
	{}
	

}

//--------------------------------
// Exporting

exports.MatrixInterface = MatrixInterface;