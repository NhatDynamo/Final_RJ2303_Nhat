create database TESTDB;
use TESTDB;
create table books(
	id int not null auto_increment,
    title varchar(200)  not null,
    author varchar(250) not null,
    category varchar(300) not null,
    price int not null,
    date date not null,
    numberPage int not null,
    image varchar(300) not null,
    description varchar(3000) not null,
    primary key (id)
);
alter table books auto_increment = 100;

create table users(
	id int not null auto_increment,
    uname varchar(200)  not null,
    passwd varchar(250) ,
    fullName varchar(300),
	email varchar(300) ,
    address varchar(300) ,
    numberPhone varchar(45) ,
    isAdmin boolean,
    SocialID varchar(255) ,
    avatar varchar(255) ,

    primary key(id)
);
alter table users auto_increment = 100;

create table CartItem(
	id int not null auto_increment,
    UserId int not null,
    bookId int not null,
    quantity int not null,
	primary key(id),
    foreign key(userID) references users(id),
    foreign key(bookID) references books(id)
);
alter table CartItem auto_increment = 100;


create table bookReview(
	id int not null auto_increment,
    idBook int not null,
    idUser int not null,
    vote int not null,
    content varchar(1230) not null,
    likeCount int not null,
	primary key(id),
    foreign key(idUser) references users(id),
    foreign key(idBook) references books(id)
);
alter table bookReview auto_increment = 100;

create table Orders(
	id int not null auto_increment,
    idUser int not null,
    createAt date not null,
    status varchar(255) not null,
    totalPrice int not null,
	primary key(id),
    foreign key(idUser) references users(id) 
);
alter table Orders auto_increment = 100;
create table OrderLine(
	id int not null auto_increment,
    idOrder int not null,
    idBook int not null,
    quantity int not null,
	primary key(id),
    foreign key(idOrder) references Orders(id),
    foreign key(idBook) references books(id)
);
alter table OrderLine auto_increment = 100;