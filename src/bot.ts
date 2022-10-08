import { Client, GatewayIntentBits } from "discord.js";
import { BOT_TOKEN, MONGO_URI } from "./config";
import { deployCommands } from "./deployCommands";
import { HandleInteractions } from "./commands";
import { connectionToMongoDB } from "./utils/connectionToMongo";

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessages
] });

client.once("ready", async () => {
    console.log("TheCommander is ready!");
    await connectionToMongoDB(MONGO_URI);
    await deployCommands();
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;
    HandleInteractions(interaction);
});

client.login(BOT_TOKEN);