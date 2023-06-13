DROP DATABASE IF EXISTS karaoke_hub;
CREATE DATABASE IF NOT EXISTS karaoke_hub;
USE karaoke_hub;

create table users
(
    id       bigint auto_increment
        primary key,
    email    varchar(255) not null,
    password varchar(255) not null,
    username varchar(60)  not null,
    constraint UK_r43af9ap4edm43mmtq01oddj6
        unique (username)
);

create table venue
(
    id       bigint auto_increment
        primary key,
    address  varchar(100) not null,
    city     varchar(100) not null,
    name     varchar(100) not null,
    state    varchar(4)   not null,
    website  varchar(100) null,
    yelp_id  varchar(100) null,
    zip_code varchar(6)   not null
);

create table events
(
    id          bigint auto_increment
        primary key,
    day_of_week varchar(100) not null,
    dj          varchar(100) null,
    end_time    varchar(10)  not null,
    start_time  varchar(10)  not null,
    venue_id    bigint       null,
    constraint FKmfjnq0fk59oupk21owjh7ansi
        foreign key (venue_id) references venue (id)
);

