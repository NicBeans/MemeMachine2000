import { Events } from "discord.js";
import { cmd, log, error } from "../utils/logger.js";

export const name = Events.InteractionCreate;

/**
 * Emitted whenever an interaction is created (button click, select menu, command, etc.).
 *
 * @param {import('discord.js').Client} client
 * @param {import('discord.js').Interaction} interaction
 * @returns {Promise<void>}
 */
export async function execute(client, interaction) {
  log("interaction", `${interaction.user.tag} ${interaction.commandName}`);
  // ignore bots
  if (interaction.user.bot) {
    return;
  }
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    cmd("client", `Ignored command: ${interaction.commandName}`);
    return;
  }
  command.execute(interaction).catch((e) => {
    error("client", e.message);
    interaction.reply({
      content: "Fuck! I died again, ping <@183269093489508352>",
      ephemeral: true,
    });
  });
}
