import { CustomAPIError } from "./custom-error.js";
import {StatusCodes} from 'http-status-codes'

class BadrequestError extends CustomAPIError {
    constructor(message) {
      super(message);
      this.statusCode = StatusCodes.BAD_REQUEST
    }
  }
  
export {BadrequestError}