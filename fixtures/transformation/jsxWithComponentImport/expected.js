import React from "react";
import ChildComponent from "./ChildComponent";
import { x as AnotherChildComponent } from "./ChildComponent";
import * as AnotherChildComponents from "./ChildComponent";

export default class Foo extends _get__("React").Component {
  render() {
    return _get__("React").createElement(
      "div",
      { className: "content" },
      _get__("React").createElement(_get__("ChildComponent"), null),
      _get__("React").createElement(_get__("AnotherChildComponent"), null),
      _get__("React").createElement(_get__("AnotherChildComponents"), null)
    );
  }
}

var _RewiredData__ = Object.create(null);

var INTENTIONAL_UNDEFINED = "__INTENTIONAL_UNDEFINED__";
let _RewireAPI__ = {};

(function() {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__, name, {
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
    case "React":
      return React;

    case "ChildComponent":
      return ChildComponent;

    case "AnotherChildComponent":
      return AnotherChildComponent;

    case "AnotherChildComponents":
      return _filterWildcardImport__(AnotherChildComponents);
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
  if (typeof variableName === "object") {
    Object.keys(variableName).forEach(function(name) {
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
  var rewiredVariableNames = Object.keys(object);
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
    let result = callback();

    if (!!result && typeof result.then == "function") {
      result.then(reset).catch(reset);
    } else {
      reset();
    }

    return result;
  };
}

let _typeOfOriginalExport = typeof Foo;

function addNonEnumerableProperty(name, value) {
  Object.defineProperty(Foo, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if (
  (_typeOfOriginalExport === "object" ||
    _typeOfOriginalExport === "function") &&
  Object.isExtensible(Foo)
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

function _filterWildcardImport__(wildcardImport = {}) {
  let validPropertyNames = Object.keys(wildcardImport).filter(function(
    propertyName
  ) {
    return (
      propertyName !== "__get__" &&
      propertyName !== "__set__" &&
      propertyName !== "__reset__" &&
      propertyName !== "__with__" &&
      propertyName !== "__GetDependency__" &&
      propertyName !== "__Rewire__" &&
      propertyName !== "__ResetDependency__" &&
      propertyName !== "__RewireAPI__"
    );
  });
  return validPropertyNames.reduce(function(
    filteredWildcardImport,
    propertyName
  ) {
    filteredWildcardImport[propertyName] = wildcardImport[propertyName];
    return filteredWildcardImport;
  },
  {});
}

export {
  _get__ as __get__,
  _get__ as __GetDependency__,
  _set__ as __Rewire__,
  _set__ as __set__,
  _reset__ as __ResetDependency__,
  _RewireAPI__ as __RewireAPI__
};
