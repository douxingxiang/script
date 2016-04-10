/**
 * console
 */
 
Console = {
    clear: function() {
        fl.outputPanel.clear();
    },
    
    log: function(txt/*, ... */) {
        for(i = 0; i < arguments.length - 1; i++) {
            txt = txt.replace("{" + i + "}", arguments[i+1]);
        }
        fl.trace(txt);
    }
}

function init(tm) {
    tm.console = Console;
}