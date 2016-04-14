# coding: utf-8

import sys, os, getpass

class Cmd:
    ''' command handler'''
    cmd = ''
    conn = None
    passwd = None
    handler = None
    def init(self):
        ''' init db connection, pass manager, command handlers'''
        self.conn = Connection()
        self.conn.init()
        
        self.passwd = Passwd()
        self.handler = CmdHandler(self.conn, self.passwd)
        #register_hander()
    def register_handler(self):
        ''' register handler for command'''
        pass
    def parse(self):
        ''' dispatch command '''
        cmd = raw_input('>>')
        cmd_params = cmd.split(' ')
        
        if cmd_params[0] == 'exit':
            self.destroy()
        elif not hasattr(self.handler, cmd_params[0]):
            print ' command %s not known yet' % cmd_params[0]
            self.handler.usage()
        else:
            getattr(self.handler, cmd_params[0])(cmd_params)
            
    def destroy(self):
        if self.handler:
            self.handler.close()
        if self.conn:
            self.conn.close()
        self.passwd.close();

class CmdHandler:
    ''' command handler '''
    conn = None
    passwd = None
    
    def __init__(self, conn, passwd):
        self.conn = conn
        self.passwd = passwd
    def close(self):
        self.conn.close()
        self.passwd.close()
    def usage(self, args=None):
        print '''
usage: passwd [command] [options]
command:
    exit                        exit passwd
    select_domain [domain]      select one password domain
    change_domain_key [domain]  change current domain decrypted key
    create_domain [domain]      create a new domain
    list_domain                 list all domain names
    remove_domain [domain]      delete domain
    list_account                list all accounts in current domain
    select_account [account]    view account detail
    change_account [account]    change account password or account name
    create_account              create a new account
    remove_account  [account]   delete an account
''' 
    def create_domain(self, args):
        if len(args) < 2 or not args[1]:
            print ' create_domain: no domain specified'
            return
        domain = args[1]
        sql = 'create table if not exists %s(id int primary key auto_increment, name varchar(255) not null, username varchar(255) not null, passwd varchar(255), c_time int, u_time int, url varchar(255), comment varchar(255))' % domain
        self.conn.execute(sql)
        self.conn.commit()
        
    def select_domain(self, args):
        ''' select a passwd domain'''
        if len(args) < 2 or not args[1]:
            print ' create_domain: no domain specified'
            return
        domain = args[1]
        self.passwd.select(domain)
    
    def list_domain(self, args):
        ''' list all domain'''
        sql = 'show tables'
        self.conn.execute(sql)
        rows = self.conn.fetchall()
        for row in rows:
            print row[0]
    def remove_domain(self, args):
        ''' remove domain'''
        if len(args) < 2 or not args[1]:
            print ' create_domain: no domain specified'
            return
        domain = args[1]
        sql = 'drop table if exists %s' % domain
        self.conn.execute(sql)
        self.conn.commit()
    def list_account(self, args):
        if not self.passwd.cur_domain:
            print '  you have not choose one domain'
            return
        domain = self.passwd.cur_domain
        sql = 'select * from %s' % domain
        self.conn.execute(sql)
        rows = self.conn.fetchall()
        for row in rows:
            print row
class Connection:
    ''' connection manager'''
    conn = None
    cursor = None
    def init(self):
        ''' connect passwd database '''
        db_type = raw_input('>>choose db type: (1 mysql, 2 sqlite)')
        db_type = str(db_type)
        if db_type == '1':
            import MySQLdb
            db_param = raw_input('>> raw_input host, username, passwd, database(sep by ,): ')
            arr = db_param.split(',')
            self.conn = MySQLdb.connect(arr[0], arr[1], arr[2], arr[3])
            self.cursor = self.conn.cursor()
        elif db_type == '2':
            db_param = raw_input('>> raw_input db file location: ')
            self.conn = sqlite3.connect(db_param.strip())
            self.cursor = self.conn.cursor()
    def close(self):
        if self.conn:
            self.conn.close()
    def execute(self, sql):
        return self.cursor.execute(sql)
    def fetchall(self):
        return self.cursor.fetchall()
    def execute_many(self, sql, list):
        self.cursor.executemany(sql, list)
    def commit(self):
        self.conn.commit()

class Passwd:
    ''' 记录配置 '''
    decrypted_keys = {}
    cur_domain = None
    cur_key = None
    def __init__(self):
        pass
    def get_key(self, domain):
        ''' get decrypted key for domain'''
        if domain not in self.decrypted_keys:
            print '  domain %s not known yet' % domain
        return self.decrypted_keys[domain]
    def select(self, domain):
        ''' select domain '''
        if domain not in self.decrypted_keys:
            self.input_key(domain)
        self.cur_domain = domain
        self.cur_key = self.get_key(domain)
    def input_key(self, domain):
        ''' input decrypted key for '''
        key = getpass.getpass(">> input decrypted key for domain %s" % domain)
        self.decrypted_keys[domain] = key
    def close(self):
        self.decrypted_keys = None

if __name__ == '__main__':
    cmd = Cmd()
    cmd.init()
    while True:
        try:
            cmd.parse()
        except  Exception, e: 
            print e