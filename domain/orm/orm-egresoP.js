const pool = require('../repositories/repository_postgre');
const format = require('pg-format');

exports.GetAll = async () =>{
    try{
        const response = await pool.query(`SELECT id_egr, cantidad_egr, to_char( fecha_egr, 'YYYY-MON-DD') as fecha_egr, id_prod, cedula_usu, cedula_cli FROM egreso_producto`);
        return response.rows;
    }catch(err){
        console.log(" err orm-egresoP.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT id_egr, cantidad_egr, to_char( fecha_egr, 'YYYY-MON-DD') as fecha_egr, id_prod, cedula_usu, cedula_cli FROM egreso_producto WHERE id_egr = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-egresoP.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByUsu = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT id_egr, cantidad_egr, to_char( fecha_egr, 'YYYY-MON-DD') as fecha_egr, id_prod, cedula_usu, cedula_cli FROM egreso_producto WHERE cedula_usu = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-egresoP.GetByUsu = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByCli = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT id_egr, cantidad_egr, to_char( fecha_egr, 'YYYY-MON-DD') as fecha_egr, id_prod, cedula_usu, cedula_cli FROM egreso_producto WHERE cedula_cli = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-egresoP.GetByCli = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByDate = async ( Dateini, Datefin ) =>{
    try{
        const response = await pool.query(`SELECT id_egr, cantidad_egr, to_char( fecha_egr, 'YYYY-MON-DD') as fecha_egr, id_prod, cedula_usu, cedula_cli FROM egreso_producto WHERE fecha_egr >= '${Dateini}' AND fecha_egr <= '${Datefin}'`);
        return response.rows;
    }catch(err){
        console.log(" err orm-egresoP.GetByDate = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.Store = async ( egresos ) =>{
    try{
        const response = await pool.query(format('INSERT INTO egreso_producto (cantidad_egr, id_prod, cedula_usu, cedula_cli) VALUES %L', egresos));
        return true
    }catch(err){
        console.log(" err orm-egresoP.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}