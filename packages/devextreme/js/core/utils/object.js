import { isNumeric, isPlainObject, isObject } from './type';
import variableWrapper from './variable_wrapper';

const clone = (function() {
    function Clone() { }

    return function(obj) {
        Clone.prototype = obj;
        return new Clone();
    };
})();

const orderEach = function(map, func) {
    const keys = [];
    let key;
    let i;

    for(key in map) {
        if(Object.prototype.hasOwnProperty.call(map, key)) {
            keys.push(key);
        }
    }

    keys.sort(function(x, y) {
        const isNumberX = isNumeric(x);
        const isNumberY = isNumeric(y);

        if(isNumberX && isNumberY) return x - y;
        if(isNumberX && !isNumberY) return -1;
        if(!isNumberX && isNumberY) return 1;
        if(x < y) return -1;
        if(x > y) return 1;
        return 0;
    });

    for(i = 0; i < keys.length; i++) {
        key = keys[i];
        func(key, map[key]);
    }
};

const getDeepCopyTarget = (item) => {
    if(isObject(item)) {
        return Array.isArray(item) ? [] : {};
    }
    return item;
};

const legacyAssign = function(target, property, value, extendComplexObject, assignByReference, shouldCopyUndefined) {
    if(!assignByReference && variableWrapper.isWrapped(target[property])) {
        variableWrapper.assign(target[property], value);
    } else {
        target[property] = value;
    }
};

const newAssign = function(target, property, value, extendComplexObject, assignByReference, shouldCopyUndefined) {
    const goDeeper = extendComplexObject ? isObject(target) : isPlainObject(target);
    if(!assignByReference && variableWrapper.isWrapped(target[property])) {
        variableWrapper.assign(target[property], value);
    } else if(!assignByReference && Array.isArray(value)) {
        target[property] = value.map(item => deepExtendArraySafe(
            getDeepCopyTarget(item),
            item,
            extendComplexObject,
            assignByReference,
            shouldCopyUndefined
        ));
    } else if(!assignByReference && goDeeper) {
        target[property] = deepExtendArraySafe(
            getDeepCopyTarget(value),
            value,
            extendComplexObject,
            assignByReference,
            shouldCopyUndefined,
            newAssign
        );
    } else {
        target[property] = value;
    }
};

// B239679, http://bugs.jquery.com/ticket/9477
const deepExtendArraySafe = function(target, changes, extendComplexObject, assignByReference, shouldCopyUndefined, assignFunc = legacyAssign) {
    let prevValue;
    let newValue;

    for(const name in changes) {
        prevValue = target[name];
        newValue = changes[name];

        if(name === '__proto__' || name === 'constructor' || target === newValue) {
            continue;
        }

        if(isPlainObject(newValue) && !assignByReference) {
            const goDeeper = extendComplexObject ? isObject(prevValue) : isPlainObject(prevValue);
            newValue = deepExtendArraySafe(goDeeper ? prevValue : {}, newValue, extendComplexObject, assignByReference, shouldCopyUndefined);
        }

        const isDeepCopyArray = Array.isArray(newValue) && !assignByReference;
        const hasDifferentNewValue = (shouldCopyUndefined || newValue !== undefined) && prevValue !== newValue ||
            shouldCopyUndefined && prevValue === undefined;

        if(isDeepCopyArray || hasDifferentNewValue) {
            assignFunc(target, name, newValue, extendComplexObject, assignByReference, shouldCopyUndefined);
        }
    }

    return target;
};

export {
    clone,
    orderEach,
    deepExtendArraySafe,
    legacyAssign,
    newAssign
};
