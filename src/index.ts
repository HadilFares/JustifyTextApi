import { tokenRouter } from "./routes/token-route";
import express from "express";
import cors from "cors";
import connectToDatabase from "./db-server";
import { justifyRouter } from "./routes/apijustify-route";

const app = express();
app.get("/user", (req, res) => {
  res.send("You are on user route!");
});
app.use(express.json());
app.use(express.text());
app.use(cors());
app.use("/api", tokenRouter);
app.use("/api", justifyRouter);
const PORT = Number(process.env.PORT) || 3000;
connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
