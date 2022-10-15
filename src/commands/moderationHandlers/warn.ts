import { ChatInputCommandInteraction } from "discord.js"; // eslint-disable-line no-unused-vars
import { Warns } from "../../schemas/Warns";
import { isSudoer, isSuperuser } from "../../utils/checkingPermissions";
import { errorHandler } from "../../utils/errorHandler";
import { RootCheckEmbed } from "../../utils/RootCheck";
import { successHandler } from "../../utils/successHandler";
import { misusedCommand } from "./misusedCommand";

export const warnHandler = async (interaction: ChatInputCommandInteraction, perms?: boolean): Promise<void> => {
    await interaction.deferReply();
    const { guild } = interaction;
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") ?? "Not Specified";
    const hasPerm = perms ?? false;
    if (guild === null) {
        await errorHandler("Error: Guild is null in warn.ts.", interaction);
        return;
    }
    if (user === null) {
        await errorHandler("Error: The entered user is null in warn.ts.", interaction);
        return;
    }
    if (await isSuperuser(interaction) === true || hasPerm === true) {
        await Warns.create({
            ServerId: guild.id,
            User: user.id,
            Reason: reason
        });
        await successHandler(`${user} is warned.\nReason: ${reason}`, interaction);
    } else if (await isSudoer(interaction)) {
        await RootCheckEmbed(interaction);
    } else {
        await misusedCommand(interaction);
    }
    await successHandler(`${user} is warned.\nReason: ${reason}`, interaction);
    return;
};