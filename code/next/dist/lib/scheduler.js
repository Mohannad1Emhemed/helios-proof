"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    scheduleOnNextTick: null,
    scheduleImmediate: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    scheduleOnNextTick: function() {
        return scheduleOnNextTick;
    },
    scheduleImmediate: function() {
        return scheduleImmediate;
    }
});
const scheduleOnNextTick = (cb)=>{
    // We use Promise.resolve().then() here so that the operation is scheduled at
    // the end of the promise job queue, we then add it to the next process tick
    // to ensure it's evaluated afterwards.
    //
    // This was inspired by the implementation of the DataLoader interface: https://github.com/graphql/dataloader/blob/d336bd15282664e0be4b4a657cb796f09bafbc6b/src/index.js#L213-L255
    //
    Promise.resolve().then(()=>{
        process.nextTick(cb);
    });
};
const scheduleImmediate = (cb)=>{
    if (process.env.NEXT_RUNTIME === "edge") {
        setTimeout(cb, 0);
    } else {
        setImmediate(cb);
    }
};

//# sourceMappingURL=scheduler.js.map