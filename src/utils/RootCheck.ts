import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js"; // eslint-disable-line no-unused-vars
import { embedHandler } from "./embedHandler";

export const RootCheckEmbed = async (interaction: ChatInputCommandInteraction, editReply?: boolean): Promise<void> => {
    const rootCheckEmbed: EmbedBuilder = await embedHandler("Error", "Red", "You need to be in root to perform this operation.", interaction);
    const replyType: boolean = editReply ?? true;
    if (replyType) {
        interaction.editReply({ embeds: [rootCheckEmbed] });
    } else {
        interaction.reply({ embeds: [rootCheckEmbed] });
    }
};