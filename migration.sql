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

create table events
(
    id          bigint auto_increment
        primary key,
    date        varchar(100) null,
    description varchar(255) not null,
    dj          varchar(100) null,
    name        varchar(100) not null,
    venue_id    bigint       null,
    constraint FKmfjnq0fk59oupk21owjh7ansi
        foreign key (venue_id) references venue (id)
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

INSERT INTO venue (location, name) VALUES ('San Francisco', 'The Mint');

insert into events (date, description, dj, name, venue_id) values ('2019-01-01', 'New Years Eve Karaoke themed blowout! Everyone attending must wear a tuxedo or dress.', 'DJ Khaled', 'New Years Eve Night', 1);

INSERT INTO events (date, description, dj, name, venue_id) VALUES ('2022-01-12', '80\'s Songs only! Be sure to Dress the part.', 'DJ CantLetGo', '80\'s Theme Night', 1);
