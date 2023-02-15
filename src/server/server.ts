import * as path from "path";
import * as express from "express";
import { Express } from "express";
import * as bodyParser from "body-parser";
import * as methodOverride from "method-override";
import * as dotEnv from "dotenv";
import userRoute from "./routes/user.route";

dotEnv.config();

const server: Express = express();
server.use(methodOverride("_method"));
server.use(express.json());
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, "./public")));

server.use("/api/v1/users", userRoute);

export default server;
