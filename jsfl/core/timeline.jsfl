/**
 * stage
 */
fl.trace("code goes here")
function Stage(doc) {
    this.doc = doc;
}

Stage.prototype.eachTimeline = function(callback) {
    if(!this.doc || !callback) return;
    
    var timelines = this.doc.timelines;
    for(var i = 0; i < timelines.length; i++) {
        callback(timelines[i], i, timelines);
    }
}

Stage.prototype.eachLayer = function( callback) {
    if(!this.doc || !callback) return;
    
    var tms = this.doc.timelines;
    for(var i = 0; i < tms.length; i++) {
        var layers = tms[i].layers;
        for(var j = 0; j < layers.length; j++) {
            callback(layers[j], tms[i]);
        }
    }
}
	
Stage.prototype.eachFrame = function( callback) {
    if(!this.doc || !callback) return;
    
    var tms = this.doc.timelines;
    for(var i = 0; i < tms.length; i++) {
        var layers = tms[i].layers;
        for(var j = 0; j < layers.length; j++) {
            var frames = layers[j].frames;
            for(var k = 0; k < frames.length; k++) {
                callback(frames[k], layers[j],tms[i]);
            }
        }
    }
}
	
Stage.prototype.eachElement = function( callback) {
    if(!this.doc || !callback) return;
    
    var tms = this.doc.timelines;
    for(var i = 0; i < tms.length; i++) {
        var layers = tms[i].layers;
        for(var j = 0; j < layers.length; j++) {
            var frames = layers[j].frames;
            for(var k = 0; k < frames.length; k++) {
                var elems = frames[k].elements;
                for(var l = 0; l < elems.length; l++) {
                    callback(elems[l], frames[k], layers[j], tms[i]);
                }
            }
        }
    }
}

function Timeline(timeline) {
    this.timeline = timeline;
}

Timeline.prototype.eachLayer = function( callback) {
    if(!this.timeline || !callback) return;
    
    var layers = this.timeline.layers;
    for(var j = 0; j < layers.length; j++) {
        callback(layers[j], j, layers);
    }
}

Timeline.prototype.eachFrame = function(callback) {
    if(!this.timeline || !callback) return;
    
    var layers = this.timeline.layers;
    for(var j = 0; j < layers.length; j++) {
        var frames = layers[j].frames;
        for(var k = 0; k < frames.length; k++) {
            callback(frames[k], layers[j]);
        }
    }
}

Timeline.prototype.eachElement = function(callback) {
    if(!this.timeline || !callback) return;
    
    var layers = this.timeline.layers;
    for(var j = 0; j < layers.length; j++) {
        var frames = layers[j].frames;
        for(var k = 0; k < frames.length; k++) {
            var elems = frames[k].elements;
            for(var l = 0; l < elems.length; l++) {
                callback(elems[l], frames[k], layers[j]);
            }
        }
    }
    // var layers = this.timeline.layers;
    // for(var i = 0; i < layers.length; i++) {
        // var layer = new Layer(layers[i]);
        // layer.eachFrame(function(frame, j, frames) {
            // var f = new Frame(frame);
            // f.eachElement( function(elem, k, elems) {
                // callback(elem, frame, layers[i]);
            // });
        // });
    // }
}

/**
 * layer
 */
function Layer(layer) {
	this.layer = layer;
}
Layer.prototype.eachFrame = function( callback ) {
    if(!this.layer || !callback) return;
    
    var frames = this.layer.frames;
    for(var i = 0; i < frames.length; i++) {
        callback( frame[i], i, frames);
    }
}

/**
 * frame
 */
function Frame(frame) {
	this.frame = frame;
}

Frame.prototype.eachElement = function ( callback ) {
    if(!this.frame || !callback) return;
    
    var elems = this.frame.elements;
    for(var i = 0; i < elems.length; i++) {
        callback( elems[i], i, elems);
    }
}

/**
 * element
 */
function Element(elem) {
	this.elem = elem;
}

function init(tm) {
    tm.stage = Stage;
    tm.timeline = Timeline;
    tm.layer = Layer;
    tm.frame = Frame;
    tm.element = Element;
}