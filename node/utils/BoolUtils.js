/**
 * Created by francis on 2016/4/29.
 */
/*jslint node: true*/
"use strict";

var boolUtils = {};
/**
 * check if every element is true
 * 全部元素都是true
 * @param boolList {boolean[]}
 * @return {boolean}
 */
boolUtils.every = function(boolList) {
    if(!boolList || !boolList.length || boolList.length == 0) {
        return false;
    }
    return boolUtils.trueNumOf(boolList, boolList.length);
};

/**
 * check if none of elements is true
 * 全部元素都是false
 * @param boolList {boolean[]}
 * @returns {boolean}
 */
boolUtils.none = function(boolList) {
    if(!boolList || !boolList.length || boolList.length == 0) {
        return false;
    }
    return boolUtils.trueNumOf(boolList, 0);
};

/**
 * check if one of elements is true
 * 至少有一个是true
 * @param boolList {boolean[]}
 * @returns {boolean}
 */
boolUtils.some = function(boolList) {
    if(!boolList || !boolList.length || boolList.length == 0) {
        return false;
    }
    return boolUtils.trueNumOf(boolList, 1);
};

/**
 * check if trueCnt elements of boolList is true
 * 指定数量的元素是true
 * @param boolList {boolean[]}
 * @param trueCnt {number}
 * @return {boolean}
 */
boolUtils.trueNumOf = function(boolList, trueCnt) {
    var cnt = 0;
    for(var i = 0; i < boolList.length; i++) {
        if(!!boolList[i]) cnt++;
    }
    return cnt === trueCnt;
};

module.exports = boolUtils;
