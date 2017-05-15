CREATE TABLE IF NOT EXISTS `tv_msg` (
  `tv_id` int(11) NOT NULL AUTO_INCREMENT,
  `tv_back_color` text,
  `tv_play_direction` text,
  `tv_play_time` text,
  PRIMARY KEY (`tv_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
INSERT INTO `tv_msg` (`tv_id`, `tv_back_color`, `tv_play_direction`, `tv_play_time`) VALUES
(null, '#5484ed', 'DERECHA', '0:0:15'),
(null, '#51b749', 'ARRIBA', '3:15:13'),
(null, '#46d6db', 'IZQUIERDA', '0:0:15'),
(null, '#ff887c', 'ARRIBA', '0:0:15');


CREATE TABLE IF NOT EXISTS `tv_msg_audio` (
  `aud_id` int(11) NOT NULL AUTO_INCREMENT,
  `tv_id` varchar(11) DEFAULT NULL,
  `aud_file` text,
  `orden` int(11) DEFAULT NULL,
  `estado` enum('ACTIVO','INACTIVO') DEFAULT NULL,
  PRIMARY KEY (`aud_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
INSERT INTO `tv_msg_audio` (`aud_id`, `tv_id`, `aud_file`, `orden`, `estado`) VALUES
(null, '7', 'finger_in_the_noise.mp3', 1, 'ACTIVO'),
(null, '7', 'never_for_ever.mp3', 2, 'ACTIVO'),
(null, '7', 'open_source.mp3', 3, 'ACTIVO'),
(null, '7', 'revelion_venus.mp3', 4, 'ACTIVO');


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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

INSERT INTO `tv_msg_txt` (`txt_id`, `tv_id`, `txt_msg`, `txt_front_color`, `txt_back_image`, `txt_font_family`, `txt_font_size`, `orden`, `estado`) VALUES
(null, '7', 'Mensaje 1', '#7bd148', '04-exam-room.jpg', 'DIN Condensed C.ttf', '52px', 1, 'ACTIVO'),
(null, '7', 'Mensaje 2', '#5484ed', '511e7222b3fc4b70d400003c_center-for-care-and-discovery-university-of-chicago-medicine-rafael-vi-oly-architects_patient_room_small_10-12-528x352.jpg', 'EuroStyle Normal.ttf', '52px', 2, 'ACTIVO'),
(null, '7', 'Mensaje 3', '#a4bdfc', 'ICU051116_HP_NCM_002.gif', 'EuroStyle Normal.ttf', '52px', 3, 'ACTIVO'),
(null, '7', 'Mensaje 4', '#46d6db', 'Internal-Medicine-Doctor.jpg', 'Franklin Gothic Demi Cond.ttf', '52px', 4, 'ACTIVO'),
(null, '7', 'Mensaje 5', '#7ae7bf', 'Medical-doctor--generic----22932673.jpg', 'Garamond Reprise SSi.ttf', '52px', 5, 'ACTIVO'),
(null, '7', 'Mensaje 6', '#51b749', 'b10.jpg', 'Georgia.ttf', '52px', 6, 'ACTIVO'),
(null, '7', 'Mensaje 7', '#fbd75b', 'bigstock-Medicine-Doctor-Hand-Working-W-44541469.jpg', 'Gill Sans MT Bold.ttf', '52px', 7, 'ACTIVO'),
(null, '7', 'Mensaje 8', '#ffb878', 'images.jpeg', 'Helvetica-Conth.ttf', '52px', 8, 'ACTIVO'),
(null, '7', 'Mensaje 9', '#ff887c', 'medical-doctor-with-virtual-DNA-scan-of-patient.png', 'Impact.TTF', '52px', 9, 'ACTIVO'),
(null, '7', 'Mensaje 10', '#dc2127', 'o-DOCTOR-facebook.jpg', 'Lucida Sans Unicode.ttf', '52px', 10, 'ACTIVO'),
(null, '7', 'Mensaje 11', '#dbadff', 'safb111seminarroomphoto1.jpg', 'Metal Head  Normal.ttf', '52px', 11, 'ACTIVO');

CREATE TABLE IF NOT EXISTS `tv_usuarios` (
  `usr_id` int(11) NOT NULL AUTO_INCREMENT,
  `usr_nombre` text,
  `usr_login` text,
  `usr_pass` text,
  `usr_status` text,
  PRIMARY KEY (`usr_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

INSERT INTO `tv_usuarios` (`usr_id`, `usr_nombre`, `usr_login`, `usr_pass`, `usr_status`) VALUES
(null, 'Lalo de Compusado', 'lalo', '1a1dc91c907325c69271ddf0c944bc72', 'ACTIVO');