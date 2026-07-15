require("dotenv").config();

const express = require("express");
const pool = require("./db");

const app = express();

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Task API</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Segoe UI', Arial, sans-serif;
                background: linear-gradient(135deg, #1e293b, #0f172a);
                color: #e2e8f0;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .card {
                background: #1e293b;
                border: 1px solid #334155;
                border-radius: 12px;
                padding: 40px 50px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            }
            h1 {
                font-size: 28px;
                margin-bottom: 8px;
            }
            p.subtitle {
                color: #94a3b8;
                margin-bottom: 24px;
            }
            .status {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: #064e3b;
                color: #6ee7b7;
                padding: 6px 14px;
                border-radius: 20px;
                font-size: 14px;
                margin-bottom: 24px;
            }
            .dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #34d399;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                text-align: left;
                margin-top: 10px;
            }
            th, td {
                padding: 8px 12px;
                font-size: 13px;
                border-bottom: 1px solid #334155;
            }
            th { color: #94a3b8; font-weight: 500; }
            td { color: #e2e8f0; }
            code {
                background: #0f172a;
                padding: 2px 6px;
                border-radius: 4px;
                color: #93c5fd;
            }
            footer {
                margin-top: 24px;
                font-size: 12px;
                color: #64748b;
            }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>Task Management API</h1>
            <p class="subtitle">Hello from Jignesh 👋</p>
            <div class="status"><span class="dot"></span> Server Running</div>
            <table>
                <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
                <tr><td>GET</td><td><code>/tasks</code></td><td>Get all tasks</td></tr>
                <tr><td>GET</td><td><code>/tasks/:id</code></td><td>Get single task</td></tr>
                <tr><td>POST</td><td><code>/tasks</code></td><td>Create task</td></tr>
                <tr><td>PUT</td><td><code>/tasks/:id</code></td><td>Update task</td></tr>
                <tr><td>PATCH</td><td><code>/tasks/:id</code></td><td>Update status</td></tr>
                <tr><td>DELETE</td><td><code>/tasks/:id</code></td><td>Delete task</td></tr>
            </table>
            <footer>Deployed via CI/CD • Node.js + Express + PostgreSQL</footer>
        </div>
    </body>
    </html>
    `);
});

// GET All Tasks
app.get("/tasks", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tasks ORDER BY id");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET Single Task
app.get("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "SELECT * FROM tasks WHERE id = $1",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST Create Task
app.post("/tasks", async (req, res) => {
    try {
        const { task_name, description, status } = req.body;
        const result = await pool.query(
            `INSERT INTO tasks (task_name, description, status, created_at)
             VALUES ($1, $2, $3, NOW())
             RETURNING *`,
            [task_name, description, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT Update Entire Task
app.put("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { task_name, description, status } = req.body;
        const result = await pool.query(
            `UPDATE tasks
             SET task_name = $1,
                 description = $2,
                 status = $3
             WHERE id = $4
             RETURNING *`,
            [task_name, description, status, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PATCH Update Status Only
app.patch("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const result = await pool.query(
            `UPDATE tasks
             SET status = $1
             WHERE id = $2
             RETURNING *`,
            [status, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE Task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({
            message: "Task deleted successfully",
            task: result.rows[0]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server is running on port 3000");
});