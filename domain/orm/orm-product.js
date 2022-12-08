const pool = require('../repositories/repository_postgre');

exports.GetAll = async () =>{
    try{
        const response = await pool.query('SELECT * FROM producto ORDER BY id_prod');
        return response.rows;
    }catch(err){
        console.log(" err orm-product.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT * FROM producto WHERE id_prod = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-product.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByFilter = async ( nombre_prod, tipo_prod, calzado_prod, genero_prod ) => {
    let filter = "";
    let at = [];
    if(nombre_prod != "") at.push(['nombre_prod',nombre_prod])
    if(tipo_prod != "") at.push(['tipo_prod',tipo_prod])
    if(calzado_prod != "") at.push(['calzado_prod',calzado_prod])
    if(genero_prod != "") at.push(['genero_prod', genero_prod])
    for (let index = 0; index < at.length; index++) {
        if(index == 0){
            if(at[index][0]=='nombre_prod'){
                filter+= `${at[index][0]} LIKE '%${at[index][1]}%'`
            }else{
                filter+= `${at[index][0]} = '${at[index][1]}'`
            }
        }else{
            filter+= ` AND ${at[index][0]} = '${at[index][1]}'`
        }
    }
    try{
        const response = await pool.query(`SELECT * FROM producto WHERE ${filter}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-product.GetByFilter = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.getFilters = async() => {
    try{
        const tipos = await pool.query('SELECT tipo_prod FROM producto group by tipo_prod');
        const calzados = await pool.query('SELECT calzado_prod FROM producto group by calzado_prod');
        const generos = await pool.query('SELECT genero_prod FROM producto group by genero_prod');
        return {
            tipos: tipos.rows,
            calzados: calzados.rows,
            generos: generos.rows
        };
    }catch(err){
        console.log(" err orm-product.GetFilters = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.Store = async ( nombre_prod, tipo_prod, material_prod, calzado_prod, genero_prod, talla_prod, cantidad_prod ) =>{
    try{
        const response = await pool.query(`INSERT INTO producto (nombre_prod, tipo_prod, material_prod, calzado_prod, genero_prod, talla_prod, cantidad_prod) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [nombre_prod, tipo_prod, material_prod, calzado_prod, genero_prod, talla_prod, cantidad_prod]);
        return true
    }catch(err){
        console.log(" err orm-product.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}