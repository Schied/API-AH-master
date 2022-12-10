const pool = require('../repositories/repository_postgre');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../util/keys');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const accountTransport = require("../../util/account_transport.json");

const generarCodigo = (tam) => {
    const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let aleatoria = "";
    for (let i = 0; i < tam; i++) {
        aleatoria += banco.charAt(Math.floor(Math.random() * banco.length));
    }
    return aleatoria;
};

exports.GetAll = async () =>{
    try{
        const response = await pool.query(`SELECT * FROM usuario WHERE tipo_usu = 'Operador'`);
        return response.rows;
    }catch(err){
        console.log(" err orm-user.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT * FROM usuario WHERE cedula_usu = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-user.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByEmail = async ( email ) =>{
    try{
        const response = await pool.query(`SELECT * FROM usuario WHERE correo_usu = '${email}'`);
        return response.rows;
    }catch(err){
        console.log(" err orm-user.GetByEmail = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByNick = async ( nick ) =>{
    try{
        const response = await pool.query(`SELECT * FROM usuario WHERE nick_usu = ${nick}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-user.GetByNick = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByForm = async ( id, email, nick ) =>{
    try{
        const cedulaE = await pool.query(`SELECT * FROM usuario WHERE cedula_usu = ${id}`);
        const emailE = await pool.query(`SELECT * FROM usuario WHERE correo_usu = '${email}'`);
        const nickE = await pool.query(`SELECT * FROM usuario WHERE nick_usu = '${nick}'`);
        return {
            cedula: cedulaE.rowCount>0,
            email: emailE.rowCount>0,
            nick: nickE.rowCount>0
        }
    }catch(err){
        console.log(" err orm-user.GetByNick = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.Store = async ( cedula_usu, nombre_usu, correo_usu, nick_usu, contra_usu, tipo_usu ) =>{
    try{
        const pswHash = bcrypt.hashSync(contra_usu, 10);
        const response = await pool.query(`INSERT INTO usuario (cedula_usu, nombre_usu, correo_usu, nick_usu, contra_usu, tipo_usu) VALUES ($1, $2, $3, $4, $5, $6)`, [cedula_usu, nombre_usu, correo_usu, nick_usu, pswHash, tipo_usu]);
        return true
    }catch(err){
        console.log(" err orm-user.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.DeleteById = async ( Id ) =>{
    try{
        const response = await pool.query(`DELETE FROM usuario WHERE cedula_usu = ${Id}`);
        return true
    }catch(err){
        console.log(" err orm-user.DeleteById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.UpdateById = async ( cedula_usu, correo_usu, nick_usu ) =>{
    try{
        const response = await pool.query(`UPDATE usuario SET nick_usu = $1, correo_usu = $2 WHERE cedula_usu = $3`, [nick_usu, correo_usu, cedula_usu]);
        return true
    }catch(err){
        console.log(" err orm-user.UpdateById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.UpdateByEmail = async ( contra_usu, correo_usu ) =>{
    try{
        const pswHash = bcrypt.hashSync(contra_usu, 10);
        const response = await pool.query(`UPDATE usuario SET contra_usu = $1 WHERE correo_usu = $2`, [pswHash, correo_usu]);
        return true
    }catch(err){
        console.log(" err orm-user.UpdateById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.Signin = async (nick_usu, contra_usu) => {
    try{
        const user = await pool.query(`SELECT * FROM usuario WHERE nick_usu = $1`, [nick_usu]);
        if(user.rowCount>0){
            const dataUser = user.rows[0];
            const match = await bcrypt.compare(contra_usu, dataUser.contra_usu);
            if(match){
                return await {token: jwt.sign({ dataUser }, config.KEY)};
            }else{
                return false
            }
        }else{
            return false
        }      
    }catch(err){
        console.log(" err orm-user.Signin = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.verifyToken = async (token) => {
    try{
        const decoded = jwt.verify(token, config.KEY);
        if(decoded){
            return {decoded}
        }else{
            return false
        }    
    }catch(err){
        console.log(" err orm-user.verifyToken = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.obtnCodigo = async (correo) => {
    try{
        const code = generarCodigo(8);
        const response = await pool.query(`SELECT * FROM usuario WHERE correo_usu = '${correo}'`);
        if(response.rowCount>0){
            const message = {
                from: "soporte.marlonstefan@gmail.com",
                to: correo,
                subject: "Código de verificación",
                text: `Su código de verificación es: ${code}`,
            };
            const oauth2Client = new OAuth2(
                accountTransport.auth.clientId,
                accountTransport.auth.clientSecret,
                "https://developers.google.com/oauthplayground",
            );
            oauth2Client.setCredentials({
                refresh_token: accountTransport.auth.refreshToken,
                tls: {
                    rejectUnauthorized: false
                }
            });
            oauth2Client.getAccessToken((err, token) => {
                if (err) return {err:{code: 123, messsage: err}};
                accountTransport.auth.accessToken = token;     
            });
            let mail = await nodemailer.createTransport(accountTransport).sendMail(message)
            return {code}
        }else{
            return {err:{code: 123, messsage: 'El correo ingresado no existe'}}
        }
        
    }catch(err){
        console.log(" err orm-user.sendEmail = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.recuperarUsuario = async (correo) => {
    try{
        const response = await pool.query(`SELECT * FROM usuario WHERE correo_usu = '${correo}'`);
        if(response.rowCount>0){
            const message = {
                from: "soporte.marlonstefan@gmail.com",
                to: correo,
                subject: "Recuperación de usuario",
                text: `Su usuario es: ${response.rows[0].nick_usu}`,
            };
            const oauth2Client = new OAuth2(
                accountTransport.auth.clientId,
                accountTransport.auth.clientSecret,
                "https://developers.google.com/oauthplayground",
            );
            oauth2Client.setCredentials({
                refresh_token: accountTransport.auth.refreshToken,
                tls: {
                    rejectUnauthorized: false
                }
            });
            oauth2Client.getAccessToken((err, token) => {
                if (err) return {err:{code: 123, messsage: err}};
                accountTransport.auth.accessToken = token;     
            });
            let mail = await nodemailer.createTransport(accountTransport).sendMail(message)
            return true
        }else{
            return {err:{code: 123, messsage: 'El correo ingresado no existe'}}
        }
        
    }catch(err){
        console.log(" err orm-user.sendEmail = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

