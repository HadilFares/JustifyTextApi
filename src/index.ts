import { tokenRouter } from "./routes/auth-route";
import express from "express";
import cors from "cors";
import connectToDatabase from "./db-server";
import { justifyRouter } from "./routes/apijustify-route";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger";

export const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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
