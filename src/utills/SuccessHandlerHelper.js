/**
 * ErrorHandlerHelper Class - For managing errors
 */
class SuccessHandlerHelper {
  rawData;
  data = {
    code: 200,
    isError: false,
    timestamp: Date.now(),
    error: undefined,
    messages: [],
  };
  /**
   *
   * @param {*} data
   */
  constructor(data) {
    this.rawData = data;
    this.setSucccess();
  }
  /**
   *
   */
  setSucccess = () => {
    const messages = [];

    for (let i in this.rawData) {
      if (typeof this.rawData[i] === "string") {
        messages.push(this.rawData[i]);
      }
    }
    this.data.data = this.rawData;
    this.data.messages = messages;
  };
}

module.exports = SuccessHandlerHelper;
