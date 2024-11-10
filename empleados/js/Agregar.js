window.onload = init;
var headers = {};
var url = "http://localhost:3000/empleados"; // URL del endpoint para agregar empleados

function init() {
    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        };
        document.getElementById("addEmployeeForm").onsubmit = addEmployee;
    } else {
        window.location.href = "index.html"; // Redirige a la página de login si no hay token
    }
}

function addEmployee(event) {
    event.preventDefault(); // Evita el envío del formulario de manera tradicional

    // Obtén los valores del formulario
    const employeeData = {
        Nombre: document.getElementById("nombre").value,
        Telefono: document.getElementById("telefono").value,
        Correo: document.getElementById("correo").value,
        Direccion: document.getElementById("direccion").value
    };

    // Realiza la solicitud POST para agregar el empleado
    axios.post(url, employeeData, headers)
        .then(function (res) {
            if (res.data.code === 201) {
                alert("Empleado agregado correctamente");
                document.getElementById("addEmployeeForm").reset();
            } else {
                alert("Error al agregar el empleado");
            }
        })
        .catch(function (err) {
            console.error(err);
            alert("Error en la solicitud");
        });
}
