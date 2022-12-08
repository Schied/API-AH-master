const magic = require('../../util/magic');
const enum_ = require('../../util/enum');
const ormIngresoP = require('../orm/orm-ingresoP');

exports.GetAll = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        respOrm = await ormIngresoP.GetAll();
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
        respOrm = await ormIngresoP.GetById(id);
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

exports.GetByUsu = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const id = req.params.id;
        respOrm = await ormIngresoP.GetByUsu(id);
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

exports.GetByDate = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const {Dateini, Datefin} = req.body;
        respOrm = await ormIngresoP.GetByDate(Dateini, Datefin);
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
        const { ingresos } = req.body;
        if( ingresos ){
            respOrm = await ormIngresoP.Store( ingresos );
            if(respOrm.err){
                status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'Ingreso created', statusCode = enum_.CODE_CREATED;
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
