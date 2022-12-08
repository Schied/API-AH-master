const pool = require('../repositories/repository_postgre');

exports.GetAll = async () =>{
    try{
        const response = await pool.query('SELECT * FROM material');
        return response.rows;
    }catch(err){
        console.log(" err orm-material.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT * FROM material WHERE codigo_mat = '${Id}'`);
        return response.rows;
    }catch(err){
        console.log(" err orm-material.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByFilter = async ( codigo_mat, nombre_mat, color_mat, unidad_mat ) => {
    let filter = "";
    let at = [];
    if(nombre_mat != "") at.push(['nombre_mat',nombre_mat])
    if(codigo_mat != "") at.push(['codigo_mat',codigo_mat])
    if(unidad_mat != "") at.push(['unidad_mat',unidad_mat])
    if(color_mat != "") at.push(['color_mat',color_mat])
    for (let index = 0; index < at.length; index++) {
        if(index == 0){
            if(at[index][0]=='nombre_mat'){
                filter+= `${at[index][0]} LIKE '%${at[index][1]}%'`
            }else{
                filter+= `${at[index][0]} = '${at[index][1]}'`
            }
        }else{
            filter+= ` AND ${at[index][0]} = '${at[index][1]}'`
        }
    }
    try{
        const response = await pool.query(`SELECT * FROM material WHERE ${filter}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-material.GetByFilter = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.getFilters = async() => {
    try{
        const colores = await pool.query('SELECT color_mat FROM material group by color_mat');
        const unidades = await pool.query('SELECT unidad_mat FROM material group by unidad_mat');
        return {
            colores: colores.rows,
            unidades: unidades.rows,
        };
    }catch(err){
        console.log(" err orm-material.GetFilters = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}


exports.Store = async ( codigo_mat, nombre_mat, color_mat, unidad_mat, cantidad_mat ) =>{
    try{
        const response = await pool.query(`INSERT INTO material (codigo_mat, nombre_mat, color_mat, unidad_mat, cantidad_mat) VALUES ($1, $2, $3, $4, $5)`, [codigo_mat, nombre_mat, color_mat, unidad_mat, cantidad_mat]);
        return true
    }catch(err){
        console.log(" err orm-material.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}