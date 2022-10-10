import { ChatInputCommandInteraction, GuildMember, GuildMemberRoleManager } from "discord.js"; // eslint-disable-line no-unused-vars
import { Roles } from "../../schemas/Roles";
import { isSudoer, isSuperuser } from "../../utils/checkingPermissions";
import { errorHandler } from "../../utils/errorHandler";
import { RootCheckEmbed } from "../../utils/RootCheck";
import { successHandler } from "../../utils/successHandler";
import { misusedCommand } from "./misusedCommand";

export const unmute = async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const { guild } = interaction;
    const member = interaction.options.getMember("user") as GuildMember;
    if (member === null) {
        await errorHandler("Error: Entered user for unmute command is null.", interaction);
        return;
    }
    if (guild === null) {
        await errorHandler("Error: interaction.guild === null in unmute.ts", interaction);
        return;
    }
    if (await isSuperuser(interaction)) {
        const Server = await Roles.findOne({
            ServerId: guild.id
        });
        if (Server === null) {
            await errorHandler("Error: the server is not properly configured in our database. Try again after reusing /config. Else report the error.", interaction);
            return;
        }
        const mutedRoleId: string = await Server.mutedRole;
        const mutedRole = guild.roles.cache.find(role => role.id === mutedRoleId);
        if (mutedRole !== undefined) {
            await (member.roles as GuildMemberRoleManager).remove(mutedRole);
            await successHandler(`${member} is now unmuted.`, interaction);
            return;
        } else {
            await errorHandler("Error: Cannot find mute role in unmute.ts. Try running it again after using /config. Else report the error.", interaction);
            return;
        }
    } else if (await isSudoer(interaction)) {
        await RootCheckEmbed(interaction);
        return;
    } else {
        await misusedCommand(interaction);
        return;
    }
};