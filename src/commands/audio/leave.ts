import Discord from "discord.js";

import AudioManager from "../../core/audio/AudioManager";
import registry from "../../core/CommandRegistry";
import { TopCommand } from "../../modules/commands/TopCommand";
import { EmbedType, replyEmbed, replyEmbedEphemeral } from "../../util/util";

registry.addCommand(new TopCommand({
    name: "leave",
    description: "Leave the voice channel.",
    async func(interaction: Discord.CommandInteraction) {
        if (!interaction.inGuild() || !interaction.guild) {
            return await interaction.reply(replyEmbedEphemeral("This commands only works in server channels.", EmbedType.Error));
        }

        const subscription = AudioManager.get(interaction.guildId);
        if (!subscription) return await interaction.reply(replyEmbedEphemeral("I am not in a voice channel.", EmbedType.Info));

        subscription.destroy();

        await interaction.reply(replyEmbed("Bye :wave:"));
    },
}));
