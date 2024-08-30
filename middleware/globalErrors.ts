import { Request, Response, NextFunction } from "express";
import { CustomErrors } from "../Interfaces/customErrors";

const globalErrors = (err:CustomErrors, req:Request, res:Response, next:NextFunction) =>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Error";
    if(process.env.NODE_ENV === 'development'){
        res.status(err.statusCode).json({
            error:err,
            message:err.message,
            stack:err.stack
        })
    }else{
        res.status(err.statusCode).json({
            message:err.message,
            status:err.status
        })
    }
};

export default globalErrors;