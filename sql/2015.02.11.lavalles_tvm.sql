-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 10-02-2015 a las 22:26:45
-- Versión del servidor: 5.5.41-0ubuntu0.14.04.1
-- Versión de PHP: 5.5.9-1ubuntu4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `lavalles_tvm`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tv_msg`
--

CREATE TABLE IF NOT EXISTS `tv_msg` (
  `tv_id` int(11) NOT NULL AUTO_INCREMENT,
  `tv_back_color` text,
  `tv_play_direction` text,
  `tv_play_time` text,
  PRIMARY KEY (`tv_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Volcado de datos para la tabla `tv_msg`
--

INSERT INTO `tv_msg` (`tv_id`, `tv_back_color`, `tv_play_direction`, `tv_play_time`) VALUES
(1, '#5484ed', 'DERECHA', '0:0:15'),
(3, '#51b749', 'ARRIBA', '3:15:13'),
(6, '#46d6db', 'IZQUIERDA', '0:0:15'),
(7, '#ff887c', 'ARRIBA', '0:0:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tv_msg_audio`
--

CREATE TABLE IF NOT EXISTS `tv_msg_audio` (
  `aud_id` int(11) NOT NULL AUTO_INCREMENT,
  `tv_id` varchar(11) DEFAULT NULL,
  `aud_file` text,
  `orden` int(11) DEFAULT NULL,
  `estado` enum('ACTIVO','INACTIVO') DEFAULT NULL,
  PRIMARY KEY (`aud_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `tv_msg_audio`
--

INSERT INTO `tv_msg_audio` (`aud_id`, `tv_id`, `aud_file`, `orden`, `estado`) VALUES
(1, '7', 'finger_in_the_noise.mp3', 1, 'ACTIVO'),
(2, '7', 'never_for_ever.mp3', 2, 'ACTIVO'),
(3, '7', 'open_source.mp3', 3, 'ACTIVO'),
(4, '7', 'revelion_venus.mp3', 4, 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tv_msg_txt`
--

CREATE TABLE IF NOT EXISTS `tv_msg_txt` (
  `txt_id` int(11) NOT NULL AUTO_INCREMENT,
  `tv_id` varchar(11) DEFAULT NULL,
  `txt_msg` text,
  `txt_front_color` text,
  `txt_back_image` text,
  `txt_font_family` text,
  `txt_font_size` text,
  `orden` int(11) DEFAULT NULL,
  `estado` enum('ACTIVO','INACTIVO') DEFAULT NULL,
  PRIMARY KEY (`txt_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Volcado de datos para la tabla `tv_msg_txt`
--

INSERT INTO `tv_msg_txt` (`txt_id`, `tv_id`, `txt_msg`, `txt_front_color`, `txt_back_image`, `txt_font_family`, `txt_font_size`, `orden`, `estado`) VALUES
(1, '7', 'Mensaje 1', '#7bd148', '04-exam-room.jpg', 'DIN Condensed C.ttf', '52px', 1, 'ACTIVO'),
(2, '7', 'Mensaje 2', '#5484ed', '511e7222b3fc4b70d400003c_center-for-care-and-discovery-university-of-chicago-medicine-rafael-vi-oly-architects_patient_room_small_10-12-528x352.jpg', 'EuroStyle Normal.ttf', '52px', 2, 'ACTIVO'),
(3, '7', 'Mensaje 3', '#a4bdfc', 'ICU051116_HP_NCM_002.gif', 'EuroStyle Normal.ttf', '52px', 3, 'ACTIVO'),
(4, '7', 'Mensaje 4', '#46d6db', 'Internal-Medicine-Doctor.jpg', 'Franklin Gothic Demi Cond.ttf', '52px', 4, 'ACTIVO'),
(5, '7', 'Mensaje 5', '#7ae7bf', 'Medical-doctor--generic----22932673.jpg', 'Garamond Reprise SSi.ttf', '52px', 5, 'ACTIVO'),
(6, '7', 'Mensaje 6', '#51b749', 'b10.jpg', 'Georgia.ttf', '52px', 6, 'ACTIVO'),
(7, '7', 'Mensaje 7', '#fbd75b', 'bigstock-Medicine-Doctor-Hand-Working-W-44541469.jpg', 'Gill Sans MT Bold.ttf', '52px', 7, 'ACTIVO'),
(8, '7', 'Mensaje 8', '#ffb878', 'images.jpeg', 'Helvetica-Conth.ttf', '52px', 8, 'ACTIVO'),
(9, '7', 'Mensaje 9', '#ff887c', 'medical-doctor-with-virtual-DNA-scan-of-patient.png', 'Impact.TTF', '52px', 9, 'ACTIVO'),
(10, '7', 'Mensaje 10', '#dc2127', 'o-DOCTOR-facebook.jpg', 'Lucida Sans Unicode.ttf', '52px', 10, 'ACTIVO'),
(11, '7', 'Mensaje 11', '#dbadff', 'safb111seminarroomphoto1.jpg', 'Metal Head  Normal.ttf', '52px', 11, 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tv_usuarios`
--

CREATE TABLE IF NOT EXISTS `tv_usuarios` (
  `usr_id` int(11) NOT NULL AUTO_INCREMENT,
  `usr_nombre` text,
  `usr_login` text,
  `usr_pass` text,
  `usr_status` text,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `tv_usuarios`
--

INSERT INTO `tv_usuarios` (`usr_id`, `usr_nombre`, `usr_login`, `usr_pass`, `usr_status`) VALUES
(1, 'Lalo de Compusado', 'lalo', '1a1dc91c907325c69271ddf0c944bc72', 'ACTIVO');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
