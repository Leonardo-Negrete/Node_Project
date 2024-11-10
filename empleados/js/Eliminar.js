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
        document.getElementById("deleteEmployeeForm").onsubmit = deleteEmployee;
    } else {
        window.location.href = "index.html"; // Redirige a la página de login si no hay token
    }
}

function deleteEmployee(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const employeeId = document.getElementById("id").value;

    axios.delete(`${url}/${employeeId}`, headers)
        .then(function (res) {
            if (res.data.code === 200) {
                alert("Empleado eliminado correctamente");
                document.getElementById("deleteEmployeeForm").reset();
            } else if (res.data.code === 404) {
                alert("Empleado no encontrado");
            }
        })
        .catch(function (err) {
            if (err.response && err.response.status === 404) {
                alert("Empleado no encontrado");
            } else {
                console.error(err);
                alert("Error en la solicitud");
            }
        });
}

