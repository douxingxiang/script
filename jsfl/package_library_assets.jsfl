/**
 * 整理库
 * 把有AS链接的库项目单独拎出来
 *  
 * @author  francis
 * @date    20130806
 * @version 1.0
 */
initScript();

function initScript()
{
	fl.outputPanel.clear();
	
	randomNameLibrary();
}

function randomNameLibrary()
{
	for each(var item in fl.getDocumentDOM().library.items) {
		item.name = "n_" + (Math.random()*100000000000000000).toString(32); 
	}
	
	makeAssetsFolder();
}

function makeAssetsFolder()
{
	fl.getDocumentDOM().library.newFolder("assets");
	fl.getDocumentDOM().library.expandFolder(false, true, "assets");
	
	moveItems();
}

function moveItems()
{
	for each(var item in fl.getDocumentDOM().library.items) {
		if(item.itemType == "folder") continue;
		if(item.linkageClassName) {
			if(item.name.lastIndexOf("/") != -1) {
				fl.getDocumentDOM().library.moveToFolder("", item.name);
			}
			continue;
		}
		
		fl.getDocumentDOM().library.moveToFolder("assets", item.name);
	}
	
	cleanFolder();
}

function cleanFolder()
{
	for each(var item in fl.getDocumentDOM().library.items) {
		if(item.itemType != "folder") continue;
		if(item.name == "assets") continue;
		fl.getDocumentDOM().library.deleteItem(item.name);
	}
}

function log(str)
{
	if(arguments.length > 1) {
		for(var i = 0; i < arguments.length - 1; i++) {
			str = str.replace("{"+i+"}", arguments[i+1]);
		}
	}
	fl.trace(str);
}