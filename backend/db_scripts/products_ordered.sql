DROP TABLE IF EXISTS `products_ordered`;

CREATE TABLE `products_ordered` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `quantity` INT NOT NULL,
  `order_number` INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`order_number`) REFERENCES orders(`id`));

SELECT '---Products ordered table created---' AS '';