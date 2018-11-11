DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` NVARCHAR(45) NOT NULL,
  `address` NVARCHAR(255) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`));

SELECT '---Orders table created---' AS '';