CREATE TABLE users(
 user_id SERIAL PRIMARY KEY,
 username VARCHAR (50) NOT NULL,
 password VARCHAR (50),
 notes VARCHAR (300)
)

SELECT * FROM users

DROP TABLE users

insert into users (username, password, notes) 
values ('hi', 'hi', 'abc'), ('hi', 'hi', 'test'), ('hi', 'hi', 'ok')