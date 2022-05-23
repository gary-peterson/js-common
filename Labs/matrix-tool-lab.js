/*
matrix-tool-lab.js
*/

const
	{MinimalMatrix} = require('../index'),
	{Lab} = require('../common-objects/Lab'),
	{MatrixTool} = require('../common-objects/matrix-tool'),
	{prn} = require('../common-tools/common-helper-functions');

class MatrixToolLab extends Lab {

	static go() {
		const lab = new MatrixToolLab();
		lab.runSelector(lab.sample_core_1, 'sample_core_1');
		lab.runSelector(lab.sample_core_2, 'sample_core_2');
	}

	//-----------------------------------
	//Tests

	sample_core_1() {
		const
			mx = MinimalMatrix.fromMN(2, 4, null),
			tool = MatrixTool.fromMatrix(mx);
		tool.atPut(2, 2, 11);
		this.compare(11, tool.at(2, 2), '(2, 2)');
		this.compare(null, tool.at(2, 3), '(2, 3)');
	}

	sample_core_2() {
		const
			mx = MinimalMatrix.fromMN(2, 4, null),
			tool = MatrixTool.fromMatrix(mx);
		for (let i = 1; i <= tool.getM(); i++) {
			for (let j = 1; j <= tool.getN(); j++)
				tool.atPut(i, j, i + j);
		}
		for (let i = 1; i <= tool.getM(); i++) {
			for (let j = 1; j <= tool.getN(); j++)
				this.compare(i + j, tool.at(i, j), `(${i}, ${j})`);
		}
	}

	//-----------------------------------
	//Private Helpers

	runSelector(method, methodLabel) {
		prn(`Running test ${methodLabel}`);
		method.bind(this)();
	}

}

//-----------------------------------------------------
//Run Experiments

MatrixToolLab.go();