const magic = require('../../util/magic');
const enum_ = require('../../util/enum');
const ormEmpresa = require('../orm/orm-empresa');

exports.GetAll = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        respOrm = await ormEmpresa.GetAll();
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
        respOrm = await ormEmpresa.GetById(id);
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
        const { id_emp, nombre_emp, direccion_emp, telefono_emp } = req.body;
        if( id_emp && nombre_emp && direccion_emp && telefono_emp ){
            respOrm = await ormEmpresa.Store( id_emp, nombre_emp, direccion_emp, telefono_emp );
            if(respOrm.err){
                status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'Empresa created', statusCode = enum_.CODE_CREATED;
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
