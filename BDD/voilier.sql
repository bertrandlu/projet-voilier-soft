-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Ven 22 Mai 2015 à 15:02
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
  `force_vent` varchar(64) NOT NULL,
  `direction_vent` varchar(10) NOT NULL,
  PRIMARY KEY (`num_info`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=148 ;

--
-- Contenu de la table `voilier`
--

INSERT INTO `voilier` (`num_info`, `id`, `dateinfo`, `longitude`, `latitude`, `vitesse`, `force_vent`, `direction_vent`) VALUES
(134, 1, '2015-05-22 09:40:18', '-4.606983', '48.427890', '3', '10', 'SE'),
(135, 2, '2015-05-22 09:40:21', '-4.6069842', '48.427882', '3', '10', 'SE'),
(143, 1, '2015-05-22 09:41:00', '-4.607080', '48.427908', '3', '10', 'SE'),
(144, 2, '2015-05-22 09:41:00', '-4.607066', '48.427901', '2.5', '10', 'SE'),
(145, 1, '2015-05-22 09:42:00', '-4.607119', '48.427902', '3', '10', 'SE'),
(146, 1, '2015-05-22 09:42:00', '-4.607119', '48.427902', '3', '10', 'SE'),
(147, 2, '2015-05-22 10:00:00', '-4.607105', '48.427902', '3.5', '10', 'SE');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
