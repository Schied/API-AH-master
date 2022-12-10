const magic = require('../../util/magic');
const enum_ = require('../../util/enum');
const ormUser = require('../orm/orm-user');


exports.GetAll = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        respOrm = await ormUser.GetAll();
        if(respOrm.err){
            status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            message = 'Success Response', data = respOrm, statusCode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT;
        }
        resp = await magic.ResponseService(status,errorCode,message,data);
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        resp = await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,'');
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(resp);
    }
}

exports.GetById = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const id = req.params.id;
        respOrm = await ormUser.GetById(id);
        if(respOrm && respOrm.err){
            status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            if (respOrm) {
                message = 'Success Response', data= respOrm, statusCode = enum_.CODE_OK;
            }else{
                status = false, errorCode = enum_.ID_NOT_FOUND, message = 'ID NOT FOUND', statusCode = enum_.CODE_NOT_FOUND;
            }
        }
        resp = await magic.ResponseService(status,errorCode,message,data);
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}

exports.GetByEmail = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const email = req.params.email;
        respOrm = await ormUser.GetByEmail(email);
        if(respOrm && respOrm.err){
            status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            if (respOrm) {
                message = 'Success Response', data= respOrm, statusCode = enum_.CODE_OK;
            }else{
                status = false, errorCode = enum_.ID_NOT_FOUND, message = 'ID NOT FOUND', statusCode = enum_.CODE_NOT_FOUND;
            }
        }
        resp = await magic.ResponseService(status,errorCode,message,data);
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}

exports.GetByNick = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const nick = req.params.nick;
        respOrm = await ormUser.GetByNick(nick);
        if(respOrm && respOrm.err){
            status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            if (respOrm) {
                message = 'Success Response', data= respOrm, statusCode = enum_.CODE_OK;
            }else{
                status = false, errorCode = enum_.ID_NOT_FOUND, message = 'ID NOT FOUND', statusCode = enum_.CODE_NOT_FOUND;
            }
        }
        resp = await magic.ResponseService(status,errorCode,message,data);
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}

exports.GetByForm = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const {id, email, nick } = req.body;
        respOrm = await ormUser.GetByForm(id, email, nick );
        if(respOrm && respOrm.err){
            status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            if (respOrm) {
                message = 'Success Response', data= respOrm, statusCode = enum_.CODE_OK;
            }else{
                status = false, errorCode = enum_.ID_NOT_FOUND, message = 'ID NOT FOUND', statusCode = enum_.CODE_NOT_FOUND;
            }
        }
        resp = await magic.ResponseService(status,errorCode,message,data);
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}

exports.Store = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const { cedula_usu, nombre_usu, correo_usu, nick_usu, contra_usu, tipo_usu } = req.body;
        if( cedula_usu && nombre_usu && correo_usu && nick_usu && contra_usu && tipo_usu ){
            respOrm = await ormUser.Store( cedula_usu, nombre_usu, correo_usu, nick_usu, contra_usu, tipo_usu );
            if(respOrm.err){
                status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'User created', statusCode = enum_.CODE_CREATED;
            }
        }else{
            status = false, errorCode = enum_.ERROR_REQUIRED_FIELD, message = 'All fields are required', statusCode = enum_.CODE_BAD_REQUEST;
        }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
    }
}

exports.UpdateById = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const { cedula_usu, correo_usu, nick_usu } = req.body;
        if( cedula_usu && correo_usu && nick_usu ){
            respOrm = await ormUser.UpdateById( cedula_usu, correo_usu, nick_usu );
            if(respOrm.err){
                status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'User updated', statusCode = enum_.CODE_CREATED;
            }
        }else{
            status = false, errorCode = enum_.ERROR_REQUIRED_FIELD, message = 'All fields are required', statusCode = enum_.CODE_BAD_REQUEST;
        }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}

exports.UpdateByEmail = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const { contra_usu, correo_usu } = req.body;
        if( contra_usu && correo_usu ){
            respOrm = await ormUser.UpdateByEmail( contra_usu, correo_usu );
            if(respOrm.err){
                status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'User updated', statusCode = enum_.CODE_CREATED;
            }
        }else{
            status = false, errorCode = enum_.ERROR_REQUIRED_FIELD, message = 'All fields are required', statusCode = enum_.CODE_BAD_REQUEST;
        }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}

exports.DeleteById = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const id = req.params.id;
        respOrm = await ormUser.DeleteById(id);
        if(respOrm.err){
            status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            message = 'User deleted', statusCode = enum_.CODE_OK;
        }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}

exports.Signin = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const { nick_usu, contra_usu } = req.body;
        if( nick_usu, contra_usu ){
            respOrm = await ormUser.Signin( nick_usu, contra_usu );
            if(respOrm.err){
                status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else if(respOrm.token){
                message = 'Valid Credentials', statusCode = enum_.CODE_OK, data = respOrm;
            }else{
                status = false, message = 'Invalid Credentials', statusCode = enum_.CODE_OK;
            }
        }else{
            status = false, errorCode = enum_.ERROR_REQUIRED_FIELD, message = 'All fields are required', statusCode = enum_.CODE_BAD_REQUEST;
        }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}

exports.verifyToken = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const { token } = req.body;
        if( token ){
            respOrm = await ormUser.verifyToken( token );
            if(respOrm.err){
                status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else if(respOrm.decoded){
                message = 'Valid token', statusCode = enum_.CODE_OK, data = respOrm;
            }else{
                status = false, message = 'Invalid token', statusCode = enum_.CODE_OK;
            }
        }else{
            status = false, errorCode = enum_.ERROR_REQUIRED_FIELD, message = 'All fields are required', statusCode = enum_.CODE_BAD_REQUEST;
        }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}

exports.obtnCodigo = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const { correo } = req.body;
        respOrm = await ormUser.obtnCodigo(correo);
        if(respOrm.err){
            status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            status = true, message = 'Correo enviado', data = respOrm, statusCode = enum_.CODE_OK;
        }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}

exports.recuperarUsuario = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const { correo } = req.body;
        respOrm = await ormUser.recuperarUsuario(correo);
        if(respOrm.err){
            status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            status = true, message = 'Correo enviado', statusCode = enum_.CODE_OK;
        }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}