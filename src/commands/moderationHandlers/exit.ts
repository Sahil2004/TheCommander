import { ChatInputCommandInteraction, GuildMemberRoleManager } from "discord.js"; // eslint-disable-line no-unused-vars
import { Roles } from "../../schemas/Roles";
import { isSudoer, isSuperuser } from "../../utils/checkingPermissions";
import { errorHandler } from "../../utils/errorHandler";
import { misusedCommand } from "./misusedCommand";

export const exitRoot = async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const { member, guild } = interaction;
    if (member === null) {
        await errorHandler("Error: interaction.member === null in exit.ts", interaction, true);
        return;
    }
    if (guild === null) {
        await errorHandler("Error: interaction.guild === null in exit.ts", interaction, true);
        return;
    }
    if (await isSuperuser(interaction)) {
        const Server = await Roles.findOne({
            ServerId: guild.id
        });
        if (Server === null) {
            await errorHandler("Error: the server is not properly configured in our database. Try again after reusing /config. Else report the error.", interaction, true);
            return;
        }
        const superuserRoleId: string = await Server.superUserRole;
        const superuserRole = guild.roles.cache.find(role => role.id === superuserRoleId);
        if (superuserRole !== undefined) {
            await (member.roles as GuildMemberRoleManager).remove(superuserRole);
            interaction.editReply("You have left root!");
        } else {
            await errorHandler("Error: Cannot find superuser role in exit.ts. Try running it again after using /config. Else report the error.", interaction, true);
            return;
        }
    } else if (await isSudoer(interaction)) {
        await interaction.editReply("You are already out of root.");
        return;
    } else {
        await misusedCommand(interaction);
        return;
    }
};