DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` NVARCHAR(45) NOT NULL,
  `password` NVARCHAR(255) NOT NULL,
  `admin` INT NOT NULL,
  PRIMARY KEY (`id`));

SELECT '---Users table created---' AS '';