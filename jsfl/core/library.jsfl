/**
 * library
 */
function Library(lib) {
    this.lib = lib;
}

Library.prototype.eachItem = function( callback ) {
    if(!this.lib || !callback) return;
    
    var items = this.lib.items;
    for( var i = 0; i < items.length; i++) {
        callback(items[i], i, items);
    }
}

/**
 * symbol
 */
function Item(item) {
    this.item = item;
}

function init(tm) {
    tm.library = Library;
    tm.item = Item;
}