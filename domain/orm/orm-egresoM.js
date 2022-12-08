const pool = require('../repositories/repository_postgre');
const format = require('pg-format');

exports.GetAll = async () =>{
    try{
        const response = await pool.query(`SELECT id_egr, cantidad_egr, to_char( fecha_egr, 'YYYY-MON-DD') as fecha_egr, codigo_mat, cedula_usu FROM egreso_material`);
        return response.rows;
    }catch(err){
        console.log(" err orm-egresoM.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT id_egr, cantidad_egr, to_char( fecha_egr, 'YYYY-MON-DD') as fecha_egr, codigo_mat, cedula_usu FROM egreso_material WHERE id_egr = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-egresoM.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByUsu = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT id_egr, cantidad_egr, to_char( fecha_egr, 'YYYY-MON-DD') as fecha_egr, codigo_mat, cedula_usu FROM egreso_material WHERE cedula_usu = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-egresoM.GetByUsu = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByDate = async ( Dateini, Datefin ) =>{
    try{
        const response = await pool.query(`SELECT id_egr, cantidad_egr, to_char( fecha_egr, 'YYYY-MON-DD') as fecha_egr, codigo_mat, cedula_usu FROM egreso_material WHERE fecha_egr >= '${Dateini}' AND fecha_egr <= '${Datefin}'`);
        return response.rows;
    }catch(err){
        console.log(" err orm-egresoM.GetByDate = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.Store = async ( egresos ) =>{
    try{
        const response = await pool.query(format('INSERT INTO egreso_material (cantidad_egr, codigo_mat, cedula_usu) VALUES %L', egresos));
        return true
    }catch(err){
        console.log(" err orm-egresoM.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}