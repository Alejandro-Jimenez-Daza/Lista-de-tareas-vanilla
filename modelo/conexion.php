<?php

// en este modelo creo las variables para guardar los datos para la conexion a mysql, en caso de que necesite cambiarlas y preparar la conexion
// de aca se conectan los controladores a la base de datos llamando este archivo conexion.php
$host = "localhost";
$dbname = "ListaDeTareasIntermedio";
$usuario = "root";
$contrasenna = "";

// hago un try catch que recibe como respuesta un JSON, en caso de error, me muestra el error
try {
    $mbd = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $usuario, $contrasenna);
    $mbd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión a la base de datos: " . $e->getMessage());
}
