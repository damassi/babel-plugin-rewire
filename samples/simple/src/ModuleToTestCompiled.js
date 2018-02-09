"use strict";

var _Object$isExtensible = require("@babel/runtime/core-js/object/is-extensible");

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _typeof = require("@babel/runtime/helpers/typeof");

var _Object$defineProperty = require("@babel/runtime/core-js/object/define-property");

var _Object$create = require("@babel/runtime/core-js/object/create");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _get__("test");

var shouldNotFail = function shouldNotFail() {};

function test() {
  _get__("shouldNotFail")();
}

var _RewiredData__ = _Object$create(null);

var INTENTIONAL_UNDEFINED = "__INTENTIONAL_UNDEFINED__";
var _RewireAPI__ = {};

(function() {
  function addPropertyToAPIObject(name, value) {
    _Object$defineProperty(_RewireAPI__, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject("__get__", _get__);
  addPropertyToAPIObject("__GetDependency__", _get__);
  addPropertyToAPIObject("__Rewire__", _set__);
  addPropertyToAPIObject("__set__", _set__);
  addPropertyToAPIObject("__reset__", _reset__);
  addPropertyToAPIObject("__ResetDependency__", _reset__);
  addPropertyToAPIObject("__with__", _with__);
})();

function _get__(variableName) {
  if (
    _RewiredData__ === undefined ||
    _RewiredData__[variableName] === undefined
  ) {
    return _get_original__(variableName);
  } else {
    var value = _RewiredData__[variableName];

    if (value === INTENTIONAL_UNDEFINED) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__(variableName) {
  switch (variableName) {
    case "test":
      return test;

    case "shouldNotFail":
      return shouldNotFail;
  }

  return undefined;
}

function _assign__(variableName, value) {
  if (
    _RewiredData__ === undefined ||
    _RewiredData__[variableName] === undefined
  ) {
    return _set_original__(variableName, value);
  } else {
    return (_RewiredData__[variableName] = value);
  }
}

function _set_original__(variableName, _value) {
  switch (variableName) {
  }

  return undefined;
}

function _update_operation__(operation, variableName, prefix) {
  var oldValue = _get__(variableName);

  var newValue = operation === "++" ? oldValue + 1 : oldValue - 1;

  _assign__(variableName, newValue);

  return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
  if (_typeof(variableName) === "object") {
    _Object$keys(variableName).forEach(function(name) {
      _RewiredData__[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      _RewiredData__[variableName] = INTENTIONAL_UNDEFINED;
    } else {
      _RewiredData__[variableName] = value;
    }

    return function() {
      _reset__(variableName);
    };
  }
}

function _reset__(variableName) {
  delete _RewiredData__[variableName];
}

function _with__(object) {
  var rewiredVariableNames = _Object$keys(object);

  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function(variableName) {
      _RewiredData__[variableName] = previousValues[variableName];
    });
  }

  return function(callback) {
    rewiredVariableNames.forEach(function(variableName) {
      previousValues[variableName] = _RewiredData__[variableName];
      _RewiredData__[variableName] = object[variableName];
    });
    var result = callback();

    if (!!result && typeof result.then == "function") {
      result.then(reset).catch(reset);
    } else {
      reset();
    }

    return result;
  };
}

var _typeOfOriginalExport = _typeof(module.exports);

function addNonEnumerableProperty(name, value) {
  _Object$defineProperty(module.exports, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if (
  (_typeOfOriginalExport === "object" ||
    _typeOfOriginalExport === "function") &&
  _Object$isExtensible(module.exports)
) {
  addNonEnumerableProperty("__get__", _get__);
  addNonEnumerableProperty("__GetDependency__", _get__);
  addNonEnumerableProperty("__Rewire__", _set__);
  addNonEnumerableProperty("__set__", _set__);
  addNonEnumerableProperty("__reset__", _reset__);
  addNonEnumerableProperty("__ResetDependency__", _reset__);
  addNonEnumerableProperty("__with__", _with__);
  addNonEnumerableProperty("__RewireAPI__", _RewireAPI__);
}
