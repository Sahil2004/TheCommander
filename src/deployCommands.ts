import { REST, SlashCommandBuilder, Routes } from "discord.js";
import { CLIENT_ID, GUILD_ID, BOT_TOKEN } from "./config";

const commands = [
    new SlashCommandBuilder()
        .setName("config")
        .setDescription("Configure your server for moderation.")
        .addStringOption(option =>
            option
                .setName("superuser")
                .setDescription("Set name for a superuser role.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("sudoers")
                .setDescription("Set name for sudoers role.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("muted")
                .setDescription("Set name for muted role.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("logs")
                .setDescription("Set the name for logs channel.")
                .setRequired(true)
        )
].map(command => command.toJSON());

export const deployCommands = () => {
    const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
        .then(() => console.log("Successfully registered application commands."))
        .catch(console.error);
};