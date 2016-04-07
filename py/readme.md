# xml parser
提取xml配置表中的字段
- 支持嵌套结构
```lang=xml
<Items>
  <Cat ID="0" DbCatID="0" Name="派派属性" Max="4000000000" url="resource/item/doodle/icon/">
    <Item ID="1" Name="赛尔豆" Price="0" Tradability="0" VipTradability="0" DailyKey="17000" DailyOutMax="3000000"/>
    <Item ID="2" Name="小屋电量" Price="0" Tradability="0" VipTradability="0"/>
    <Item ID="3" Name="积累经验" Price="0" Tradability="0" VipTradability="0"/>
    <Item ID="4" Name="战队徽章" Price="0" Tradability="0" VipTradability="0"/>
    <Item ID="5" Name="钻石" Price="0" Tradability="0" VipTradability="0"/>
    <Item ID="6" Name="乱斗徽章" Price="0" Tradability="0" VipTradability="0"/>
    <Item ID="7" Name="勇者徽章" Price="0" Tradability="0" VipTradability="0"/>
    <Item ID="8" Name="竞技战徽章" Price="0" Tradability="0" VipTradability="0"/>
  </Cat>
</Items>
```
配置 提取的标签和属性
```
cat(id)/item(id, name)
```
将会输出
```
0	1	赛尔豆
0	2	小屋电量
0	3	积累经验
0	4	战队徽章
0	5	钻石
0	6	乱斗徽章
0	7	勇者徽章
0	8	竞技战徽章
```