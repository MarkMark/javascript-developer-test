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
        key: res.status === 200 ? "Arnie Quote" : "FAILURE",
        message: JSON.parse(res.body).message,
      };
    }),
  );

  return response.map(({ key, message }) => ({
    [key]: message,
  }));
};

module.exports = {
  getArnieQuotes,
};
