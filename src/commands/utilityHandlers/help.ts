import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js"; // eslint-disable-line no-unused-vars
import { embedHandler } from "../../utils/embedHandler";
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
} from "../../constants/commandNames";
import { errorHandler } from "../../utils/errorHandler";

export const helpHandler = async (interaction: ChatInputCommandInteraction): Promise<void> => {
    // ephermeral enabled to reduce spam.
    await interaction.deferReply({
        ephemeral: true
    });
    const command = await interaction.options.getString("command");
    interface command {
        name: string,
        desc: string,
        flags: {
            name: string,
            desc: string,
            required: boolean
        }[]
    }
    const commands: command[] = [
        {
            name: CONFIG,
            desc: "Creates roles and channels for bot to function.",
            flags: [
                {
                    name: "superuser",
                    desc: "Sets the name for superuser role.",
                    required: true
                },
                {
                    name: "sudoers",
                    desc: "Sets the name for sudoers role.",
                    required: true
                },
                {
                    name: "muted",
                    desc: "Sets the name for muted role.",
                    required: true
                },
                {
                    name: "logs",
                    desc: "Sets the name for logs channel.",
                    required: true
                }
            ]
        },
        {
            name: ENTER_ROOT,
            desc: "Gives sudoers superuser role.",
            flags: []
        },
        {
            name: EXIT_ROOT,
            desc: "Removes superuser role from sudoers.",
            flags: []
        },
        {
            name: SUDO,
            desc: "Run a command with elevated privledges without going into root.",
            flags: [
                {
                    name: "command name",
                    desc: "The command you want to run.",
                    required: true
                },
                {
                    name: "args",
                    desc: "The arguments that need to be given the specific command.",
                    required: false
                }
            ]
        },
        {
            name: MUTE,
            desc: "Gives the user specified a muted role.",
            flags: [
                {
                    name: "user",
                    desc: "The user which has to be muted.",
                    required: true
                },
                {
                    name: "reason",
                    desc: "Reason for muting.",
                    required: false
                }
            ]
        },
        {
            name: UNMUTE,
            desc: "Unmutes the specified user.",
            flags: [
                {
                    name: "user",
                    desc: "The user which has to be unmuted.",
                    required: true
                }
            ]
        },
        {
            name: PURGE,
            desc: "Delete the specified number of messages.",
            flags: [
                {
                    name: "count",
                    desc: "The number of messages that have to deleted (less than 100).",
                    required: true
                }
            ]
        },
        {
            name: KICK,
            desc: "Kick the specified user",
            flags: [
                {
                    name: "user",
                    desc: "The user that has to be kicked.",
                    required: true
                },
                {
                    name: "reason",
                    desc: "The reason for kicking.",
                    required: false
                }
            ]
        },
        {
            name: BAN,
            desc: "Ban the specified user.",
            flags: [
                {
                    name: "user",
                    desc: "The user that has to be banned.",
                    required: true
                }
            ]
        },
        {
            name: UNBAN,
            desc: "Unban the specified user.",
            flags: [
                {
                    name: "user",
                    desc: "The user that has to be unbanned.",
                    required: true
                }
            ]
        },
        {
            name: WARN,
            desc: "Warn the specified user.",
            flags: [
                {
                    name: "user",
                    desc: "The user to be warned.",
                    required: true
                },
                {
                    name: "reason",
                    desc: "The reason to be warned.",
                    required: false
                }
            ]
        },
        {
            name: SHOW_WARNINGS,
            desc: "Show the total warnings of the specified user.",
            flags: [
                {
                    name: "user",
                    desc: "The user whose warnings has to be shown.",
                    required: true
                }
            ]
        },
        {
            name: REMOVE_WARNINGS,
            desc: "Remove a warning of the specified user.",
            flags: [
                {
                    name: "user",
                    desc: "The user whose warning has to be removed.",
                    required: true
                },
                {
                    name: "index",
                    desc: `Use /${SHOW_WARNINGS} first. The index number of the warning to be removed, needs to be mentioned.`,
                    required: true
                }
            ]
        },
        {
            name: SLOWMODE,
            desc: "Set slowmode on a channel.",
            flags: [
                {
                    name: "time",
                    desc: "Time for which users will be restricted to send messages or creating new threads (IN SECONDS < 21600, i.e., 6 hours)",
                    required: true
                },
                {
                    name: "reason",
                    desc: "Reason for setting a slowmode.",
                    required: false
                }
            ]
        }
    ];
    if (command === null) {
        let commandString: string = "";
        for (const cmd of commands) {
            commandString += `\n**/${cmd.name}**\nDescription: ${cmd.desc}\n`;
        }
        const helpEmbed: EmbedBuilder = await embedHandler(
            "HELP",
            "Green",
            "TheCommander is a discord moderation bot with a lot of features and very little configuration. It was made to ease the moderation of a server with linux like commands. Also it reflects my love for linux.\nBasically, everyone will have a normal looking role so that people behave normally without the fear of someone moderating them. When moderation is needed, a mod can do his stuff whenever needed by elevating his permissions by entering root.\n\nTo get help with a specific command, use `/" + HELP + " <command>`\n\nExample: `/" + HELP + " " + KICK + "`\n\n**Commands:**\n" + commandString, interaction
        );
        await interaction.editReply({ embeds: [helpEmbed] });
        return;
    } else {
        const cmd: command | undefined = commands.find((commandName: command): boolean => commandName.name === command);
        if (cmd === undefined) {
            await errorHandler("Error: Command name specified in help command is undefined.", interaction);
            return;
        }
        const helpCommandEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle(`/${cmd.name}`)
            .setColor("Green")
            .setDescription(cmd.desc);
        cmd.flags.forEach(flag => helpCommandEmbed.addFields({ name: flag.name, value: `${(flag.required === true) ? "REQUIRED" : "OPTIONAL"} ${flag.desc}` }));
        await interaction.editReply({ embeds: [helpCommandEmbed] });
        return;
    }
};