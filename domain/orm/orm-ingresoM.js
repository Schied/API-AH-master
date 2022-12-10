const pool = require('../repositories/repository_postgre');
const format = require('pg-format');

exports.GetAll = async () =>{
    try{
        const response = await pool.query(`SELECT ingreso_material.id_ing, ingreso_material.cantidad_ing, to_char( ingreso_material.fecha_ing, 'YYYY-MON-DD') as fecha_ing, ingreso_material.codigo_mat, ingreso_material.cedula_usu, material.nombre_mat, usuario.nombre_usu FROM ingreso_material INNER JOIN material ON material.codigo_mat = ingreso_material.codigo_mat INNER JOIN usuario ON usuario.cedula_usu = ingreso_material.cedula_usu`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoM.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT ingreso_material.id_ing, ingreso_material.cantidad_ing, to_char( ingreso_material.fecha_ing, 'YYYY-MON-DD') as fecha_ing, ingreso_material.codigo_mat, ingreso_material.cedula_usu, material.nombre_mat, usuario.nombre_usu FROM ingreso_material INNER JOIN material ON material.codigo_mat = ingreso_material.codigo_mat INNER JOIN usuario ON usuario.cedula_usu = ingreso_material.cedula_usu WHERE id_ing = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoM.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByUsu = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT ingreso_material.id_ing, ingreso_material.cantidad_ing, to_char( ingreso_material.fecha_ing, 'YYYY-MON-DD') as fecha_ing, ingreso_material.codigo_mat, ingreso_material.cedula_usu, material.nombre_mat, usuario.nombre_usu FROM ingreso_material INNER JOIN material ON material.codigo_mat = ingreso_material.codigo_mat INNER JOIN usuario ON usuario.cedula_usu = ingreso_material.cedula_usu WHERE cedula_usu = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoM.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByDate = async ( Dateini, Datefin ) =>{
    try{
        const response = await pool.query(`SELECT ingreso_material.id_ing, ingreso_material.cantidad_ing, to_char( ingreso_material.fecha_ing, 'YYYY-MON-DD') as fecha_ing, ingreso_material.codigo_mat, ingreso_material.cedula_usu, material.nombre_mat, usuario.nombre_usu FROM ingreso_material INNER JOIN material ON material.codigo_mat = ingreso_material.codigo_mat INNER JOIN usuario ON usuario.cedula_usu = ingreso_material.cedula_usu WHERE fecha_ing >= '${Dateini}' AND fecha_ing <= '${Datefin}'`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoM.GetByDate = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}


exports.Store = async ( ingresos ) =>{
    try{
        const response = await pool.query(format('INSERT INTO ingreso_material (cantidad_ing, codigo_mat, cedula_usu) VALUES %L', ingresos));
        return true
    }catch(err){
        console.log(" err orm-ingresoM.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}