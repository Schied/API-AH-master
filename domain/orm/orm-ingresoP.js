const pool = require('../repositories/repository_postgre');
const format = require('pg-format');

exports.GetAll = async () =>{
    try{
        const response = await pool.query(`SELECT id_ing, cantidad_ing, to_char( fecha_ing, 'YYYY-MON-DD') as fecha_ing, id_prod, cedula_usu FROM ingreso_producto`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoP.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT id_ing, cantidad_ing, to_char( fecha_ing, 'YYYY-MON-DD') as fecha_ing, id_prod, cedula_usu FROM ingreso_producto WHERE id_ing = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoP.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByUsu = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT id_ing, cantidad_ing, to_char( fecha_ing, 'YYYY-MON-DD') as fecha_ing, id_prod, cedula_usu FROM ingreso_producto WHERE cedula_usu = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoP.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByDate = async ( Dateini, Datefin ) =>{
    try{
        const response = await pool.query(`SELECT id_ing, cantidad_ing, to_char( fecha_ing, 'YYYY-MON-DD') as fecha_ing, id_prod, cedula_usu FROM ingreso_producto WHERE fecha_ing >= '${Dateini}' AND fecha_ing <= '${Datefin}'`);
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