import ApplicationError from "../../errors/errors.js";

export default class weatherController {
  async weather(req, res, next) {
    const { city } = req.query;
    console.log(city);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${
          process.env.API_KEY
        }&q=${city}&timestamp=${Date.now()}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error.message}`);
      }

      if (!city || typeof city !== "string") {
        throw new ApplicationError("Invalid city parameter", 400);
      }
      if (response.ok) {
        const data = await response.json();

        res.status(200).json(data);
      }
    } catch (error) {
      next(new ApplicationError(error.message, 500));
    }
  }
}
