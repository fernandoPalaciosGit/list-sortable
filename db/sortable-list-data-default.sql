-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-07-2015 a las 16:58:01
-- Versión del servidor: 5.6.16
-- Versión de PHP: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `sortable-list`
--
CREATE DATABASE IF NOT EXISTS `sortable-list` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `sortable-list`;

--
-- Volcado de datos para la tabla `elements`
--

INSERT INTO `elements` (`id`, `name`, `order`) VALUES
(1, 'Comprar pasteles', 1),
(2, 'Comprar rosas', 2),
(3, 'Comprar bombones', 3),
(4, 'Comprar peluches', 4),
(5, 'Comprar tarjeta', 5);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
