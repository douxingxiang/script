/**
 * initialize for taomee modules
 */
var tm = {};
tm.core_path = fl.configURI + "Commands/Seer/core/";

tm.load = function(modules) {
    for(var i = 0; i < modules.length; i++) {
        var path = tm.core_path + modules[i] + ".jsfl";
        if(FLfile.exists(path)) {
            fl.runScript(path, "init", tm);
        } else {
            fl.trace(path + " doesn't exists");
        }
    }
}

function init(scope) {
    scope.tm = tm;
}
