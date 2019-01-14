CREATE DATABASE `storagebox` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `storagebox`;

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

