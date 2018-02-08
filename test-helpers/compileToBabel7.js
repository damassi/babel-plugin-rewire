const babel = require("@babel/core");
const fs = require("fs");
const path = require("path");
const babelPluginRewire = require("../lib/babel-plugin-rewire.js");

var featuresToTest = [
  "babelissue1315",
  "issue16",
  "forOf",
  "commonJSExportOnly",
  "defaultImport",
  "defaultExport",
  "defaultExportImport",
  "defaultExportWithClass",
  "defaultExportWithNamedFunction",
  "defaultExportWithObject",
  "issuePathReplaceWith",
  "importWithReactClass",
  "jsxSupport",
  "jsxWithComponentImport",
  "moduleExports",
  "multipleImports",
  "multipleImportsWithAliases",
  "namedFunctionExport",
  "namedFunctionImport",
  "namedVariableExport",
  "noDefaultExport",
  "passThrough",
  "primitiveExportWithNamedFunctionExport",
  "wildcardImport",
  "wildcardExport",
  "namedWildcardExport",
  "recursiveRewireCall",
  "requireExports",
  "requireMultiExports",
  "switch",
  "topLevelVar",
  "functionRewireScope",
  "issue69",
  "issue71-tdz",
  "issue71-tdz-index",
  "flowTypeExport",
  "flowTypeImport",
  "updateOperations",
  "assignmentOperations",
  "rewiringOfReactComponents",
  "rewiringOfSimpleFunctionalComponents",
  "issue121",
  "issue133",
  "issue136",
  "issue152",
  "issue155"
];

const babelOptions = {
  presets: ["@babel/react"],
  plugins: [
    // babelPluginRewire,
    "@babel/syntax-flow",
    "@babel/proposal-export-namespace-from"
  ]
};

function compileTestInput(testName) {
  var directory = path.resolve(
    __dirname,
    "..",
    "fixtures",
    "transformation",
    testName
  );
  var input = fs.readFileSync(path.resolve(directory, "input.js"), "utf-8");
  console.log("\n------------", path.resolve(directory, "input.js"), "\n");
  // var expected = fs.readFileSync(path.resolve(directory, 'expected.js'), 'utf-8');

  try {
    var transformationOutput = babel.transform(input, babelOptions).code;
    console.log(transformationOutput);
  } catch (error) {
    expect().fail("Transformation failed: \n" + error.stack);
  }
}

featuresToTest.forEach(compileTestInput);
