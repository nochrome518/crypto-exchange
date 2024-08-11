export class CommonService {
    
    successResponse(msg: string, data?: any){
        const resObject = {
            success: true,
            statusCode: 200,
            message: msg,
            data: data
        }
        return resObject;
    }

    failureResponse(msg: string, statusCode = 400){
        const resObject = {
            success: false,
            statusCode: statusCode,
            message: msg,
        }
        return resObject;
    }

    
}