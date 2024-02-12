-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-02-2023 a las 12:39:44
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `coop`
--
use `coop24`;
drop table if exists `ventas`;
drop table if exists `articulos`;
drop table if exists `categorias`;
drop table if exists `socios`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `id` int(11) NOT NULL,
  `categoria` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio` float NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `vendedor` int(11) NOT NULL,
  `estado` char(1) NOT NULL DEFAULT 'D'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`id`, `categoria`, `nombre`, `descripcion`, `precio`, `imagen`, `vendedor`, `estado`) VALUES
(1, 13, 'Mochila senderismo', 'Mochila senderismo 50 L, cubierta impermiable ', 33.99, 'mochilaSenderismo.png', 2, 'D'),
(2, 9, 'Auriculares de botón', 'Auriculares de botón inalámbricos umi. \nColor rojo ', 69.99, 'auriculares_boton_umi.jpg', 1, 'D'),
(3, 4, 'Patín eléctrico', 'Scooter eléctrico M365 ', 369, 'patinElectrico.png', 1, 'D'),
(4, 11, 'Moto eléctrica', 'Moto Eléctrica Infantil Coche Triciclo Vespa Scooter Eléctrico a Batería con Luz MP3 USB Bocina para Niños Más de 3 Años Carga 25kg ', 139.95, 'moto_electrica_infantil.jpg', 2, 'D'),
(5, 6, 'Piscina Perros', 'Piscina para Perros Natación Mascotas Gato Cachorro Plegable Diámetro 80 cm ', 25.45, 'piscina_perros.jpg', 1, 'D'),
(6, 2, 'Casco Moto Joker', 'CASCO MT CASCO MT TARGO JOKER EDICIÓN LIMITADA FLUOR M ', 78.79, 'casco_moto.joker.jpg', 2, 'D'),
(7, 13, 'Tienda de campaña', 'Tienda campaña 4 plazas impermeable ', 133.5, 'tiendaCampanya.png', 1, 'D'),
(8, 5, 'Panel solar ', 'Panel solar de policristalino de 1,5 x 5 m. ', 109.9, 'panelSolar.png', 1, 'D'),
(9, 12, 'Pulsera actividad', 'Pulsera actividad multifunción ', 34.99, 'pulseraActividad.png', 1, 'D'),
(10, 11, 'Chaleco bebe', 'Chaleco de Ayuda a la flotabilidad Aprendizaje de la natación. ', 45, 'chaleco_natacion_bebe.jpg', 1, 'D'),
(11, 12, 'Bicicleta Indoor', 'Bicicleta estática Indoor. ', 189.99, 'bicicleta_Indoor.jpg', 2, 'D'),
(12, 13, 'Mochila senderismo', 'Mochila Senderismo Montaña Trekking Macutos de Viaje Acampada Marcha. 40 L ', 45.99, 'mochila_senderismo_azul.jpg', 1, 'D'),
(13, 13, 'Kit Supervivencia', 'Kit de Supervivencia 14 en 1 multifuncional Kits Tácticos con Navaja Linterna Manta de Emergencia y Pulsera de Paracord para Acampada Senderismo Excursión Montañismo Viaje al Aire Libre ', 49.95, 'kit_supervivencia.jpg', 1, 'D'),
(14, 4, 'Patín autoequilibrio', 'Patín auto-equilibrio rojo ', 300, 'patinAutoequilibrio.png', 1, 'D'),
(15, 7, 'Portatil Lenovo', 'Portatil táctil convertible 14 Intel core I-3, 4GB RAM, 128 GB SSD, Windows 10', 539.99, 'portatilLenovo.png', 2, 'D'),
(16, 14, 'Piscina Hinchable', 'Piscina Hinchable 244 x 66 cm ', 15.3, 'piscina_hinchable.jpg', 1, 'D'),
(17, 12, 'Piscina Desmontable', 'Piscina desmontable, 300 x 200 x 75 cm, 3.834 litros, azul ', 99.99, 'piscina_desmontable.jpg', 1, 'D');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `imagen`) VALUES
(1, 'Cine, TV y Música', ''),
(2, 'Coche y moto', ''),
(3, 'Libros', ''),
(4, 'Movilidad urbana', ''),
(5, 'Hogar, Jardín y Bricolaje', ''),
(6, 'Mascotas', ''),
(7, 'Informática', ''),
(8, 'Moda', ''),
(9, 'Electrónica', ''),
(10, 'Videojuegos', ''),
(11, 'Juguetes y Bebé', ''),
(12, 'Deportes y aire libre', ''),
(13, 'Acampada y senderismo', ''),
(14, 'Ofertas y Chollos', ''),
(15, 'Otros', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `socios`
--

CREATE TABLE `socios` (
  `id` int(11) NOT NULL,
  `rol` char(1) NOT NULL DEFAULT 'U',
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `foto` varchar(255) NOT NULL DEFAULT 'user.png',
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `socios`
--

INSERT INTO `socios` (`id`, `rol`, `nombre`, `apellidos`, `email`, `foto`, `password`) VALUES
(1, 'U', 'Isabel', 'López', 'isabel.lopez@iescamp.es', 'isabel.png', 'isabel'),
(2, 'U', 'Prueba', 'Pru Prueba', 'prueba.pru@iescamp.es', 'prueba.png', 'prueba'),
(9, 'A', 'Admin', 'Administrador', 'admin.admin@iescamp.es', 'user.png', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `idventa` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `socio` int(11) NOT NULL,
  `articulo` int(11) NOT NULL,
  `precio` float NOT NULL,
  `comprador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria` (`categoria`),
  ADD KEY `vendedor` (`vendedor`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `socios`
--
ALTER TABLE `socios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `EMAIL_UNIQUE` (`email`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`idventa`),
  ADD KEY `ventasocio` (`socio`),
  ADD KEY `ventaarticulo` (`articulo`),
  ADD KEY `ventacomprador` (`comprador`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `socios`
--
ALTER TABLE `socios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `idventa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD CONSTRAINT `FK_CATEGORIA` FOREIGN KEY (`categoria`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `FK_VENDEDOR` FOREIGN KEY (`vendedor`) REFERENCES `socios` (`id`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventaarticulo` FOREIGN KEY (`articulo`) REFERENCES `articulos` (`id`),
  ADD CONSTRAINT `ventacomprador` FOREIGN KEY (`comprador`) REFERENCES `socios` (`id`),
  ADD CONSTRAINT `ventasocio` FOREIGN KEY (`socio`) REFERENCES `socios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
