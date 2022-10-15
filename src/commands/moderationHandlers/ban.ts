import { ChatInputCommandInteraction, GuildMember } from "discord.js"; // eslint-disable-line no-unused-vars
import { isSudoer, isSuperuser } from "../../utils/checkingPermissions";
import { RootCheckEmbed } from "../../utils/RootCheck";
import { successHandler } from "../../utils/successHandler";
import { misusedCommand } from "./misusedCommand";

export const banHandler = async (interaction: ChatInputCommandInteraction, perms?: boolean): Promise<void> => {
    await interaction.deferReply();
    const member = interaction.options.getMember("user") as GuildMember;
    const hasPerm = perms ?? false;
    if (await isSuperuser(interaction) === true || hasPerm === true) {
        await member.ban();
        await successHandler(`${member} is banned.`, interaction);
        return;
    } else if (await isSudoer(interaction)) {
        await RootCheckEmbed(interaction);
        return;
    } else {
        await misusedCommand(interaction);
        return;
    }
};