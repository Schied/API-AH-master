const pool = require('../repositories/repository_postgre');
const format = require('pg-format');

exports.GetAll = async () =>{
    try{
        const response = await pool.query(`SELECT ingreso_producto.id_ing, ingreso_producto.cantidad_ing, to_char( ingreso_producto.fecha_ing, 'YYYY-MON-DD') as fecha_ing, ingreso_producto.id_prod, ingreso_producto.cedula_usu, producto.nombre_prod, usuario.nombre_usu FROM ingreso_producto INNER JOIN producto ON producto.id_prod = ingreso_producto.id_prod INNER JOIN usuario ON usuario.cedula_usu = ingreso_producto.cedula_usu`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoP.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT ingreso_producto.id_ing, ingreso_producto.cantidad_ing, to_char( ingreso_producto.fecha_ing, 'YYYY-MON-DD') as fecha_ing, ingreso_producto.id_prod, ingreso_producto.cedula_usu, producto.nombre_prod, usuario.nombre_usu FROM ingreso_producto INNER JOIN producto ON producto.id_prod = ingreso_producto.id_prod INNER JOIN usuario ON usuario.cedula_usu = ingreso_producto.cedula_usu WHERE id_ing = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoP.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByUsu = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT ingreso_producto.id_ing, ingreso_producto.cantidad_ing, to_char( ingreso_producto.fecha_ing, 'YYYY-MON-DD') as fecha_ing, ingreso_producto.id_prod, ingreso_producto.cedula_usu, producto.nombre_prod, usuario.nombre_usu FROM ingreso_producto INNER JOIN producto ON producto.id_prod = ingreso_producto.id_prod INNER JOIN usuario ON usuario.cedula_usu = ingreso_producto.cedula_usu WHERE cedula_usu = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoP.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByDate = async ( Dateini, Datefin ) =>{
    try{
        const response = await pool.query(`SELECT ingreso_producto.id_ing, ingreso_producto.cantidad_ing, to_char( ingreso_producto.fecha_ing, 'YYYY-MON-DD') as fecha_ing, ingreso_producto.id_prod, ingreso_producto.cedula_usu, producto.nombre_prod, usuario.nombre_usu FROM ingreso_producto INNER JOIN producto ON producto.id_prod = ingreso_producto.id_prod INNER JOIN usuario ON usuario.cedula_usu = ingreso_producto.cedula_usu WHERE fecha_ing >= '${Dateini}' AND fecha_ing <= '${Datefin}'`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoP.GetByDate = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}


exports.Store = async ( ingresos ) =>{
    try{
        const response = await pool.query(format('INSERT INTO ingreso_producto (cantidad_ing, id_prod, cedula_usu) VALUES %L', ingresos));
        return true
    }catch(err){
        console.log(" err orm-ingresoP.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}