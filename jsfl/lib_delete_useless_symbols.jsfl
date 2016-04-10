// delete useless symbols
fl.runScript(fl.configURI + "Commands/Seer/core/taomee.jsfl", "init", this);

tm.load(["console", "library", "timeline"]);
tm.console.clear();

var used = {};
var lib = new tm.library(fl.getDocumentDOM().library);
lib.eachItem(function(item, index, items) {
    //sound, video, bitmap may need special process
    if(item.itemType != "folder") {
        used[item.name] = 0;
    } //mark every item's used count
    tm.console.log("name:{0}, type:{1}", item.name, item.itemType);
});

var stage = new tm.stage(fl.getDocumentDOM());
stage.eachTimeline(function(timeline, index, timelines) {
    everyTimeline(timeline);
});

// lib.eachItem(function(item, index, items) {
    //sound, video, bitmap may need special process
    // if(item.itemType != "folder") {
        // used[item.name] = 0;
    // } //mark every item's used count
    // tm.console.log("name:{0}, type:{1}", item.name, item.itemType);
    // tm.console.log("{0}:{1}", item.name, used[item.name]);
    // item.name = used[item.name]+"_"+item.name;
// });
var cnt = 0;
for(var k in used) {
    tm.console.log("{0}\t{1}", k, used[k]);
    if(used[k] != 0) cnt++;
}
tm.console.log("{0}/{1}", cnt, lib.lib.items.length);

function everyTimeline(timeline) {
    new tm.timeline(timeline).eachElement(function(elem, frame, layer) {
        everyElement(elem);
    });
}

function everyElement(elem) {
    if(elem.elementType == "instance") {
        var item = elem.libraryItem;
        //if(used[item.name] == 0) {
            used[item.name]++;
            //tm.console.log("{0}:{1}:{2}", elem.name, item.name, used[item.name]);
            everyTimeline(item.timeline);
        //}
    } else if( ["shape", "shapeObj"].indexOf(elem.elementType) != -1 && elem.inGroup) {
        everyGroup(elem);
    }
}

function everyGroup(elem) {
    var mems = elem.members;
    for(var i = 0; i < mems.length; i++) {
        everyElement(mems[i]);
    }
}
    