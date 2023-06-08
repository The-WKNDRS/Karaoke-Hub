DROP DATABASE IF EXISTS karaoke_hub;
CREATE DATABASE IF NOT EXISTS karaoke_hub;
USE karaoke_hub;

create table venue (
                       id  int unsigned auto_increment primary key,
                       name     varchar(80)  null,
                       location varchar(255) null,
                       yelp_id  varchar(80)  unique
);
create table users (
                       id       int unsigned auto_increment primary key,
                       username varchar(60)  not null,
                       email    varchar(255) not null,
                       password varchar(255) not null,
                       venue_id int unsigned null,
                       constraint users_venue_id_fk foreign key (venue_id) references venue (id)
);

create table comments
(
    id       int unsigned auto_increment
        primary key,
    content  text         not null,
    user_id  int unsigned not null,
    venue_id int unsigned not null,
    constraint comments_users_id_fk
        foreign key (user_id) references users (id),
    constraint comments_venue_yelp_id_fk
        foreign key (venue_id) references venue (id)
);

create table events
(
    id            int unsigned auto_increment
        primary key,
    day_of_week   varchar(20)  null,
    name          varchar(80)  not null,
    description   text         null,
    dj            varchar(60)  null,
    venue_id int unsigned null,
    constraint events_venue_yelp_id_fk
        foreign key (venue_id) references venue (id)
);

