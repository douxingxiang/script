/**
 * RenameMapMc.jsfl
 * 
 * 重命名场景动画各帧元件名称为
 *   mc1,mc2,mc3,..
 * 
 * 用法：选定场景动画,运行命令即可
 * 
 * 原理：
 *   判断选定对象是否为单个MovieClip元件
 *   尝试获取选定对象Item的时间轴,图层和帧
 *   遍历各帧上的对象,重命名
 * 
 * @author  francis
 * @date    2013-2-18
 * @version 1.0
 * Copyleft to Seer and ALL.
 */
 
//========变量声明开始==========

/*
 * 当前文档
 */
var _doc = fl.getDocumentDOM();

/*
 * 当前选定对象
 */
var _select = null;

/*
 * 当前选定mc实例
 */

/*
 * 当前选定mc对应库元件
 */
var _mc = null;

//=========函数声明开始============

function RenameMapMc()
{
	if(!isSelectValid(_doc.selection))
	{
		return;
	}
	
	_select = _doc.selection[0];
	
	if(!isMcValid(_select))
	{
		return;
	}
	
	_mc = _select.libraryItem;
	fl.trace("[*]mc元件名称为<" + _mc.name + ">");
	
	var _timeline = _mc.timeline;
	fl.trace("[*]mc图层数<" + _timeline.layerCount + ">");
	var _layers = _timeline.layers;
	
	for(var i = 0; i < _timeline.layerCount; i++)
	{
		var _layer = _layers[i];
		
		fl.trace("mc图层<" + _layer.name + ">中共<" + _layer.frameCount + ">帧");
		if(!isLayerValid(_layer))
		{
			fl.trace("[*]mc图层<" + _layer.name + ">不符合要求！");
			continue;
		}
		var _frames = _layer.frames;
		
		for(var j = 0; j < _layer.frameCount; j++)
		{
			var _frame = _frames[j];
			var _elem = _frame.elements[0];
			_elem.name = "mc" + (j + 1);
			fl.trace("[*]第<" +  (j + 1) + ">帧对象<" + _elem.libraryItem.name + ">实例已重命名为<" + _elem.name + ">");
		}
		fl.trace("重命名<" + _mc.name + ">图层<" + _layer.name + ">结束！");
		return;
	}
	
	if(i > _timeline.layerCount)
	{
		fl.trace("没有在mc中找到符合要求的图层！");
	}
}

/**
 * 判断选定是否为单个对象
 * 参数：selectA 选定对象数组
 */
function isSelectValid(selectA)
{
	//当前选定对象数组
	var selectArray = selectA;
	
	if(selectArray == null//未打开fla文档
	   || selectArray.length == 0)//未选定对象
	{
		fl.trace("[*]对象为空！");
		return false;
	}
	
	//选定超过了一个对象
	if(selectArray.length > 1)
	{
		fl.trace("[*]包含了" + selectArray.length + "个对象！");
		return false;
	}
	
	return true;
}

/**
 * 判断选定对象是否是MovieClip
 * 参数：select 选定对象
 */
function isMcValid(select)
{
	var mc = select;
	
	//判断元素类型是否相符
	if(mc.elementType != "instance")
	{//shape,text,tlfText,instance,shapeObj
		fl.trace("[*]对象" + mc.libraryItem.name + "是" + mc.elementType + "类型,不是instance!");
		return false;
	}
	
	//判断实例类型是否相符
	if(mc.instanceType != "symbol")
	{//symbol,bitmap, embeded vedio, linked vedio, vedio, compiled clip
		fl.trace("[*]对象" + mc.libraryItem.name + "是" + mc.instanceType + "类型，不是symbol！");
		return false;
	}
	
	//判断元件类型是否相符
	if(mc.symbolType != "movie clip")
	{//button, movie clip, graphic
		fl.trace("[*]对象" + mc.libraryItem.name + "是" + mc.symbolType + "类型，不是movie clip");
		return false;
	}
	
	return true;
}

/**
 * 判断图层各帧是否仅包含单个MovieClip
 * 参数：_layer 图层
 */
function isLayerValid(_layer)
{
	var _frames = _layer.frames;
	
	for(var i = 0; i < _layer.frameCount; i++)
	{
		var _frame = _frames[i];
		
		if(!isFrameValid(_frame))
		{
			return false;
		}
	}
	
	return true;
}

/**
 * 判断帧是否仅包含单个MovieClip
 * 参数：_frame 图层
 */
function isFrameValid(_frame)
{
	var elems = _frame.elements;
	
	if(!isSelectValid(elems))
	{//元素数量不符
		return false;
	}
	
	if(!isMcValid(elems[0]))
	{//元素类型不符
		return false;
	}
	
	return true;
}

//======函数调用开始===========

//清除输出面板内容
fl.outputPanel.clear();
//执行主函数
RenameMapMc();
