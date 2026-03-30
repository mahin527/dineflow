
import { MailtrapClient } from "mailtrap"
import { env } from "../../config/env";

const TOKEN = env.MAILTRAP_API_TOKEN;

const client = new MailtrapClient({
    token: TOKEN,
});

const sender = {
    email: "hello@demomailtrap.co",
    name: "🍴Dineflow 🍽️",
};

export { client, sender }
