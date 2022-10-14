import { ChatInputCommandInteraction } from "discord.js"; // eslint-disable-line no-unused-vars
import {
    BAN,
    CONFIG,
    ENTER_ROOT,
    EXIT_ROOT,
    KICK,
    MUTE,
    PURGE,
    REMOVE_WARNINGS,
    SHOW_WARNINGS,
    SLOWMODE,
    UNBAN,
    UNMUTE,
    WARN
} from "./../constants/commandNames";
import { configHandler } from "./utilityHandlers/config";
import { enterRoot } from "./moderationHandlers/su";
import { exitRoot } from "./moderationHandlers/exit";
import { mute } from "./moderationHandlers/mute";
import { unmute } from "./moderationHandlers/unmute";
import { purge } from "./utilityHandlers/purge";
import { kickHandler } from "./moderationHandlers/kick";
import { banHandler } from "./moderationHandlers/ban";
import { unbanHandler } from "./moderationHandlers/unban";
import { warnHandler } from "./moderationHandlers/warn";
import { showWarningsHandler } from "./utilityHandlers/showWarnings";
import { removeWarningsHandler } from "./moderationHandlers/removeWarnings";
import { slowmodeHandler } from "./moderationHandlers/slowmode";

export const HandleInteractions = (interaction: ChatInputCommandInteraction) => {
    const { commandName } = interaction;
    switch (commandName) {
        case CONFIG:
            configHandler(interaction);
            break;
        case ENTER_ROOT:
            enterRoot(interaction);
            break;
        case EXIT_ROOT:
            exitRoot(interaction);
            break;
        case MUTE:
            mute(interaction);
            break;
        case UNMUTE:
            unmute(interaction);
            break;
        case PURGE:
            purge(interaction);
            break;
        case KICK:
            kickHandler(interaction);
            break;
        case BAN:
            banHandler(interaction);
            break;
        case UNBAN:
            unbanHandler(interaction);
            break;
        case WARN:
            warnHandler(interaction);
            break;
        case SHOW_WARNINGS:
            showWarningsHandler(interaction);
            break;
        case REMOVE_WARNINGS:
            removeWarningsHandler(interaction);
            break;
        case SLOWMODE:
            slowmodeHandler(interaction);
            break;
        default:
            break;
    }
};