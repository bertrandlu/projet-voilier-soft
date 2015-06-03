-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 03 Juin 2015 à 15:55
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `projet_m1`
--

-- --------------------------------------------------------

--
-- Structure de la table `voilier`
--

CREATE TABLE IF NOT EXISTS `voilier` (
  `num_info` int(10) NOT NULL AUTO_INCREMENT,
  `id` int(10) NOT NULL,
  `dateinfo` datetime NOT NULL,
  `longitude` varchar(64) NOT NULL,
  `latitude` varchar(64) NOT NULL,
  `vitesse` varchar(64) NOT NULL,
  `cap` varchar(64) NOT NULL,
  `direction_vent` varchar(10) NOT NULL,
  PRIMARY KEY (`num_info`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Contenu de la table `voilier`
--

INSERT INTO `voilier` (`num_info`, `id`, `dateinfo`, `longitude`, `latitude`, `vitesse`, `cap`, `direction_vent`) VALUES
(3, 1, '0000-00-00 00:00:00', '-4.607037305831909', '48.42796894228204', '5', '120', 'SE'),
(6, 2, '2015-06-03 00:00:00', '-4.607198238372803', '48.42767171321744', '3', '130', 'SE'),
(7, 2, '2015-06-03 00:00:00', '-4.607198238372803', '48.42767171321744', '3', '130', 'SE');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
