<?php
include('../modelo/conexion.php');

function marcarTareaCompleta($tareaID, $nombreTarea, $estaCompleta)
{
    global $mbd;

    try {
        $sql = "CALL pa_actualizar_tarea(?, ?, ?)";
        $stmt = $mbd->prepare($sql);
        $stmt->execute([$tareaID, $nombreTarea, $estaCompleta]);

        return true;
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
        return false;
    }
}

// aca aseguro el tipo de respuesta
header("Content-Type: application/json");

// obtengo los datos enviados desde index.js
$datosRecibidos = file_get_contents("php://input");
$datos = json_decode($datosRecibidos, true);

// valido que los datos recibidos sean de tipo numero ua que manejo el estado 1 y 0, que no tenga espacios al inicio ni al final y que la tarea no este vacia.
if (
    isset($datos["tareaID"]) && is_numeric($datos["tareaID"]) &&
    isset($datos["nombreTarea"]) && !empty(trim($datos["nombreTarea"])) && isset($datos["estaCompleta"]) && is_numeric($datos["estaCompleta"])

) {
    $tareaID = (int) $datos["tareaID"];
    $nombreTarea = trim($datos["nombreTarea"]);
    $estaCompleta = (int) $datos["estaCompleta"];
} else {
    echo json_encode(["error" => "Faltan datos para modificar"]);
    exit;
}

// Llamar a la función para modificar la tarea
$resultado = marcarTareaCompleta($tareaID, $nombreTarea, $estaCompleta);

// Enviar la respuesta al frontend, lo hago sin if else, porque requiere menos lineas de codigo usando el operador ternario
$respuesta = $resultado
    ? ["mensaje" => "Tarea completada exitosamente"]
    : ["error" => "Error al completar la tarea"];

echo json_encode($respuesta);
exit;
