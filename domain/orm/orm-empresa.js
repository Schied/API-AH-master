const pool = require('../repositories/repository_postgre');

exports.GetAll = async () =>{
    try{
        const response = await pool.query('SELECT * FROM empresa');
        return response.rows;
    }catch(err){
        console.log(" err orm-empresa.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT * FROM empresa WHERE id_emp = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-empresa.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.Store = async ( id_emp, nombre_emp, direccion_emp, telefono_emp ) =>{
    try{
        const response = await pool.query(`INSERT INTO empresa (id_emp, nombre_emp, direccion_emp, telefono_emp) VALUES ($1, $2, $3, $4)`, [id_emp, nombre_emp, direccion_emp, telefono_emp]);
        return true
    }catch(err){
        console.log(" err orm-empresa.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}