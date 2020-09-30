/**
 * ErrorHandlerHelper Class - For managing success message
 */
class SuccessHandlerHelper {
  /**
   *
   * @param {*} data
   */
  constructor(data) {
    this.rawData = data;
    this.data = {
      code: 200,
      isError: false,
      timestamp: Date.now(),
      error: undefined,
      messages: [],
    };
    this.setSucccess();
  }
  /**
   *
   */
  setSucccess() {
    const messages = [];
    for (let i in this.rawData) {
      if (typeof this.rawData[i] === "string") {
        messages.push(this.rawData[i]);
      }
    }
    this.data.data = this.rawData;
    this.data.messages = messages;
  }
}

module.exports = SuccessHandlerHelper;
