import { ChatInputCommandInteraction, User } from "discord.js"; // eslint-disable-line no-unused-vars
import { isSudoer, isSuperuser } from "../../utils/checkingPermissions";
import { errorHandler } from "../../utils/errorHandler";
import { RootCheckEmbed } from "../../utils/RootCheck";
import { successHandler } from "../../utils/successHandler";
import { misusedCommand } from "./misusedCommand";

export const unbanHandler = async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const user: User | null = interaction.options.getUser("user");
    const { guild } = interaction;
    if (guild === null) {
        await errorHandler("Error: Guild is null in unban.ts.", interaction);
        return;
    }
    if (user === null) {
        await errorHandler("Error: User you gave as the option is null in unban.ts.", interaction);
        return;
    }
    if (await isSuperuser(interaction)) {
        await guild.members.unban(user);
        await successHandler(`${user} has been unbanned.`, interaction);
        return;
    } else if (await isSudoer(interaction)) {
        await RootCheckEmbed(interaction);
        return;
    } else {
        await misusedCommand(interaction);
        return;
    }
};