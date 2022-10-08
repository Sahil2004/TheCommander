import { ChatInputCommandInteraction, EmbedBuilder, TextChannel } from "discord.js"; // eslint-disable-line no-unused-vars
import { Roles } from "../../schemas/Roles";

export const misusedCommand = async (interaction: ChatInputCommandInteraction) => {
    try {
        // Creating the embed
        const misusedCommandEmbed: EmbedBuilder = new EmbedBuilder()
            .setColor("DarkRed")
            .setTitle("Misused Command")
            .setURL(`https://discordapp.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`)
            .setDescription(`The command ${interaction.commandName} was used by ${interaction.user} who doesn't have the appropriate permissions to use it. It was used on ${interaction.createdAt}.`)
            .setTimestamp();
        // Checking the mongoDB for logs channel
        const Server = await Roles.findOne({ ServerId: interaction.guild?.id });
        // Finding the appropriate channel
        const targetChannel: TextChannel = await interaction.guild?.channels.cache.find(channel => channel.id === Server?.logsChannel) as TextChannel;
        // Sending the embed
        if (targetChannel !== undefined) {
            targetChannel.send({ embeds: [misusedCommandEmbed] });
        } else {
            await interaction.editReply("The channel is undefined.");
            return;
        }
        // Replying to the command.
        await interaction.editReply("You do not have permissions to run this command. This incident will be reported.");
    } catch (err) {
        await interaction.editReply("You do not have permissions to run this command. This incident will be reported.");
        const channelDoesntExist: EmbedBuilder = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Error!")
            .setDescription("Logs channel doesn't exist. To Fix this issue, please rename/create a channel named 'the-commander-logs' or use /config to remake it.")
            .setTimestamp();
        interaction.channel?.send({ embeds: [channelDoesntExist] });
    }
};