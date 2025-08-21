-- Parently waitlist schema for MySQL
-- Matches your screenshot and backend mapping
-- Table name: wait_list
-- Columns (6 total):
--   id (AUTO_INCREMENT, PRIMARY KEY)
--   first_name (varchar(255), NULL OK)
--   last_name (varchar(255), NULL OK)
--   email (varchar(255), NOT NULL, UNIQUE)
--   phone_number (varchar(255), NULL OK)
--   country (varchar(255), NULL OK)
--
-- NOTE:
-- - The backend normalizes emails to lowercase before insert.
-- - Ensure your DB user has permission to create tables and indexes.

CREATE TABLE IF NOT EXISTS `wait_list` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) COLLATE utf8_general_ci NULL,
  `last_name` VARCHAR(255) COLLATE utf8_general_ci NULL,
  `email` VARCHAR(255) COLLATE utf8_general_ci NOT NULL,
  `phone_number` VARCHAR(255) COLLATE utf8_general_ci NULL,
  `country` VARCHAR(255) COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_wait_list_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Optional: seed example
-- INSERT INTO `wait_list` (first_name, last_name, email, phone_number, country)
-- VALUES ('Test', 'User', 'test@example.com', '+1-555-1234', 'US');
