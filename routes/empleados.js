const express = require('express');
const empleados = express.Router();
const db = require('../config/database');

empleados.post('/',async (req, res, next)=>{
    
        const {Nombre,Telefono, Correo, Direccion} = req.body;

        if (Nombre && Telefono && Correo){
        let query = 'INSERT INTO empleados(Nombre,Telefono, Correo, Direccion)';
        query += `VALUES('${Nombre}',${Telefono}, '${Correo}', '${Direccion}')`;
       
        if (!Nombre || !Telefono || !Correo || !Direccion) throw new Error("Valores insuficientes")
        console.log(query)
        const rows = await db.query(query);
        console.log(rows)
    if(rows.affectedRows == 1){
        return res.status(201).json({code: 201, message: "Empleado insertado correctamente"});
    }    
        return res.status(500).json({code: 500, massage: "ocurrio un error"});
    }
        return res.status(500).json({code: 500, message: "Campos incompletos"});
});

empleados.delete("/:id([0-9]{1,3})",async (req,res,next)=>{
    const query = `DELETE FROM empleados WHERE id=${req.params.id}`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Empleado borrado correctamente"});
    }
    return res.status(500).json({code: 500, message: "Empleado no encontrado"})
});
empleados.put("/:id([0-9]{1,3})",async (req , res, next)=>{
    const {Nombre,Telefono,Correo, Direccion} = req.body;
    
    if(Nombre && Telefono && Correo && Direccion){
    let query = `UPDATE Empleados SET Nombre='${Nombre}', Telefono=${Telefono},Correo ='${Correo}',Direccion = '${Direccion}' WHERE id=${req.params.id}`;
    console.log(query)
    const rows = await db.query(query);

    if (rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Usuario actualizado correctamente"});
    }
    return res.status(500).json({code: 500, message: "ocurrio un error"});
}
return res.status(500).json({code: 500, message: "campos incompletos"});
})

/*empleados.patch("/:id([0-9]{1,3})",async (req , res, next)=>{

    if(req.body.Nombre){
    let query = `UPDATE Empleados SET Nombre='${req.body.Nombre}'WHERE id=${req.params.id}`;
    console.log(query)
    const rows = await db.query(query);

    if (rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Empleado actualizado correctamente"});
    }
    return res.status(500).json({code: 500, message: "ocurrio un error"});
}
return res.status(500).json({code: 500, message: "Campos incompletos"})
})

empleados.get('/', async(req, res, next)=>{
    const emp = await db.query("SELECT * FROM empleados");
    return res.status(200).json({code: 200, message: emp});
});

/*empleados.get('/:id([0-9]{1,3})',async (req, res, next)=>{
    const id = req.params.id;
    if(id >= 0 && id <= 150) {
    const emp = await db.query("SELECT * FROM Empleados WHERE id="+id+";");
    return res.status(200).json({code: 1, message: emp});
    }
        return res.status(404).send({code: 404, message: emp});
});*/

empleados.get('/:nombre([A-Za-z]+)', async (req, res, next) => {
    const nombre = req.params.nombre;
        const emp = await db.query("SELECT * FROM Empleados WHERE nombre Like '%"+nombre+"%';");
    if(emp.length>0){
        return res.status(200).json({code: 1, message: emp});
    }
    else
        return res.status(404).send({code: 404, message: emp});
});

module.exports = empleados;