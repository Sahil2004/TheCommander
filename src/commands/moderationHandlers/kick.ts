import { ChatInputCommandInteraction, GuildMember } from "discord.js"; // eslint-disable-line no-unused-vars
import { isSudoer, isSuperuser } from "../../utils/checkingPermissions";
import { RootCheckEmbed } from "../../utils/RootCheck";
import { successHandler } from "../../utils/successHandler";
import { misusedCommand } from "./misusedCommand";

export const kickHandler = async (interaction: ChatInputCommandInteraction, perms?: boolean): Promise<void> => {
    await interaction.deferReply();
    const member = interaction.options.getMember("user") as GuildMember;
    const reason = interaction.options.getString("reason");
    const hasPerm = perms ?? false;
    if (await isSuperuser(interaction) === true || hasPerm === true) {
        await member.kick(reason ?? undefined);
        await successHandler(`${member} is kicked.\nReason: ${reason ?? "Not Specified."}`, interaction);
        return;
    } else if (await isSudoer(interaction)) {
        await RootCheckEmbed(interaction);
        return;
    } else {
        await misusedCommand(interaction);
        return;
    }
};