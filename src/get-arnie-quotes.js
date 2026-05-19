const { httpGet } = require("./mock-http-interface");

/**
 * @param {GetArnieQuotesInput} urls
 * @returns {ArnieQuoteResponse}
 */
const getArnieQuotes = async (urls) => {
  const response = await Promise.all(
    urls.map(async (url) => {
      const res = await httpGet(url);

      return {
        status: res.status,
        message: JSON.parse(res.body).message,
      };
    }),
  );

  return response.map(({ status, message }) => ({
    [status === 200 ? "Arnie Quote" : "FAILURE"]: message,
  }));
};

module.exports = {
  getArnieQuotes,
};
