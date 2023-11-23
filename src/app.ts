import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./app/modules/users/users.routes";
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use("/api/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
