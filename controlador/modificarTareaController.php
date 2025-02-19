<?php
include('../modelo/conexion.php');

function modificarTarea($tareaID, $tarea)
{
    global $mbd;

    try {
        $sql = "CALL pa_actualizar_tarea(?,?,?)";
        $stmt = $mbd->prepare($sql);
        $stmt->execute([$tareaID, $tarea, 0]);

        return true;
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
        return false;
    }
}

// Asegurar el tipo de respuesta
header("Content-Type: application/json");

// Obtener los datos enviados desde index.js
$datosRecibidos = file_get_contents("php://input");
$datos = json_decode($datosRecibidos, true);

// Validar los datos recibidos
if (
    isset($datos["tareaID"]) && is_numeric($datos["tareaID"]) &&
    isset($datos["tarea"]) && !empty(trim($datos["tarea"]))
) {
    $tareaID = (int) $datos["tareaID"];
    $tarea = trim($datos["tarea"]);
} else {
    echo json_encode(["error" => "Faltan datos para modificar"]);
    exit;
}

// Llamar a la función para modificar la tarea
$resultado = modificarTarea($tareaID, $tarea);

// Enviar la respuesta al frontend
$respuesta = $resultado
    ? ["mensaje" => "Tarea modificada exitosamente"]
    : ["error" => "Error al modificar la tarea"];

echo json_encode($respuesta);
exit;
