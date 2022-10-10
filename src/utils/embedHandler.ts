import { ChatInputCommandInteraction, ColorResolvable, EmbedBuilder } from "discord.js"; // eslint-disable-line no-unused-vars

export const embedHandler = async (title: string, color: ColorResolvable, message: string, interaction: ChatInputCommandInteraction, setTimestamp?: boolean, url?: string): Promise<EmbedBuilder> => {
    const timestampCheck: boolean = setTimestamp ?? false;
    if (timestampCheck) {
        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(title)
            .setURL(url ?? `https://discordapp.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`)
            .setDescription(message)
            .setTimestamp();
        return embed;
    } else {
        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(title)
            .setURL(url ?? `https://discordapp.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id}`)
            .setDescription(message);
        return embed;
    }
};