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
        ),

    new SlashCommandBuilder()
        .setName("su")
        .setDescription("Enter the root."),

    new SlashCommandBuilder()
        .setName("exit")
        .setDescription("Exit from root."),

    new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Mute a person.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Ping the user you want to be muted.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Enter the reason of muting.")
        ),

    new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("Unmute a user.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Ping the user you want to unmute.")
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName("purge")
        .setDescription("Purge messages in the current channel less than 100.")
        .addNumberOption(option =>
            option
                .setName("count")
                .setDescription("Enter the number of messages to be deleted less than 100.")
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a user.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Select the user you want to kick.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Enter the reason for kicking the user.")
        ),

    new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a user.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Select the user you want to ban.")
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Reverse your ban for a user.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Select the name of the user you want to unban.")
                .setRequired(true)
        )
].map(command => command.toJSON());

export const deployCommands = () => {
    const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
        .then(() => console.log("Successfully registered application commands."))
        .catch(console.error);
};