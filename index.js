import cors from "cors"
import express from "express";
import bootstap from "./src/index.router.js";

const app = express();
const port = 5000;

import mysql from "mysql2";
export const connection = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"assignment_4",
}
)


app.use(cors());
bootstap(app,express);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

//   module.exports = {connection}