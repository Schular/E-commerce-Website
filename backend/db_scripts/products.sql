DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));

SELECT '---Products table created---' AS '';