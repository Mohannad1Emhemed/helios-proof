"use strict";

var _class_apply_descriptor_get = require("./_class_apply_descriptor_get.cjs");
var _class_extract_field_descriptor = require("./_class_extract_field_descriptor.cjs");

exports._ = exports._class_private_field_get = _class_private_field_get;
function _class_private_field_get(receiver, privateMap) {
    var descriptor = _class_extract_field_descriptor._(receiver, privateMap, "get");
    return _class_apply_descriptor_get._(receiver, descriptor);
}
