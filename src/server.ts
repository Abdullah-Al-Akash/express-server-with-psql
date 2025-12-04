import express, { Request, Response } from "express";
import { Pool } from "pg";
const app = express();
const port = 5000;

// Body Parser:
app.use(express.json());

// DB:
const pool = new Pool({
  connectionString: `postgresql://neondb_owner:npg_1PTLc3IVbEzw@ep-icy-block-a499h16n-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`,
});

const initDB = async() => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT NOT NULL,
    phone VARCHAR(14),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )`)
}
initDB()

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next Level Developer!");
});

// Post Method:
app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(201).json({ message: "Test Method!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
