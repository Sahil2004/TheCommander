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
    REMOVE_WARNINGS,
    SLOWMODE,
    HELP,
    SUDO
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
        ),

    new SlashCommandBuilder()
        .setName(SLOWMODE)
        .setDescription("Set slowmode for a specific channel.")
        .addNumberOption(option =>
            option
                .setName("time")
                .setDescription("Time for which users will be restricted to send messages or creating new thread (IN SECONDS).")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Enter the reason for which you are enabling slowmode.")
        ),

    new SlashCommandBuilder()
        .setName(HELP)
        .setDescription("Get help for TheCommander bot.")
        .addStringOption(option =>
            option
                .setName("command")
                .setDescription("Select the command for which you want to know more.")
                .addChoices(
                    { name: CONFIG, value: CONFIG },
                    { name: ENTER_ROOT, value: ENTER_ROOT },
                    { name: EXIT_ROOT, value: EXIT_ROOT },
                    { name: SUDO, value: SUDO },
                    { name: MUTE, value: MUTE },
                    { name: UNMUTE, value: UNMUTE },
                    { name: PURGE, value: PURGE },
                    { name: KICK, value: KICK },
                    { name: BAN, value: BAN },
                    { name: UNBAN, value: UNBAN },
                    { name: WARN, value: WARN },
                    { name: SHOW_WARNINGS, value: SHOW_WARNINGS },
                    { name: REMOVE_WARNINGS, value: REMOVE_WARNINGS },
                    { name: SLOWMODE, value: SLOWMODE },
                    { name: HELP, value: HELP }
                )
        ),

    new SlashCommandBuilder()
        .setName(SUDO)
        .setDescription("Execute a command with elevated privledges without going into root.")
        .addSubcommand(subcommand =>
            subcommand
                .setName(MUTE)
                .setDescription("Mute a user.")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Enter the name of the user to be muted.")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName("reason")
                        .setDescription("Enter the reason for muting.")
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName(UNMUTE)
                .setDescription("Unmute a user")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Enter the user that has to be unmuted.")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName(PURGE)
                .setDescription("Delete the specified number of messages (less than 100).")
                .addNumberOption(option =>
                    option
                        .setName("count")
                        .setDescription("Enter the number of messages to be deleted (less than 100).")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName(KICK)
                .setDescription("Kick a user.")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Enter the user to be kicked.")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName("reason")
                        .setDescription("Reason for kicking.")
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName(BAN)
                .setDescription("Ban a user")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Enter the user to be banned.")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName(UNBAN)
                .setDescription("Unban a user.")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Enter the user to be unbanned.")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName(WARN)
                .setDescription("Warn a user.")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Enter the user to be warned.")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName("reason")
                        .setDescription("Enter the reason for warning.")
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName(SHOW_WARNINGS)
                .setDescription("Get all the warnings of a specified user.")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Enter the user whose warnings you want to see.")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName(REMOVE_WARNINGS)
                .setDescription("Remove a warning of a user.")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Enter the user whose warning has to be removed.")
                        .setRequired(true)
                )
                .addNumberOption(option =>
                    option
                        .setName("index")
                        .setDescription("Enter the index of the warning you want to remove.")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName(SLOWMODE)
                .setDescription("Set slowmode for a channel.")
                .addNumberOption(option =>
                    option
                        .setName("time")
                        .setDescription("Time for which users will be restricted to send messages or create new threads (IN SECONDS).")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName("reason")
                        .setDescription("Enter the reaosn for enabling slowmode.")
                )
        )
].map(command => command.toJSON());

export const deployCommands = () => {
    const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
        .then(() => console.log("Successfully registered application commands."))
        .catch(console.error);
};