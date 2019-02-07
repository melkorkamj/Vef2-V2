CREATE TABLE applications (
  id serial primary key,
  name varchar(64) not null,
  email varchar(64) not null,
  phone varchar(8),
  text text,
  job varchar(64),
  processed boolean NOT NULL DEFAULT FALSE,
  created timestamp NOT NULL DEFAULT current_timestamp,
  updated timestamp NOT NULL DEFAULT current_timestamp
);