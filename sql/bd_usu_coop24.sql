create user 'coop24'@'localhost' identified by 'coop';
grant usage on *.* to 'coop24'@'localhost' identified by 'coop24' ;
create database if not exists `coop24`  default character set utf8 collate utf8_spanish_ci;;
grant all privileges on `coop24`.* to 'coop24'@'localhost';
use `coop24`;
