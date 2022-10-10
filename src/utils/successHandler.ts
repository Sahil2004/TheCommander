import { ChatInputCommandInteraction, EmbedBuilder, TextChannel } from "discord.js"; // eslint-disable-line no-unused-vars
import { Roles } from "../schemas/Roles";
import { embedHandler } from "./embedHandler";
import { errorHandler } from "./errorHandler";

export const successHandler = async (message: string, interaction: ChatInputCommandInteraction, editReply?: boolean, sendReply?: boolean): Promise<void> => {
    const successEmbed: EmbedBuilder = await embedHandler("Success", "Green", message, interaction);
    const successEmbedLogs: EmbedBuilder = await embedHandler("Command Ran", "Blue", `'${interaction.commandName}' command ran by ${interaction.user}\nOutput: ${message}`, interaction);
    const replyType: boolean = editReply ?? true;
    const sendType: boolean = sendReply ?? false;
    const { guild } = interaction;
    const { channel } = interaction;
    if (channel === null) return;
    if (guild === null) return;
    const Server = await Roles.findOne({
        ServerId: guild.id
    });
    if (Server === null) {
        await errorHandler("Error: Server === null in successhandler.ts.", interaction, replyType, sendType);
        return;
    }
    const logsChannelId: string = await Server?.logsChannel;
    const logsChannel = guild.channels.cache.find(oneChannel => oneChannel.id === logsChannelId) as TextChannel;
    if (logsChannel === undefined) {
        await errorHandler("Logs channel is undefined in successHandler.ts. To fix this, try rerunning this command after using /config. If the issue still persists, raise an issue.", interaction, replyType, sendType);
        return;
    }
    await logsChannel.send({ embeds: [successEmbedLogs] });
    if (sendType) {
        await channel.send({ embeds: [successEmbed] });
        return;
    }
    if (replyType) {
        await interaction.editReply({ embeds: [successEmbed] });
    } else {
        await interaction.reply({ embeds: [successEmbed] });
    }
    return;
};