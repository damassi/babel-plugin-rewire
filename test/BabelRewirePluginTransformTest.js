const babel = require("@babel/core");
const path = require("path");
const fs = require("fs");
const os = require("os");
const expect = require("expect.js");
const prettier = require("prettier");
const UglifyJS = require("uglify-es");
const babelPluginRewire = require("../lib/babel-plugin-rewire.js"); //  require('../test-helpers/getBabelPluginRewire.js');

describe("BabelRewirePluginTest", () => {
  const babelTranslationOptions = {
    presets: ["@babel/react"],
    plugins: [
      babelPluginRewire,
      "@babel/syntax-flow",
      "@babel/proposal-export-namespace-from",
      "@babel/proposal-export-default-from"
    ]
  };

  const babelTranslationOptionsIgnoredIdentifiers = {
    presets: ["@babel/react"],
    plugins: [
      [
        babelPluginRewire,
        {
          ignoredIdentifiers: ["ignoredIdentifier1", "ignoredIdentifier2"]
        }
      ],
      "@babel/syntax-flow",
      "@babel/proposal-export-namespace-from",
      "@babel/proposal-export-default-from"
    ]
  };

  const babelTranslationOptionsAllEnabled = {
    presets: ["@babel/es2015", "@babel/react", "@babel/stage-0"],
    plugins: [
      babelPluginRewire,
      "@babel/transform-runtime",
      "@babel/transform-block-scoping",
      "@babel/transform-template-literals",
      "@babel/transform-typeof-symbol",
      "@babel/proposal-export-namespace-from",
      "@babel/proposal-export-default-from",
      "@babel/transform-regenerator"
    ]
  };

  function validate(input, output) {
    const condense = expanded => {
      return UglifyJS.minify(expanded, { mangle: false }).code;
    };

    expect(condense(input)).to.be(condense(output));
  }

  function testTranslation(testName, options) {
    const directory = path.resolve(
      __dirname,
      "..",
      "fixtures",
      "transformation",
      testName
    );

    const input = fs.readFileSync(path.resolve(directory, "input.js"), "utf-8");
    const expected = fs.readFileSync(
      path.resolve(directory, "expected.js"),
      "utf-8"
    );

    try {
      var transformationOutput = prettier.format(
        babel.transform(input, options).code
      );
    } catch (error) {
      expect().fail("Transformation failed: \n" + error.stack);
    }

    const tempDir = path.resolve(os.tmpdir(), "babel-plugin-rewire");
    console.log("TempDir: " + tempDir);

    try {
      fs.mkdirSync(tempDir);
    } catch (error) {}

    fs.writeFileSync(
      tempDir + "/testexpected" + testName + ".js",
      transformationOutput,
      "utf-8"
    );

    //fs.writeFileSync(path.resolve(directory, 'expected.js'), transformationOutput, 'utf-8');

    if (expected.trim() != transformationOutput.trim()) {
      console.log(transformationOutput);
    }

    validate(transformationOutput, expected);
  }

  function testSuccessfulTranslation(testName, additionalOptions) {
    const directory = path.resolve(
      __dirname,
      "..",
      "fixtures",
      "transformation",
      testName
    );

    const input = fs.readFileSync(path.resolve(directory, "input.js"), "utf-8");

    const transformationResult = prettier.format(
      babel.transform(
        input,
        combineOptions(babelTranslationOptionsAllEnabled, additionalOptions)
      )
    );
  }

  function testIgnoredIdentifiersTranslation(testName) {
    const directory = path.resolve(
      __dirname,
      "..",
      "fixtures",
      "transformation",
      testName
    );

    const input = fs.readFileSync(path.resolve(directory, "input.js"), "utf-8");

    const transformationResult = prettier.format(
      babel.transform(
        input,
        babelTranslationOptionsAllEnabledIgnoredIdentifiers
      )
    );
  }

  function combineOptions(baseOptions, additionalOptions) {
    const additionalPresets =
      (additionalOptions && additionalOptions.presets) || [];
    const additionalPlugins =
      (additionalOptions && additionalOptions.plugins) || [];

    return {
      presets: baseOptions.presets.concat(additionalPresets),
      plugins: baseOptions.plugins.concat(additionalPlugins)
    };
  }

  const featuresToTest = [
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
    // "flowTypeExport",
    // "flowTypeImport",
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

  const stage0FeaturesToTests = ["issue164"];
  const ignoredIdentifiers = ["ignoredIdentifiers"];

  featuresToTest.forEach(feature => {
    it(`test babel-plugin-rewire for ${feature}`, () => {
      testTranslation(feature, babelTranslationOptions);
    });
  });

  featuresToTest.forEach(feature => {
    it(`test translation babel-plugin-rewire with ignored identifiers for ${feature}`, () => {
      testTranslation(feature, babelTranslationOptions);
    });
  });

  ignoredIdentifiers.forEach(feature => {
    it(`test translation babel-plugin-rewire with ignored identifiers for ${feature}`, () => {
      testTranslation(feature, babelTranslationOptionsIgnoredIdentifiers);
    });
  });
});
