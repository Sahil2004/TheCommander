import { ChatInputCommandInteraction } from "discord.js";
import {
    CONFIG
} from "./../constants/commandNames";
import { configHandler } from "./utilityHandlers/config";

export const HandleInteractions = (interaction: ChatInputCommandInteraction) => {
    const { commandName } = interaction;
    switch (commandName) {
        case CONFIG:
            configHandler(interaction);
            break;
        default:
            break;
    }
};