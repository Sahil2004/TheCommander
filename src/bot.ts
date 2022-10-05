import { Client, GatewayIntentBits } from "discord.js";
import { BOT_TOKEN } from "./config";
import { deployCommands } from "./deployCommands";
import { HandleInteractions } from "./commands";

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessages
] });

client.once("ready", () => {
    console.log("TheCommander is ready!");
});

deployCommands();

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;
    HandleInteractions(interaction);
});

client.login(BOT_TOKEN);