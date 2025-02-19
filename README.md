Lista de Tareas (PHP + JavaScript)

Una aplicación web para gestionar tareas con las funcionalidades de crear, editar, eliminar y marcar como completadas, desarrollada utilizando PHP, MySQL y JavaScript (Fetch - Vanilla).

🚀 Características principales:

- ✅ Crear nuevas tareas.
- ✏️ Editar tareas existentes.
- ❌ Eliminar tareas con confirmación.
- ✅ Marcar tareas como completadas.
- 🔄 Actualización asíncrona con `fetch` para una experiencia fluida.

🛠️ Tecnologías utilizadas

- Back-end: PHP 8.0 (Arquitectura MVC)
- Front-end: HTML5, JavaScript (Fetch y Promesas)
- Base de datos: MySQL (con procedimientos almacenados).
- Estilo: Css nativo y Font awesome para íconos (con diseño responsive).

📂 Arquitectura del proyecto (MVC)

El proyecto sigue el patrón **Modelo-Vista-Controlador (MVC)**:

- **Modelo (`modelo/conexion.php`):** Maneja la conexión a la base de datos MySQL.
- **Vista (`index.html`):** Interfaz de usuario que muestra la lista de tareas y los botones de acción.
- **Controlador (`index.php` en la raíz):** Procesa las solicitudes (crear, actualizar, eliminar) y se comunica con el modelo.

🧰 Cómo funciona el flujo de la aplicación:

1. El usuario interactúa con la vista (HTML): Por ejemplo, escribe una tarea y hace clic en el botón "Agregar".
2. JavaScript (frontend) con `fetch`: Captura el evento y envía la solicitud asincrónica al `index.php`.
3. Controlador (PHP): Recibe la solicitud, valida los datos y realiza la acción correspondiente (insertar, actualizar, eliminar) llamando a los procedimientos almacenados de MySQL (En caso de que la tarea sea marcada como completada y se tache,
 en el campo `estaCompleta` de la base de datos, su valor será 1, y en caso de que se desmarque, se actualizará en la base de datos con valor 0 para tareas no completadas).
5. Respuesta asíncrona: Devuelve un mensaje JSON al frontend.
6. Actualizar la interfaz: El JS recibe la respuesta y actualiza dinámicamente la lista de tareas sin recargar la página.

## ✅ Requisitos previos

Es necesario tener instalado:

- PHP 8.0 o superior.
- MySQL 8.0 o superior.
- Un servidor local (Laragon, XAMPP o similar).
- Git (para clonar el proyecto).

  
## 📦 Instalación

1. **Clonar el repositorio:**

```bash
git clone <URL_DEL_REPOSITORIO>
cd nombre-del-proyecto
```

2. **Configurar la base de datos:**

- Importar el archivo de base de datos en la raiz de proyecto en un SGBD como HeidiSQL, MySQL Workbench, PhpMyAdmin o similares, para
crear automaticamente los procedimiento almacenados y tablas (no es necesario crear la base de datos, en el archivo .sql ya se encuentra la instruccion
de CREATE DATABASE, en caso de que no funcione, crear una base de datos llamada "ListaDeTareasIntermedio").

3. **Configurar la conexión:**

Edita `modelo/conexion.php` y ajusta los datos de conexión (usuario, clave, base de datos):

```php
$host = "localhost";
$usuario = "tu_usuario";
$contrasena = "tu_contraseña";
$base_de_datos = "nombre_de_la_base";
```

4. **Levantar el proyecto:**

Si usas XAMPP, mueve el proyecto a la carpeta `htdocs` y accede desde el navegador, en laragon a la carpeta `www`:

```
http://localhost/nombre-del-proyecto/
```

## 📊 Estructura del proyecto

```
📂 nombre-del-proyecto
├── 📂 controlador
│     └── completarTareaController.php
│     └── crearTareaController.php
│     └── eliminarTareaController.php
│     └── modificarTareaController.php
│     └── mostrarTareaController.php
├── 📂 css
│     └── styles.css
├── 📂 js
│     └── index.js
├── 📂 modelo
│     └── conexion.php
├── 📂 vistas
│     └── index.html
└── index.php
```

## 🤝 Cómo contribuir

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube los cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## 📄 Licencia

Este proyecto está bajo la licencia MIT. ¡Siéntete libre de usarlo y mejorarlo!

Video demostrativo: 

https://github.com/user-attachments/assets/ec51ff12-a7f9-45e8-a165-851171672462

