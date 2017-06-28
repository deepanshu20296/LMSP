schema.sql

create database if not exists employee;

use employee;

drop table if exists tblUsers;

create table if not exists tblUsers(
   userId integer primary key auto_increment,
   username varchar(50) unique,
   password varchar(100),
   fname varchar(50),
   lname varchar(50),
   designation varchar(50)
)engine=innodb; 

create table if not exists leave_data(
    username varchar(50),
    leavedata varchar(200)
)engine=innodb;

/*schema.sql

create database if not exists dbUsers;

use dbUsers;

drop table if exists tblUsers;

create table if not exists tblUsers(
   userId integer primary key auto_increment,
   username varchar(100) unique,
   password varchar(100)
)engine=innodb; 

create table if not exists leave_data(
    username varchar(100),
    leavedata varchar(500)
)engine=innodb;*/