const pool = require('../repositories/repository_postgre');

exports.GetAll = async () =>{
    try{
        const response = await pool.query('SELECT * FROM cliente');
        return response.rows;
    }catch(err){
        console.log(" err orm-cliente.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT * FROM cliente WHERE cedula_cli = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-cliente.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByForm = async ( id, email, nit ) =>{
    try{
        const cedulaE = await pool.query(`SELECT * FROM cliente WHERE cedula_cli = ${id}`);
        const emailE = await pool.query(`SELECT * FROM cliente WHERE correo_cli = '${email}'`);
        const nitE = await pool.query(`SELECT * FROM cliente WHERE id_emp = ${nit}`);
        const empE = await pool.query(`SELECT * FROM empresa WHERE id_emp = ${nit}`);
        return {
            cedula: cedulaE.rowCount>0,
            email: emailE.rowCount>0,
            nit: nitE.rowCount>0,
            emp: !empE.rowCount>0
        }
    }catch(err){
        console.log(" err orm-user.GetByForm = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}


exports.Store = async ( cedula_cli, nombre_cli, apellido_cli, celular_cli, correo_cli, id_emp ) =>{
    try{
        const response = await pool.query(`INSERT INTO cliente (cedula_cli, nombre_cli, apellido_cli, celular_cli, correo_cli, id_emp) VALUES ($1, $2, $3, $4, $5, $6)`, [cedula_cli, nombre_cli, apellido_cli, celular_cli, correo_cli, id_emp]);
        return true
    }catch(err){
        console.log(" err orm-cliente.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}