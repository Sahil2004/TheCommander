import { ChatInputCommandInteraction, EmbedBuilder, TextChannel } from "discord.js"; // eslint-disable-line no-unused-vars
import { Roles } from "../../schemas/Roles";
import { embedHandler } from "../../utils/embedHandler";
import { errorHandler } from "../../utils/errorHandler";

export const misusedCommand = async (interaction: ChatInputCommandInteraction): Promise<void> => {
    try {
        // Creating the embed
        const misusedCommandEmbedForLogsChannel: EmbedBuilder = await embedHandler("Misused Command", "DarkRed", `The command ${interaction.commandName} was used by ${interaction.user} who doesn't have the appropriate permissions to use it. It was used on ${interaction.createdAt}.`, interaction, true);
        const misusedCommandEmbed: EmbedBuilder = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Misused Command")
            .setURL(`http://discordapp.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`)
            .setDescription("You do not have permission to use this command. This incident will be reported.")
            .setTimestamp();
        // Checking the mongoDB for logs channel
        const Server = await Roles.findOne({ ServerId: interaction.guild?.id });
        // Finding the appropriate channel
        const targetChannel: TextChannel = await interaction.guild?.channels.cache.find(channel => channel.id === Server?.logsChannel) as TextChannel;
        // Sending the embed
        if (targetChannel !== undefined) {
            await targetChannel.send({ embeds: [misusedCommandEmbedForLogsChannel] });
        } else {
            await errorHandler("Logs channel is undefined. Rerun this command after configuring your server again with /config. If still the issue persists, raise an issue.", interaction);
            return;
        }
        // Replying to the command.
        await interaction.editReply({ embeds: [misusedCommandEmbed] });
        return;
    } catch (err) {
        await interaction.editReply("You do not have permissions to run this command. This incident will be reported.");
        await errorHandler("Logs channel doesn't exist. To fix this issue, please rename/create a channel named 'the-commander-logs' or use /config to remake it. If the issue still persists, raise an issue with us.", interaction);
        return;
    }
};