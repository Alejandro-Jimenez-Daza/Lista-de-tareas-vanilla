-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.30 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para listadetareasintermedio
DROP DATABASE IF EXISTS `listadetareasintermedio`;
CREATE DATABASE IF NOT EXISTS `listadetareasintermedio` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `listadetareasintermedio`;

-- Volcando estructura para procedimiento listadetareasintermedio.pa_actualizar_tarea
DROP PROCEDURE IF EXISTS `pa_actualizar_tarea`;
DELIMITER //
CREATE PROCEDURE `pa_actualizar_tarea`(
  IN p_tareaID INT,
	IN p_nombreTarea VARCHAR (200),
  IN p_estaCompleta BOOLEAN
)
BEGIN
	UPDATE tblTareas
  SET nombreTarea = p_nombreTarea, estaCompleta = p_estaCompleta
  WHERE tareaID= p_tareaID;
END//
DELIMITER ;

-- Volcando estructura para procedimiento listadetareasintermedio.pa_eliminar_tarea
DROP PROCEDURE IF EXISTS `pa_eliminar_tarea`;
DELIMITER //
CREATE PROCEDURE `pa_eliminar_tarea`(
IN p_tareaID INT
)
BEGIN
	DELETE FROM tblTareas
  WHERE tareaID = p_tareaID;
END//
DELIMITER ;

-- Volcando estructura para procedimiento listadetareasintermedio.pa_insertar_tarea
DROP PROCEDURE IF EXISTS `pa_insertar_tarea`;
DELIMITER //
CREATE PROCEDURE `pa_insertar_tarea`(
	IN p_nombreTarea VARCHAR (200),
  IN p_estaCompleta BOOLEAN
)
BEGIN
	INSERT INTO tbltareas (nombreTarea, estaCompleta)
  VALUES (p_nombreTarea, p_estaCompleta);
END//
DELIMITER ;

-- Volcando estructura para procedimiento listadetareasintermedio.pa_mostrar_tarea
DROP PROCEDURE IF EXISTS `pa_mostrar_tarea`;
DELIMITER //
CREATE PROCEDURE `pa_mostrar_tarea`()
BEGIN
  SELECT * FROM tblTareas;
END//
DELIMITER ;

-- Volcando estructura para tabla listadetareasintermedio.tbltareas
DROP TABLE IF EXISTS `tbltareas`;
CREATE TABLE IF NOT EXISTS `tbltareas` (
  `tareaID` int NOT NULL AUTO_INCREMENT,
  `nombreTarea` varchar(200) NOT NULL,
  `estaCompleta` tinyint(1) DEFAULT NULL,
  `fechaCreacion` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tareaID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla listadetareasintermedio.tbltareas: ~2 rows (aproximadamente)
INSERT IGNORE INTO `tbltareas` (`tareaID`, `nombreTarea`, `estaCompleta`, `fechaCreacion`) VALUES
	(1, 'Revisar el twitter y los repost que he generado', 0, '2025-02-19 16:29:34'),
	(3, 'Contestar a seguidores en canal de youtube Hoy', 0, '2025-02-19 16:29:51');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
