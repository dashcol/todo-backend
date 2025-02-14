import app from "./index.js";
import connectToDB from "./src/config/config.js";

app.listen(3000, () => {
  connectToDB();
  console.log("Server at 3000");
});
