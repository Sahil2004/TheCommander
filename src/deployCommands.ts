import { REST, SlashCommandBuilder, Routes } from "discord.js";
import { CLIENT_ID, GUILD_ID, BOT_TOKEN } from "./config";
import { 
    CONFIG,
    ENTER_ROOT,
    EXIT_ROOT,
    MUTE,
    UNMUTE,
    PURGE,
    KICK,
    BAN,
    UNBAN,
    WARN,
    SHOW_WARNINGS,
    REMOVE_WARNINGS
} from "./constants/commandNames";

const commands = [
    new SlashCommandBuilder()
        .setName(CONFIG)
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
        .setName(ENTER_ROOT)
        .setDescription("Enter the root."),

    new SlashCommandBuilder()
        .setName(EXIT_ROOT)
        .setDescription("Exit from root."),

    new SlashCommandBuilder()
        .setName(MUTE)
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
        .setName(UNMUTE)
        .setDescription("Unmute a user.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Ping the user you want to unmute.")
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName(PURGE)
        .setDescription("Purge messages in the current channel less than 100.")
        .addNumberOption(option =>
            option
                .setName("count")
                .setDescription("Enter the number of messages to be deleted less than 100.")
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName(KICK)
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
        .setName(BAN)
        .setDescription("Ban a user.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Select the user you want to ban.")
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName(UNBAN)
        .setDescription("Reverse your ban for a user.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Select the name of the user you want to unban.")
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName(WARN)
        .setDescription("Warn a user.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Select the user you want to warn.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Enter the reason for warning the user.")
        ),

    new SlashCommandBuilder()
        .setName(SHOW_WARNINGS)
        .setDescription("Check warnings that have been issued to a user.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Enter the name of the user whose warnings you want to see.")
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName(REMOVE_WARNINGS)
        .setDescription("Remove a warning that was issued from a user.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Enter the user whose warning has to be removed.")
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName("index")
                .setDescription("Enter the index of the warning that you want to remove.")
                .setRequired(true)
        )
].map(command => command.toJSON());

export const deployCommands = () => {
    const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
        .then(() => console.log("Successfully registered application commands."))
        .catch(console.error);
};