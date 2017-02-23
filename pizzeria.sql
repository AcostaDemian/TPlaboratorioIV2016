-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2016 at 03:07 AM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pizzeria`
--
CREATE DATABASE IF NOT EXISTS `pizzeria` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `pizzeria`;

-- --------------------------------------------------------

--
-- Table structure for table `encuestas`
--

CREATE TABLE `encuestas` (
  `cs` varchar(50) NOT NULL,
  `prodfav` varchar(50) NOT NULL,
  `entero` varchar(150) NOT NULL,
  `opinion` varchar(150) NOT NULL,
  `volver` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `encuestas`
--

INSERT INTO `encuestas` (`cs`, `prodfav`, `entero`, `opinion`, `volver`) VALUES
('2', '121-', 'sad', 'asd', '1'),
('2', '121', 'wew', 'qwewq', '1'),
('3', '121', 'fddsaa', 'sdfsd', '1');

-- --------------------------------------------------------

--
-- Table structure for table `locales`
--

CREATE TABLE `locales` (
  `idLocal` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `tel` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `locales`
--

INSERT INTO `locales` (`idLocal`, `nombre`, `direccion`, `tel`) VALUES
(9, 'Solo empanadas', 'callao 4500', '45678920'),
(10, 'Pizza 04', 'av belgrano 5040', '4227 65612'),
(11, 'Prueba', 'av montoya 4500', '42275612');

-- --------------------------------------------------------

--
-- Table structure for table `ofertas`
--

CREATE TABLE `ofertas` (
  `idOferta` int(11) NOT NULL,
  `idLocal` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `precio` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ofertas`
--

INSERT INTO `ofertas` (`idOferta`, `idLocal`, `nombre`, `precio`) VALUES
(21, 9, 'combo solo empanadas', '50'),
(22, 10, 'ofertalocapizza04', '49'),
(23, 9, 'ofertota', '222');

-- --------------------------------------------------------

--
-- Table structure for table `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedido` int(11) NOT NULL,
  `idLocal` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL,
  `total` varchar(100) NOT NULL,
  `fecha` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pedidos`
--

INSERT INTO `pedidos` (`idPedido`, `idLocal`, `idCliente`, `total`, `fecha`, `estado`) VALUES
(37, 9, 5, '144', '2016-12-11T03:00:00.000Z', 'no entregado'),
(38, 10, 5, '50', '2016-12-11T03:00:00.000Z', 'no entregado'),
(39, 10, 5, '49', '2016-12-11T03:00:00.000Z', 'no entregado'),
(42, 10, 6, '50', '2016-12-11T03:00:00.000Z', 'no entregado');

-- --------------------------------------------------------

--
-- Table structure for table `pedofer`
--

CREATE TABLE `pedofer` (
  `idPedido` int(11) NOT NULL,
  `idOferta` int(11) NOT NULL,
  `cantidad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pedofer`
--

INSERT INTO `pedofer` (`idPedido`, `idOferta`, `cantidad`) VALUES
(31, 22, '123'),
(37, 21, '2'),
(38, 22, '1'),
(39, 22, '1'),
(42, 22, '1');

-- --------------------------------------------------------

--
-- Table structure for table `pedprod`
--

CREATE TABLE `pedprod` (
  `idPedido` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pedprod`
--

INSERT INTO `pedprod` (`idPedido`, `idProducto`, `cantidad`) VALUES
(31, 123, '123'),
(37, 122, '2'),
(38, 123, '1'),
(42, 123, '1');

-- --------------------------------------------------------

--
-- Table structure for table `prodofer`
--

CREATE TABLE `prodofer` (
  `idOferta` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prodofer`
--

INSERT INTO `prodofer` (`idOferta`, `idProducto`, `cantidad`) VALUES
(21, 121, 1),
(21, 122, 1),
(22, 123, 1),
(23, 122, 6);

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `idProducto` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `idLocal` int(11) NOT NULL,
  `precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`idProducto`, `nombre`, `idLocal`, `precio`) VALUES
(121, 'coca', 9, 10),
(122, 'pamcho', 9, 22),
(123, 'cocapizza04', 10, 1);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nivel` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `idLocal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nivel`, `estado`, `nombre`, `email`, `password`, `idLocal`) VALUES
(1, 'administrador', 'habilitado', 'Juan Donado', 'donadojuan@gmail.com', '123', 1),
(3, 'empleado', 'habilitado', 'Cristian gonzalez', 'cris@fumon.com', '123', 9),
(4, 'empleado', 'habilitado', 'empSoloEmpanadas', 'empsoloemp@empsoloemp.com', '123', 9),
(5, 'cliente', 'habilitado', 'Cliente', 'cliente@cliente.com', '123', 9),
(6, 'cliente', 'habilitado', 'cliente2', 'cliente2@cliente2.com', '123', 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `locales`
--
ALTER TABLE `locales`
  ADD PRIMARY KEY (`idLocal`);

--
-- Indexes for table `ofertas`
--
ALTER TABLE `ofertas`
  ADD PRIMARY KEY (`idOferta`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedido`);

--
-- Indexes for table `prodofer`
--
ALTER TABLE `prodofer`
  ADD PRIMARY KEY (`idOferta`,`idProducto`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProducto`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `locales`
--
ALTER TABLE `locales`
  MODIFY `idLocal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `ofertas`
--
ALTER TABLE `ofertas`
  MODIFY `idOferta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;
--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
