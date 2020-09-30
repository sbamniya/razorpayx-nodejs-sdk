/**
 * ErrorHandlerHelper Class - For managing errors
 */
class ErrorHandlerHelper {
  /**
   *
   * @param {*} err
   */
  constructor(err) {
    this.rawError = err;
    this.error = {
      code: 500,
      isError: true,
      timestamp: Date.now(),
      error: "Unknown error",
      messages: [],
      data: undefined,
    };
    this.setError();
  }
  /**
   *
   */
  setError() {
    this.error.code = this.rawError ? this.rawError.code : this.error.code;
    this.error.timestamp = Date.now();
    this.error.messages = [];
    if (
      this.rawError &&
      this.rawError.data &&
      typeof this.rawError.data === "object" &&
      typeof this.rawError.data.error === "object"
    ) {
      this.error.messages.push(this.rawError.data.error.description);
      this.error.data = this.rawError.data;
    } else {
      this.error.error = "Unknown";
      this.error.messages = ["An unexpected error occured."];
    }
  }
}

module.exports = ErrorHandlerHelper;
