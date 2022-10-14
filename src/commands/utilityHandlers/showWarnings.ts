import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js"; // eslint-disable-line no-unused-vars
import { Warns } from "../../schemas/Warns";
import { isSudoer, isSuperuser } from "../../utils/checkingPermissions";
import { embedHandler } from "../../utils/embedHandler";
import { errorHandler } from "../../utils/errorHandler";
import { RootCheckEmbed } from "../../utils/RootCheck";
import { successHandler } from "../../utils/successHandler";
import { misusedCommand } from "../moderationHandlers/misusedCommand";

export const showWarningsHandler = async (interaction: ChatInputCommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const { guild } = interaction;
    const user = interaction.options.getUser("user");
    if (guild === null) {
        await errorHandler("Error: Guild is null in showWarnings.ts.", interaction);
        return;
    }
    if (user === null) {
        await errorHandler("Error: User mentioned in the command is null in showWarnings.ts.", interaction);
        return;
    }
    if (await isSuperuser(interaction)) {
        const warnsDB = await Warns.find({
            ServerId: guild.id,
            User: user.id
        });
        if (warnsDB.length === 0) {
            await successHandler("There are no warnings given to this user.", interaction);
            return;
        }
        let warningsData = "";
        for (let [index, warning] of warnsDB.entries()) {
            warningsData += `\n${index + 1}. ${warning.Reason}`;
        }
        await successHandler(`Here are the warnings given to the user:${warningsData}`, interaction);
    } else if (await isSudoer(interaction)) {
        await RootCheckEmbed(interaction);
    } else {
        await misusedCommand(interaction);
    }
    return;
};