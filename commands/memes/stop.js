const { SlashCommandBuilder } = require("discord.js");
const { exec } = require("child_process");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("stop the bot"),

  async execute(interaction) {
    try {
      exec(`kill -2 $(pgrep -f startthatshit.js)`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
      await interaction.reply("Bot stopped.");
    } catch (error) {
      console.log("[ERROR]", error);
    }
  },
};
