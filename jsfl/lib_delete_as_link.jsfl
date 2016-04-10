// delete all as linkage 
fl.runScript(fl.configURI + "Commands/Seer/core/taomee.jsfl", "init", this);

tm.load(["console", "library"]);

for(var k in this) fl.trace(k);
var lib = new tm.library(fl.getDocumentDOM().library);
lib.eachItem( function( item, index, items) {
    tm.console.log("#{0}:{1}:{2}", index+1, item.name, item.linkageClassName);
    if(item.linkageClassName) {
        item.linkageClassName = "";
        item.linkageExportForAS = false;
    }
});