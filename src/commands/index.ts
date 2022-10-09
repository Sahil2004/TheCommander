import { ChatInputCommandInteraction } from "discord.js"; // eslint-disable-line no-unused-vars
import {
    CONFIG,
    ENTER_ROOT,
    EXIT_ROOT
} from "./../constants/commandNames";
import { configHandler } from "./utilityHandlers/config";
import { enterRoot } from "./moderationHandlers/su";
import { exitRoot } from "./moderationHandlers/exit";

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
        default:
            break;
    }
};