<?php
include("../modelo/conexion.php");

header("Content-Type: application/json");

try {
    $sql = "CALL pa_mostrar_tarea()";
    $stmt = $mbd->prepare($sql);
    $stmt->execute();
    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);


    echo json_encode($resultado);
} catch (PDOException $e) {
    echo json_encode(["error " => $e->getMessage()]);
}
