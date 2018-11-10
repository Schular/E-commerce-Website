DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `phone` INT NOT NULL,
  PRIMARY KEY (`id`));

SELECT '---Orders table created---' AS '';