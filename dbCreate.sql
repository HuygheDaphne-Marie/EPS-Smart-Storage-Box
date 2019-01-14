CREATE DATABASE `storagebox` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `storagebox`;

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `storagebox`.`item` (`id`, `stock`, `name`) VALUES ('1', '10', 'Screw');
INSERT INTO `storagebox`.`item` (`id`, `stock`, `name`) VALUES ('2', '5', 'Bolt');
INSERT INTO `storagebox`.`item` (`id`, `stock`, `name`) VALUES ('3', '7', 'Nut');