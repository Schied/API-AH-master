const pool = require('../repositories/repository_postgre');
const format = require('pg-format');

exports.GetAll = async () =>{
    try{
        const response = await pool.query(`SELECT id_ing, cantidad_ing, to_char( fecha_ing, 'YYYY-MON-DD') as fecha_ing, codigo_mat, cedula_usu FROM ingreso_material`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoM.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT id_ing, cantidad_ing, to_char( fecha_ing, 'YYYY-MON-DD') as fecha_ing, codigo_mat, cedula_usu FROM ingreso_material WHERE id_ing = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoM.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByUsu = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT id_ing, cantidad_ing, to_char( fecha_ing, 'YYYY-MON-DD') as fecha_ing, codigo_mat, cedula_usu FROM ingreso_material WHERE cedula_usu = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoM.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByDate = async ( Dateini, Datefin ) =>{
    try{
        const response = await pool.query(`SELECT id_ing, cantidad_ing, to_char( fecha_ing, 'YYYY-MON-DD') as fecha_ing, codigo_mat, cedula_usu FROM ingreso_material WHERE fecha_ing >= '${Dateini}' AND fecha_ing <= '${Datefin}'`);
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