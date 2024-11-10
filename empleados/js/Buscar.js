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
        document.getElementById("searchEmployeeForm").onsubmit = searchEmployee;
    } else {
        window.location.href = "index.html"; // Redirige a la página de login si no hay token
    }
}

function searchEmployee(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    // Obtén el nombre del empleado a buscar
    const employeeName = document.getElementById("nombre").value;

    // Realiza la solicitud GET para buscar el empleado por nombre
    axios.get(`${url}/${employeeName}`, headers)
        .then(function (res) {
            if (res.data.code === 1 && res.data.message.length > 0) {
                displayEmployee(res.data.message);
            } else {
                alert("Empleado no encontrado");
                document.getElementById("employeeResult").innerHTML = "";
            }
        })
        .catch(function (err) {
            console.error(err);
            alert("Error en la solicitud");
        });
}

function displayEmployee(employeeData) {
    const resultDiv = document.getElementById("employeeResult");
    resultDiv.innerHTML = ""; // Limpia resultados previos

    employeeData.forEach(employee => {
        resultDiv.innerHTML += `
            <h3>Nombre: ${employee.Nombre}</h3>
            <p>Teléfono: ${employee.Telefono}</p>
            <p>Correo: ${employee.Correo}</p>
            <p>Dirección: ${employee.Direccion}</p>
            <hr>
        `;
    });
}