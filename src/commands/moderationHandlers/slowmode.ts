import { ChatInputCommandInteraction, TextChannel } from "discord.js"; // eslint-disable-line no-unused-vars
import { isSudoer, isSuperuser } from "../../utils/checkingPermissions";
import { errorHandler } from "../../utils/errorHandler";
import { RootCheckEmbed } from "../../utils/RootCheck";
import { successHandler } from "../../utils/successHandler";
import { misusedCommand } from "./misusedCommand";

export const slowmodeHandler = async (interaction: ChatInputCommandInteraction, perms?: boolean): Promise<any> => {
    await interaction.deferReply();
    const { channel } = interaction;
    const time = interaction.options.getNumber("time");
    const reason = interaction.options.getString("reason") ?? "Not specified.";
    const hasPerm = perms ?? false;
    if (time === null) {
        await errorHandler("Error: time entered is null in slowmode.ts.", interaction);
        return;
    }
    if (time > 21600) {
        await errorHandler("Error: The time in seconds can't be greater than 21600 seconds in slowmode.ts.", interaction);
        return;
    }
    if (channel === null) {
        await errorHandler("Error: Channel is null in slowmode.ts.", interaction);
        return;
    }
    if (await isSuperuser(interaction) === true || hasPerm === true) {
        await (channel as TextChannel).setRateLimitPerUser(time, reason);
        if (time === 0) {
            await successHandler(`Slowmode is now removed in ${channel}\nReason: ${reason}`, interaction);
            return;
        }
        await successHandler(`Slowmode is now active on ${channel} with time ${time}\nReason: ${reason}`, interaction);
        return;
    } else if (await isSudoer(interaction)) {
        await RootCheckEmbed(interaction);
        return;
    } else {
        await misusedCommand(interaction);
        return;
    }
};