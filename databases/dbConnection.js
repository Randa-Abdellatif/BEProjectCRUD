import {createConnection} from "mysql2";
export const connection = createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"assignment_4",
}
)