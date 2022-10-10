import { ChatInputCommandInteraction, GuildMember, GuildMemberRoleManager } from "discord.js"; // eslint-disable-line no-unused-vars
import { Roles } from "../../schemas/Roles";
import { isSudoer, isSuperuser } from "../../utils/checkingPermissions";
import { errorHandler } from "../../utils/errorHandler";
import { RootCheckEmbed } from "../../utils/RootCheck";
import { successHandler } from "../../utils/successHandler";
import { misusedCommand } from "./misusedCommand";

export const mute = async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const { guild } = interaction;
    const member: GuildMember = interaction.options.getMember("user") as GuildMember;
    const reason: string = interaction.options.getString("reason") ?? "Not Specified";
    if (member === null) {
        await errorHandler("Error: Entered user for mute command is null.", interaction);
        return;
    }
    if (guild === null) {
        await errorHandler("Error: interaction.guild === null in mute.ts", interaction);
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
            await (member.roles as GuildMemberRoleManager).add(mutedRole);
            await successHandler(`${member} is muted. They can only view the channel and not respond in those now.\nReason: ${reason}`, interaction);
            return;
        } else {
            await errorHandler("Error: Cannot find muted role in mute.ts. Try running it again after using /config. Else report the error.", interaction);
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