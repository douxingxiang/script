/**
 * 大批量元件命名
 * 格式：[前缀][后缀], 如mc_0
 * @author francis
 * @date   2014-3-19
 */
var prefix = '';//命名前缀格式
var nIndex = 0;
var eventId = 0;

fl.outputPanel.clear();
fl.trace("命名开始");
doStart();

function doStart()
{
	
	prefix = prompt("默认前缀", "sym_");
	if(!prefix)
	{
		fl.trace("命名退出");
		return;
	}
	nIndex = prompt("后缀起始Index", "0");
	if(nIndex == null)
	{
		fl.trace("命名退出");
		return;
	}
	nIndex = parseInt(nIndex);
	
	eventId = fl.addEventListener('selectionChanged', onSelectionChanged);
	fl.trace("开始命名，等待元件选定，选择多于一个元件结束命名");
}

function onSelectionChanged()
{
	var selections = fl.getDocumentDOM().selection;
	
	if(!selections) return;
	
	if(selections.length != 1)
	{
		fl.removeEventListener('selectionChanged', eventId);
		nIndex = 0;
		fl.trace('命名结束')
		return;
	}

	var elem = selections[0];
	if(elem.elementType == "text" || (elem.elementType == 'instance' &&  elem.instanceType == 'symbol'))
    {
        elem.name = prefix + nIndex;
        nIndex ++;
        fl.trace('命名' + elem.name);
    }
}