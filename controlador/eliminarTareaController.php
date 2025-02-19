<?php

// conexion a la base de datos desde el archivo de modelo
include('../modelo/conexion.php');


// funcion para preparar el sql y llamar el procedimiento almacenado
function eliminarTarea($tareaID)
{
    global $mbd;

    try {
        $sql = "CALL pa_eliminar_tarea(?)";
        $stmt = $mbd->prepare($sql);
        $stmt->execute([$tareaID]);


        return true;
    } catch (PDOException $e) {
        return false;
    }
}

header("Content-Type: application/json");

$datosRecibidos = file_get_contents("php://input");
$datos = json_decode($datosRecibidos, true);


if (!isset($datos["tareaID"]) || !is_numeric($datos["tareaID"])) {

    echo json_encode(["error" => "falta el ID de la tarea para eliminar"]);
    exit;
}

// guardo el dato que necesito, que es el tareaID, mediante el cual se elimina el registro en la base de datos y el procedimiento almacenado lo reicbe y borra el registro
$tareaID = (int) $datos["tareaID"];

$resultado = eliminarTarea($tareaID);


// uso el operador ternario para escribir menos codigo
$respuesta = $resultado
    ? ["mensaje" => "tarea eliminada exitosamente"]
    : ["error" => "error al eliminar la tarea"];

echo json_encode($respuesta);
exit;
