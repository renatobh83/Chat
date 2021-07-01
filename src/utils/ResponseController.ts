class ResponseController{
  defaultResponse = (message: any, statusCode: number = 200) =>({
    message,
    statusCode
  })
  errorResponse = (message: any, statusCode: number = 400) =>({
    message,
    statusCode
  })
}
const responseController = new ResponseController()

export {responseController}