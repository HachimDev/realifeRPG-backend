class HttpError extends Error {
  constructor(message: string, errorCode: string) {
    super(message); // Add a "message" property
    this.name = errorCode; // Add a "code" property
  }
}
export default HttpError;
