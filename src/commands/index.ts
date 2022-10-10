import { ChatInputCommandInteraction } from "discord.js"; // eslint-disable-line no-unused-vars
import {
    CONFIG,
    ENTER_ROOT,
    EXIT_ROOT,
    MUTE,
    PURGE,
    UNMUTE
} from "./../constants/commandNames";
import { configHandler } from "./utilityHandlers/config";
import { enterRoot } from "./moderationHandlers/su";
import { exitRoot } from "./moderationHandlers/exit";
import { mute } from "./moderationHandlers/mute";
import { unmute } from "./moderationHandlers/unmute";
import { purge } from "./utilityHandlers/purge";

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
        default:
            break;
    }
};