import dotenv from "dotenv";
dotenv.config();
import {
    Client
} from 'pg';
const client = new Client();

(async()=>{
    await client.connect();
})();

export {client}