drop table if exists passwd;
create table passwd(
	id int primary key auto_increment,
	name varchar(255) unique not null comment 'a unique name',
    uid varchar(255) not null comment 'account name',
    pass varchar(255) not null comment 'encrypted password',
    title varchar(255) comment 'description',
    i_time int comment 'create time',
    u_time int comment 'update time',
    url varchar(255) comment 'website url'
)engine=innodb default charset=utf8;