import { ChatInputCommandInteraction } from "discord.js"; // eslint-disable-line no-unused-vars
import {
    BAN,
    KICK,
    MUTE,
    PURGE,
    REMOVE_WARNINGS,
    SHOW_WARNINGS,
    SLOWMODE,
    UNBAN,
    UNMUTE,
    WARN
} from "./../../constants/commandNames";
import { mute } from "./mute";
import { unmute } from "./unmute";
import { purge } from "./../utilityHandlers/purge";
import { kickHandler } from "./kick";
import { banHandler } from "./ban";
import { unbanHandler } from "./unban";
import { warnHandler } from "./warn";
import { showWarningsHandler } from "./../utilityHandlers/showWarnings";
import { removeWarningsHandler } from "./removeWarnings";
import { slowmodeHandler } from "./slowmode";
import { isSudoer } from "../../utils/checkingPermissions";
import { misusedCommand } from "./misusedCommand";

export const sudoHandler = async (interaction: ChatInputCommandInteraction): Promise<void> => {
    if (await isSudoer(interaction)) {
        switch (interaction.options.getSubcommand()) {
            case MUTE:
                mute(interaction, true);
                break;
            case UNMUTE:
                unmute(interaction, true);
                break;
            case PURGE:
                purge(interaction, true);
                break;
            case KICK:
                kickHandler(interaction, true);
                break;
            case BAN:
                banHandler(interaction, true);
                break;
            case UNBAN:
                unbanHandler(interaction, true);
                break;
            case WARN:
                warnHandler(interaction, true);
                break;
            case SHOW_WARNINGS:
                showWarningsHandler(interaction, true);
                break;
            case REMOVE_WARNINGS:
                removeWarningsHandler(interaction, true);
                break;
            case SLOWMODE:
                slowmodeHandler(interaction, true);
                break;
            default:
                break;
        }
        return;
    } else {
        await interaction.deferReply();
        await misusedCommand(interaction);
        return;
    }
};