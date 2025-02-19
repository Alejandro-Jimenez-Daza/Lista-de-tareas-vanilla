<?php

// aqui llamo el archivo que hace la conexion en la base de datos
include('../modelo/conexion.php');



// creo una funcion que prepara la consulta para evitar inyecciones sql, y llama el procedimiento almacenada de mostrar datos
function crearTarea($tarea)
{
    global $mbd;

    try {
        $sql = "CALL pa_insertar_tarea(?,?)";
        $stmt = $mbd->prepare($sql);
        $stmt->execute([$tarea, 0]);
        return true;
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
        return false;
    }
}


// Le indica al navegador que el contenido que se enviará es JSON (un formato ligero de intercambio de datos).
header("Content-Type: application/json");


// Lee los datos JSON enviados por el fetch() en JavaScript usando file_get_contents("php://input").
// Decodifica los datos de JSON a un array asociativo en PHP con json_decode().
$datosRecibidos = file_get_contents("php://input");
$datos = json_decode($datosRecibidos, true);



// Comprueba si se ha recibido un campo llamado "tarea" y si no está vacío.
// Si no pasa la validación, envía un mensaje de error y detiene la ejecución con exit().
if (isset($datos["tarea"]) && !empty(trim($datos["tarea"]))) {

    $tarea = trim($datos["tarea"]);
} else {

    echo json_encode(["error" => "Debes escribir al menos una tarea!"]);
    exit;
}


// Llama a la función crearTarea() con el texto de la tarea.
// Guarda el resultado en $resultado (será true si la tarea se insertó bien o false si falló).
$resultado = crearTarea($tarea);


// Si la tarea se creó correctamente, devuelve:
// ✅ { "mensaje": "Tarea agregada exitosamente" }
// Si falló, devuelve:
// ❌ { "mensaje": "Error al guardar la tarea" }
if ($resultado) {
    echo json_encode(["mensaje" => "Tarea agregada exitosamente"]);
} else {
    echo json_encode(["mensaje" => "Error al guardar la tarea"]);
}

exit;
