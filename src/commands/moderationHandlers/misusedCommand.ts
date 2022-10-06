import { ChatInputCommandInteraction, EmbedBuilder, TextChannel } from "discord.js";

export const misusedCommand = async (interaction: ChatInputCommandInteraction) => {
    try {
        const misusedCommandEmbed = new EmbedBuilder()
            .setColor("DarkRed")
            .setTitle("Misused Command")
            .setURL(`https://discordapp.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`)
            .setDescription(`The command ${interaction.commandName} was used by ${interaction.user} who doesn't have the appropriate permissions to use it. It was used on ${interaction.createdAt}.`)
            .setTimestamp();
        (interaction.guild?.channels.cache.find(channel => channel.name === "the-commander-logs") as TextChannel).send({embeds: [misusedCommandEmbed]});
        await interaction.editReply("You do not have permissions to run this command. This incident will be reported.");
    } catch (err) {
        await interaction.editReply(`You do not have permissions to run this command. This incident will be reported.Logs channel doesn't exist. To fix the issue, please rename/create a channel named 'the-commander-logs'.`);
        const channelDoesntExist = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Error!")
            .setDescription("Logs channel doesn't exist. To Fix this issue, please rename/create a channel named 'the-commander-logs'.")
            .setTimestamp();
        interaction.channel?.send({embeds: [channelDoesntExist]});
    }
}