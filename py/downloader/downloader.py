# coding: utf-8
import urllib2,cookielib

req_header = {
		'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleW    ebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2593.0 Safari/537.36'
}
req_timeout = 5
ERR_MAX = 3

def save(url, path):
	f = open(path, 'w')
	content = download(url)
	f.write(content)

def download(url):
	'''download an url and return file content '''
	print url
	cookie_support= urllib2.HTTPCookieProcessor(cookielib.CookieJar())
	opener = urllib2.build_opener(cookie_support, urllib2.HTTPHandler)
	urllib2.install_opener(opener)
	req = urllib2.Request(url, None, req_header)
	error_cnt = 0
	for err_cnt in xrange(0, ERR_MAX):
		try:
			res = urllib2.urlopen(req, None, req_timeout)
			return res.read()
		except Exception as  err:
			print 'err #%d, %s, try again' %(err_cnt+1, err)
			if err_cnt >= ERR_MAX - 1:
				print 'give up %s' % url
				return ''
	
def retrieve(url, filepath):
	import urllib
	urllib.urlretrieve(url, filepath, reporthook=retrieve_hook)

def retrieve_hook(block_read, block_size, total_size):
	print 'read %d block with size %d of total %d' %(block_read, block_size, total_size)

def open_save(url, filepath):
	with open(filepath, 'w') as f:
		f.write(urllib2.urlopen(url).read)

def curl(url, filepath):
	url = url.strip()
	filepath = filepath.strip()
	print url, filepath
	import pycurl
	c = pycurl.Curl()
	c.setopt(c.URL, url)
	f = open(filepath, 'wb')
	c.setopt(c.WRITEDATA, f)
	c.setopt(c.PROGRESSFUNCTION, progress_func)
	c.perform()
	c.close()

def progress_func(d_total, d, u_total, u):
	print 'download %d/%d, upload %d/%d' %(d, d_total, u, u_total)

def curl_save(url, filepath):
	url = url.strip()
	filepath = filepath.strip()
	import subprocess
	print url
	subprocess.call('curl -o %s %s' % (filepath, url), shell=True)
