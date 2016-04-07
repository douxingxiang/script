# coding: utf-8
# xml_parser
from bs4 import BeautifulSoup as bs
import os, re, sys

CONFIG = 'xml.config'
TAG_PATTERN = r"([^(]*)\(([^)]*)\)" # item(id, name)形式，group_1=item, group_2=id, name

conf_list = []
def parse_config(content):
    global conf_list
    for line in content:
        # 判断空行, 空行标记结束
        if len(line) == 0 or len(line.strip()) == 0:
            if item:
                item['tags'] = get_tag_list(item['tag'])
                conf_list.append(item)
                item = None
            continue
        line = line.strip()
        # 注释, 标记一段开始
        if line[0] == '#':
            item = {}
            continue
        key = line.split(':')[0]
        value = line[len(key)+1:]
        key = key.strip()
        value = value.strip()
        item[key] = value

def parse_xml(conf):
    log = open(conf['log'], 'w')
    log_str = []
    src = open(conf['source'], 'r')
    soup = bs(src) 
    log_str = inspect_node(soup, 0, conf['tags'], None)
    log.write(log_str)
    log.close()

def inspect_node(node, cur_index, tags, prefix):
    out = []
    
    tag = tags[cur_index]
    items = node.find_all(tag['tag'])
    for item in items:
        tmp_f_list = []
        out_list = []
        for f in tag['fields']:
            v = item.get(f)
            if not v or not v.strip():
                v = '-' # 空值默认为-
            else:
                v = v.encode('utf-8')
            tmp_f_list.append(v.strip())
        field_str = '\t'.join(tmp_f_list)
        out_str = '' # prefix + field_str + '\n'
        next_prefix = ''
        if prefix:
            next_prefix = prefix + '\t' + field_str
        else:
            next_prefix = field_str
        if cur_index < len(tags) - 1: # 没有解析到最后
            out.append(inspect_node(item, cur_index + 1, tags, next_prefix))
        elif cur_index == len(tags) - 1:
            out_str = next_prefix
            out_str += '\n' # 递归到底，添加换行
        out.append(out_str)
    return ''.join(out)

        
def get_tag_list(tag_str):
    tags = []
    tag_list = tag_str.split('/')
    for t in tag_list:
        tags.append(get_tag_and_fields(t.strip()))
    return tags
        
def get_tag_and_fields(tag_str):
    ''' return {tag: item, fileds:[id, name]}'''
    p = re.compile(TAG_PATTERN)
    #print tag_str
    m = p.match(tag_str)
    tag_dict = {'tag':'', 'fields':[]}
    if m:
        #标签名
        tag_dict['tag'] = m.group(1)
        # 标签属性列表
        field_str = m.group(2)
        f_list = field_str.split(',')
        for f in f_list:#属性去空白
            tag_dict['fields'].append(f.strip())
    return tag_dict

parse_config(open(CONFIG, 'r'))
for c in conf_list:
    parse_xml(c)
    