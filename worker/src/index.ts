import { createClient } from "redis";

const client = createClient();

async function startServer() {
    try {
        await client.connect();
        while (1) {
            const response = await client.brPop("submissions", 0);
            console.log(response);
            // run the users code in a docker container

            // simulate running the users code for 1 sec
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("processed user's submission")
        }
        console.log("connected to redis");
    } catch (error) {
        console.error("failed to connect to redis", error);
    }
}

startServer();

