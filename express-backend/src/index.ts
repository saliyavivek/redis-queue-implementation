import express from "express";
import { createClient } from "redis";

const client = createClient();
const app = express();

app.use(express.json());

app.post("/submit", async (req, res) => {
    const { problemId, userId, code, lang } = req.body;

    // push it to db
    try {
        await client.lPush("submissions", JSON.stringify({ problemId, userId, code, lang }));
        res.json({
            message: "submission received."
        })
    } catch (error) {
        res.json({
            message: "submission failed."
        })
    }
})

async function startServer() {
    try {
        await client.connect();
        console.log("connected to redis");

        app.listen(3000, () => console.log("server listening to port 3000"));
    } catch (error) {
        console.error("failed to connect to redis", error);
    }
}

startServer();