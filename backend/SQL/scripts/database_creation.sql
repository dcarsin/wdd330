drop database if exists speeches;

create database speeches;

use speeches;

drop table if exists members;

create table members(
id int auto_increment,
name varchar(50),
lastName varchar(50),
gender enum('F', 'M'),
dob date,
phone varchar(50),
email varchar(50),
status boolean,
primary key(id)
);
insert into members values 
(null, 'Ezequiel', 'Lopez', 'M', '1996-11-29', '59899811832', 'lopezezequiel9611@gmail.com', true),
(null, 'Gabriela', 'Martinez', 'F', '1999-01-10', '59899811832', 'ga100199@gmail.com', true);

drop table if exists speeches;

create table speeches (
id int auto_increment,
member_id int references members(id),
duration int,
topic varchar(500),
dissert_date date,
primary key(id)
);



