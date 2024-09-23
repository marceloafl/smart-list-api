import express from "express";
import itemRouter from "../routes/itemRoutes";
import shoppingListRouter from "../routes/shoppingListRoutes";
import categoryRouter from "../routes/categoryRoutes";
import swaggerUI from "swagger-ui-express";
import swaggerDocs from "../../swagger.json";

const app = express();
const port = 8080;

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/v1", itemRouter);
app.use("/v1", shoppingListRouter);
app.use("/v1", categoryRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
