export class HttpError extends Error {
    statusCode: number;
    errorCode :string
  
    constructor(message: string, statusCode: number, errorCode: string ) {
      super(message); // Define a mensagem de erro padrão
      this.statusCode = statusCode;
      this.errorCode = errorCode // Define o código de status
      this.name = "HttpError"; // Define o nome do erro
      Object.setPrototypeOf(this, HttpError.prototype); // Corrige a herança em versões mais antigas do JavaScript
    }
  }
  