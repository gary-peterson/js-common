/*
index.js
run tests headless (console output)
*/

const
	{MinimalMatrix} = require('./common-objects/minimal-matrix'),
	{MatrixTool} = require('./common-objects/matrix-tool'),

	{CustomException} = require('./common-tools/custom-exception'),
	{Tools} = require('./common-tools/tools'),

	{MetaModel} = require('./common-objects/meta-model'),
	{Model} = require('./common-objects/model'),
	{Lab} = require('./common-objects/Lab'),

	{prn} = require('./common-tools/common-helper-functions'),

	{JsExtensionLoader} = require('./common-tools/js-extension-loader');

//---------------------------------------------------

JsExtensionLoader.load();

//---------------------------------------------------

//Exported Classes
exports.MinimalMatrix = MinimalMatrix;
exports.MatrixTool = MatrixTool;
exports.CustomException = CustomException;
exports.Tools = Tools;
exports.MetaModel = MetaModel;
exports.Model = Model;
exports.JsExtensionLoader = JsExtensionLoader;
exports.Lab = Lab;

//Exported Functions
exports.prn = prn;



