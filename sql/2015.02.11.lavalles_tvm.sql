-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: tvm
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.17.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tv_msg`
--

DROP TABLE IF EXISTS `tv_msg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tv_msg` (
  `tv_id` int(11) NOT NULL AUTO_INCREMENT,
  `tv_back_color` text,
  `tv_play_direction` text,
  `tv_play_time` time DEFAULT NULL,
  `tv_interval` time DEFAULT NULL,
  PRIMARY KEY (`tv_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tv_msg`
--

LOCK TABLES `tv_msg` WRITE;
/*!40000 ALTER TABLE `tv_msg` DISABLE KEYS */;
INSERT INTO `tv_msg` VALUES (10,'#46d6db','IZQUIERDA','00:00:15','00:00:10'),(11,'#ff887c','ABAJO','00:00:15','00:00:10');
/*!40000 ALTER TABLE `tv_msg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tv_msg_audio`
--

DROP TABLE IF EXISTS `tv_msg_audio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tv_msg_audio` (
  `aud_id` int(11) NOT NULL AUTO_INCREMENT,
  `tv_id` varchar(11) DEFAULT NULL,
  `aud_file` text,
  `orden` int(11) DEFAULT NULL,
  `estado` enum('ACTIVO','INACTIVO') DEFAULT NULL,
  PRIMARY KEY (`aud_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tv_msg_audio`
--

LOCK TABLES `tv_msg_audio` WRITE;
/*!40000 ALTER TABLE `tv_msg_audio` DISABLE KEYS */;
INSERT INTO `tv_msg_audio` VALUES (1,'7','finger_in_the_noise.mp3',1,'ACTIVO'),(2,'7','never_for_ever.mp3',2,'ACTIVO'),(3,'7','open_source.mp3',3,'ACTIVO'),(4,'7','revelion_venus.mp3',4,'ACTIVO'),(5,'7','finger_in_the_noise.mp3',1,'ACTIVO'),(6,'7','never_for_ever.mp3',2,'ACTIVO'),(7,'7','open_source.mp3',3,'ACTIVO'),(8,'7','revelion_venus.mp3',4,'ACTIVO'),(9,'11','TheGoldenPony.mp3',NULL,NULL),(11,'11','Misterius.mp3',NULL,NULL);
/*!40000 ALTER TABLE `tv_msg_audio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tv_msg_txt`
--

DROP TABLE IF EXISTS `tv_msg_txt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tv_msg_txt` (
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tv_msg_txt`
--

LOCK TABLES `tv_msg_txt` WRITE;
/*!40000 ALTER TABLE `tv_msg_txt` DISABLE KEYS */;
INSERT INTO `tv_msg_txt` VALUES (1,'7','Mensaje 1','#7bd148','04-exam-room.jpg','DIN Condensed C.ttf','52px',1,'ACTIVO'),(2,'7','Mensaje 2','#5484ed','511e7222b3fc4b70d400003c_center-for-care-and-discovery-university-of-chicago-medicine-rafael-vi-oly-architects_patient_room_small_10-12-528x352.jpg','EuroStyle Normal.ttf','52px',2,'ACTIVO'),(3,'7','Mensaje 3','#a4bdfc','ICU051116_HP_NCM_002.gif','EuroStyle Normal.ttf','52px',3,'ACTIVO'),(4,'7','Mensaje 4','#46d6db','Internal-Medicine-Doctor.jpg','Franklin Gothic Demi Cond.ttf','52px',4,'ACTIVO'),(5,'7','Mensaje 5','#7ae7bf','Medical-doctor--generic----22932673.jpg','Garamond Reprise SSi.ttf','52px',5,'ACTIVO'),(6,'7','Mensaje 6','#51b749','b10.jpg','Georgia.ttf','52px',6,'ACTIVO'),(7,'7','Mensaje 7','#fbd75b','bigstock-Medicine-Doctor-Hand-Working-W-44541469.jpg','Gill Sans MT Bold.ttf','52px',7,'ACTIVO'),(8,'7','Mensaje 8','#ffb878','images.jpeg','Helvetica-Conth.ttf','52px',8,'ACTIVO'),(9,'7','Mensaje 9','#ff887c','medical-doctor-with-virtual-DNA-scan-of-patient.png','Impact.TTF','52px',9,'ACTIVO'),(10,'7','Mensaje 10','#dc2127','o-DOCTOR-facebook.jpg','Lucida Sans Unicode.ttf','52px',10,'ACTIVO'),(11,'7','Mensaje 11','#dbadff','safb111seminarroomphoto1.jpg','Metal Head  Normal.ttf','52px',11,'ACTIVO'),(12,'7','Mensaje 1','#7bd148','04-exam-room.jpg','DIN Condensed C.ttf','52px',1,'ACTIVO'),(13,'7','Mensaje 2','#5484ed','511e7222b3fc4b70d400003c_center-for-care-and-discovery-university-of-chicago-medicine-rafael-vi-oly-architects_patient_room_small_10-12-528x352.jpg','EuroStyle Normal.ttf','52px',2,'ACTIVO'),(14,'7','Mensaje 3','#a4bdfc','ICU051116_HP_NCM_002.gif','EuroStyle Normal.ttf','52px',3,'ACTIVO'),(15,'7','Mensaje 4','#46d6db','Internal-Medicine-Doctor.jpg','Franklin Gothic Demi Cond.ttf','52px',4,'ACTIVO'),(16,'7','Mensaje 5','#7ae7bf','Medical-doctor--generic----22932673.jpg','Garamond Reprise SSi.ttf','52px',5,'ACTIVO'),(17,'7','Mensaje 6','#51b749','b10.jpg','Georgia.ttf','52px',6,'ACTIVO'),(18,'7','Mensaje 7','#fbd75b','bigstock-Medicine-Doctor-Hand-Working-W-44541469.jpg','Gill Sans MT Bold.ttf','52px',7,'ACTIVO'),(19,'7','Mensaje 8','#ffb878','images.jpeg','Helvetica-Conth.ttf','52px',8,'ACTIVO'),(20,'7','Mensaje 9','#ff887c','medical-doctor-with-virtual-DNA-scan-of-patient.png','Impact.TTF','52px',9,'ACTIVO'),(21,'7','Mensaje 10','#dc2127','o-DOCTOR-facebook.jpg','Lucida Sans Unicode.ttf','52px',10,'ACTIVO'),(22,'7','Mensaje 11','#dbadff','safb111seminarroomphoto1.jpg','Metal Head  Normal.ttf','52px',11,'ACTIVO'),(23,'11','CARDIOLOGOS#dafasf#asdfasfda#asdfasf#asfasf#asfasf#clear screen#MEDICO DE GUARDIA#dadfasfd#asdfasf#asdfasfd#asdfasdf#asdfasfd#clear screen#CLINICOS#etc#etc','#083ccf','ecografia.jpg','EuroStyle Normal.ttf','30',NULL,NULL),(24,'11','Mensaje#de#Prueba 2','#121379','diagnostico.png','Impact.TTF','100',NULL,NULL),(25,'0','','','','','',NULL,NULL),(27,'11','Otro#ejemplo#de#texto.','#378766','estetoscopio.jpg','Helvetica-Conth.ttf','80',NULL,NULL),(28,'11','Prueba#3#de#salto#de#linea','#c9e617','ecografia.jpg','Georgia.ttf','50',NULL,NULL);
/*!40000 ALTER TABLE `tv_msg_txt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tv_usuarios`
--

DROP TABLE IF EXISTS `tv_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tv_usuarios` (
  `usr_id` int(11) NOT NULL AUTO_INCREMENT,
  `usr_nombre` text,
  `usr_login` text,
  `usr_pass` text,
  `usr_status` text,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tv_usuarios`
--

LOCK TABLES `tv_usuarios` WRITE;
/*!40000 ALTER TABLE `tv_usuarios` DISABLE KEYS */;
INSERT INTO `tv_usuarios` VALUES (2,'Lalo de Compusado','lalo','1a1dc91c907325c69271ddf0c944bc72','ACTIVO');
/*!40000 ALTER TABLE `tv_usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-07-02 11:12:10
