window.onload = init;
var headers = {};
var url = "http://localhost:3000/empleados"; // URL base del endpoint de empleados

function init() {
    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        };
        document.getElementById("modifyEmployeeForm").onsubmit = modifyEmployee;
    } else {
        window.location.href = "index.html"; // Redirige a la página de login si no hay token
    }
}

function modifyEmployee(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    // Obtén el ID del empleado y los valores de los campos que serán modificados
    const employeeId = document.getElementById("id").value;
    const employeeData = {
        Nombre: document.getElementById("nombre").value,
        Telefono: document.getElementById("telefono").value,
        Correo: document.getElementById("correo").value,
        Direccion: document.getElementById("direccion").value
    };

    // Realiza la solicitud PUT para modificar el empleado
    axios.put(`${url}/${employeeId}`, employeeData, headers)
        .then(function (res) {
            if (res.data.code === 200) {
                alert("Empleado modificado correctamente");
                document.getElementById("modifyEmployeeForm").reset();
            } else {
                alert("Error al modificar el empleado");
            }
        })
        .catch(function (err) {
            console.error(err);
            alert("Error en la solicitud");
        });
}
