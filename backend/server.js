import app from "./app.js";
import { connectDB } from "./config/db.js";

const port = 3000;

app.listen(port, async (err) => {
  if (err) {
    console.log(`server failed with error: ${err}`);
  } else {
    await connectDB();
    console.log(`Server is running on ${port}`);
  }
});
