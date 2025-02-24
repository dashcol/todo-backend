import app from "./index.js";
import connectToDB from "./src/config/config.js";

app.listen(3000, () => {
  connectToDB();
  console.log("server at 3000");
});
