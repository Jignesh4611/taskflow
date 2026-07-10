require("dotenv").config();

const express = require("express");
const pool = require("./db");

const app = express();

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Hello from Jignesh");
});

// GET All Tasks
app.get("/tasks", async (req, res) => {
    try {
        console.log("hello1")
        const result1 = await pool.query("SELECT current_database()");
        console.log(result1.rows);
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