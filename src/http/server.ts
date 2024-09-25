import express from "express";
import authRouter from "../routes/authRoutes";
import itemRouter from "../routes/itemRoutes";
import shoppingListRouter from "../routes/shoppingListRoutes";
import categoryRouter from "../routes/categoryRoutes";
import swaggerUI from "swagger-ui-express";
import swaggerDocs from "../../swagger.json";
import { main } from "../config/database";

const app = express();
const port = 8080;

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/api/v1", authRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", itemRouter);
app.use("/api/v1", shoppingListRouter);

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.path} - Params: ${JSON.stringify(req.params)}`
  );
  next();
});

async function startServer() {
  try {
    await main().catch((err) => console.log(err));
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}
startServer();
