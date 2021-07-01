class ResponseController{
  defaultResponse = (message: object, statusCode: number) =>({
    message,
    statusCode
  })
  errorResponse = (message: object, statusCode: number) =>({
    message,
    statusCode
  })
}
const responseController = new ResponseController()

export {responseController}