CREATE DATABASE IF NOT EXISTS address_book;
USE address_book;

DROP TABLE IF EXISTS `address`;
DROP TABLE IF EXISTS `email`;
DROP TABLE IF EXISTS `person`;

CREATE TABLE `person` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100),
  `last_name` VARCHAR(100),
  PRIMARY KEY(`id`)
);

CREATE TABLE address (
  `id` INT NOT NULL AUTO_INCREMENT,
  `owner_id` INT,
  `street_number` INT NOT NULL,
  `street_name` VARCHAR(100),
  `city` VARCHAR(100),
  `state` VARCHAR(100),
  `country` VARCHAR(100),
  `zipcode` INT,
  FOREIGN KEY (`owner_id`)
    REFERENCES `person`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  PRIMARY KEY(`id`)
);

CREATE TABLE `email` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `person_id` INT,
  `email_address` VARCHAR(100),
  FOREIGN KEY (`person_id`)
    REFERENCES `person`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  PRIMARY KEY(`id`)
);

ALTER TABLE `person` ADD UNIQUE INDEX (`first_name`, `last_name`);
ALTER TABLE `address` ADD UNIQUE INDEX (`owner_id`);
ALTER TABLE `email` ADD UNIQUE INDEX (`person_id`);