import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } from "discord.js"; // eslint-disable-line no-unused-vars

export const errorHandler = async (message: string, interaction: ChatInputCommandInteraction, editReply: boolean): Promise<void> => {
    const issueReportingButton = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setLabel("Report the issue on github ->")
                .setURL("https://github.com/Sahil2004/TheCommander/issues/new")
                .setStyle(ButtonStyle.Link)
        );
    const errorEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Error")
        .setURL(`https://discordapp.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`)
        .setDescription(message);
    if (editReply) {
        await interaction.editReply({ embeds: [errorEmbed], components: [issueReportingButton] });
    } else if (!editReply) {
        await interaction.reply({ embeds: [errorEmbed], components: [issueReportingButton] });
    }
    return;
};