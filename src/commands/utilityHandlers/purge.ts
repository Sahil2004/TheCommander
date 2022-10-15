import { ChannelType, ChatInputCommandInteraction } from "discord.js"; // eslint-disable-line no-unused-vars
import { isSudoer, isSuperuser } from "../../utils/checkingPermissions";
import { errorHandler } from "../../utils/errorHandler";
import { RootCheckEmbed } from "../../utils/RootCheck";
import { successHandler } from "../../utils/successHandler";
import { misusedCommand } from "../moderationHandlers/misusedCommand";

export const purge = async (interaction: ChatInputCommandInteraction, perms?: boolean): Promise<void> => {
    await interaction.deferReply();
    const { channel, guild } = interaction;
    const hasPerm = perms ?? false;
    if (channel === null) {
        await errorHandler("interaction.channel === null in purge.ts.", interaction);
        return;
    }
    if (guild === null) {
        await errorHandler("interaction.guild === null in purge.ts.", interaction);
        return;
    }
    if (channel.type === ChannelType.DM) {
        await errorHandler("Error: This operation can not be performed in DMs.", interaction);
        return;
    }
    const count: number = interaction.options.getNumber("count") ?? 0;
    if (count <= 0 || count > 100) {
        await errorHandler("Enter a valid number of messages to delete between 0 to 100 (0 excluded but 100 included)", interaction);
        return;
    }
    if (await isSuperuser(interaction) === true || hasPerm === true) {
        try {
            await channel.bulkDelete(count, true);
            await successHandler(`Deleted ${count} messages in this channel. But those messages will be visible in the logs channel.`, interaction, true, true);
            return;
        } catch (err) {
            await errorHandler("Error: Unable to bulk delete messages.", interaction);
            return;
        }
    } else if (await isSudoer(interaction)) {
        await RootCheckEmbed(interaction);
        return;
    } else {
        await misusedCommand(interaction);
        return;
    }
};