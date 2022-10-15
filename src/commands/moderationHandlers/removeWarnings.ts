import { ChatInputCommandInteraction } from "discord.js"; // eslint-disable-line no-unused-vars
import { REMOVE_WARNINGS } from "../../constants/commandNames";
import { Warns } from "../../schemas/Warns";
import { isSudoer, isSuperuser } from "../../utils/checkingPermissions";
import { errorHandler } from "../../utils/errorHandler";
import { RootCheckEmbed } from "../../utils/RootCheck";
import { successHandler } from "../../utils/successHandler";
import { misusedCommand } from "./misusedCommand";

export const removeWarningsHandler = async (interaction: ChatInputCommandInteraction, perms?: boolean): Promise<void> => {
    await interaction.deferReply();
    const { guild } = interaction;
    const user = interaction.options.getUser("user");
    const index = interaction.options.getNumber("index");
    const hasPerm = perms ?? false;
    if (guild === null) {
        await errorHandler("Error: Guild is null in removeWarnings.ts.", interaction);
        return;
    }
    if (user === null) {
        await errorHandler("Error: User mentioned in the command is null in removeWarnings.ts.", interaction);
        return;
    }
    if (index === null) {
        await errorHandler("Error: index entered is null in removeWarnings.ts.", interaction);
        return;
    }
    if (await isSuperuser(interaction) === true || hasPerm === true) {
        const warnsDB = await Warns.find({
            ServerId: guild.id,
            User: user.id
        });
        if (warnsDB.length === 0) {
            await errorHandler("There isn't any warnings to this person's name.", interaction);
            return;
        }
        if (index > warnsDB.length || index < 1) {
            await errorHandler(`Error: Entered value ${index} is out of index in ${REMOVE_WARNINGS} command.`, interaction);
            return;
        }
        await warnsDB[index - 1].delete();
        await successHandler("Warning removed.", interaction);
        return;
    } else if (await isSudoer(interaction)) {
        await RootCheckEmbed(interaction);
        return;
    } else {
        await misusedCommand(interaction);
        return;
    }
};