import { ChatInputCommandInteraction, GuildMemberRoleManager } from "discord.js"; // eslint-disable-line no-unused-vars
import { Roles } from "../schemas/Roles";

export const isSudoer = async (interaction: ChatInputCommandInteraction): Promise<boolean> => {
    const { guild, member } = interaction;
    if (!guild || !member) return false;
    // Getting the roles collection from mongoDB
    const Server = await Roles.findOne({
        ServerId: guild.id
    });
    if (!Server) return false;
    // Checking if member has sudoers role
    const hasSudoers = await (member.roles as GuildMemberRoleManager).cache.find(role => role.id === Server.sudoersRole);
    // Returning accordingly
    if (hasSudoers) {
        return true;
    } else {
        return false;
    }
};

export const isSuperuser = async (interaction: ChatInputCommandInteraction): Promise<boolean> => {
    const { guild, member } = interaction;
    if (!guild || !member) return false;
    // Getting the roles collection from mongoDB
    const Server = await Roles.findOne({
        ServerId: guild.id
    });
    if (!Server) return false;
    // Checking if member has Superuser role
    const hasSuperuser = await (member.roles as GuildMemberRoleManager).cache.find(role => role.id === Server.superUserRole);
    // Returning accordingly
    if (hasSuperuser) {
        return true;
    } else {
        return false;
    }
};