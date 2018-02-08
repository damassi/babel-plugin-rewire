import getLog from "./log";

const log = _get__("getLog")("main");

export function getLogConstant() {
  return _get__("log");
}
let _DefaultExportValue = "test";
export default _DefaultExportValue;

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
    case "getLog":
      return getLog;

    case "log":
      return log;
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

let _typeOfOriginalExport = typeof _DefaultExportValue;

function addNonEnumerableProperty(name, value) {
  Object.defineProperty(_DefaultExportValue, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if (
  (_typeOfOriginalExport === "object" ||
    _typeOfOriginalExport === "function") &&
  Object.isExtensible(_DefaultExportValue)
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

export {
  _get__ as __get__,
  _get__ as __GetDependency__,
  _set__ as __Rewire__,
  _set__ as __set__,
  _reset__ as __ResetDependency__,
  _RewireAPI__ as __RewireAPI__
};
