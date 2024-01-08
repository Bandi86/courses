import { CustomAPIError } from "../errors/custom-error.js";
import {StatusCodes} from 'http-status-codes'

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({msg: err.message});
  } 
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Somthing went wrong, please try again"});
};

export default errorHandler