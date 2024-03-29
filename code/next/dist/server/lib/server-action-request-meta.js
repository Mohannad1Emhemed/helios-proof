"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getServerActionRequestMetadata: null,
    getIsServerAction: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getServerActionRequestMetadata: function() {
        return getServerActionRequestMetadata;
    },
    getIsServerAction: function() {
        return getIsServerAction;
    }
});
const _approuterheaders = require("../../client/components/app-router-headers");
function getServerActionRequestMetadata(req) {
    let actionId;
    let contentType;
    if (req.headers instanceof Headers) {
        actionId = req.headers.get(_approuterheaders.ACTION.toLowerCase()) ?? null;
        contentType = req.headers.get("content-type");
    } else {
        actionId = req.headers[_approuterheaders.ACTION.toLowerCase()] ?? null;
        contentType = req.headers["content-type"] ?? null;
    }
    const isURLEncodedAction = Boolean(req.method === "POST" && contentType === "application/x-www-form-urlencoded");
    const isMultipartAction = Boolean(req.method === "POST" && (contentType == null ? void 0 : contentType.startsWith("multipart/form-data")));
    const isFetchAction = Boolean(actionId !== undefined && typeof actionId === "string" && req.method === "POST");
    return {
        actionId,
        isURLEncodedAction,
        isMultipartAction,
        isFetchAction
    };
}
function getIsServerAction(req) {
    const { isFetchAction, isURLEncodedAction, isMultipartAction } = getServerActionRequestMetadata(req);
    return Boolean(isFetchAction || isURLEncodedAction || isMultipartAction);
}

//# sourceMappingURL=server-action-request-meta.js.map