import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } from "discord.js"; // eslint-disable-line no-unused-vars
import { embedHandler } from "./embedHandler";

export const errorHandler = async (message: string, interaction: ChatInputCommandInteraction, editReply?: boolean, sendReply?: boolean): Promise<void> => {
    const issueReportingButton = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setLabel("Report the issue on github ->")
                .setURL("https://github.com/Sahil2004/TheCommander/issues/new")
                .setStyle(ButtonStyle.Link)
        );
    const errorEmbed = await embedHandler("Error", "Red", message, interaction);
    const replyType: boolean = editReply ?? true;
    const sendType: boolean = sendReply ?? false;
    const { channel } = interaction;
    if (channel === null) return;
    if (sendType) {
        await channel.send({ embeds: [errorEmbed], components: [issueReportingButton] });
        return;
    }
    if (replyType) {
        await interaction.editReply({ embeds: [errorEmbed], components: [issueReportingButton] });
    } else {
        await interaction.reply({ embeds: [errorEmbed], components: [issueReportingButton] });
    }
    return;
};