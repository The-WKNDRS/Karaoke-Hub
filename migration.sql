DROP DATABASE IF EXISTS karaoke_hub;
CREATE DATABASE IF NOT EXISTS karaoke_hub;
USE karaoke_hub;

create table venue
(
    id       bigint auto_increment
        primary key,
    location varchar(100) not null,
    name     varchar(100) not null,
    yelp_id  bigint       null
);

create table users
(
    id       bigint auto_increment
        primary key,
    email    varchar(255) not null,
    password varchar(255) not null,
    username varchar(60)  not null,
    venue_id bigint       null,
    constraint UK_i213kuuy951gve82e7xaadj6s
        unique (venue_id),
    constraint UK_r43af9ap4edm43mmtq01oddj6
        unique (username),
    constraint FKmhhw40hqa0jgeirc26fsnqv80
        foreign key (venue_id) references venue (id)
);

