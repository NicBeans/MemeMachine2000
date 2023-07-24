const { SlashCommandBuilder } = require("discord.js");

let shitstarted = false;
let task;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("stops the vibes"),

  async execute(interaction) {
    try {
      if (!shitstarted) {
        await interaction.reply("no more caps, ngl not fire.");
        return;
      }

      task.stop();
      shitstarted = false;
      await interaction.reply("caps no more.");
    } catch (error) {
      console.log("[ERROR]", error);
    }
  },
};
