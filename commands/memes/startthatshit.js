const { SlashCommandBuilder, ChannelType } = require("discord.js");
const {
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
    AudioPlayerStatus,
} = require("@discordjs/voice");
const _ = require("underscore");
const cron = require("node-cron");
const fs = require("fs");


let shitstarted = false;
let task;


function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yeet")
    .setDescription("start cappin on the homies frfr")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("where the homies at")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildVoice)
    ),

  async execute(interaction) {
    try {
      if (shitstarted) {
        await interaction.reply("Shit already started, homie.");
        return;
      }

      task = cron.schedule(
        `0 ${Math.floor(Math.random() * 55) + 3} * * * *`,
        async () => {
          const connection = joinVoiceChannel({
            channelId: interaction.options.getChannel("channel").id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
          });

          const audioFiles = fs.readdirSync("./audio").filter((file) => {
            return file.endsWith(".mp3");
          });

          const memePicked = _.sample(audioFiles);
          const memePath = `./audio/${memePicked}`;
          console.log("playing");
          console.log(memePicked);

          const resource = createAudioResource(`${memePath}`);
          const player = createAudioPlayer();

          player.play(resource);
          connection.subscribe(player);

          player.on(AudioPlayerStatus.Idle, () => {
            player.stop();
            connection.destroy();
          });
        }
      );

      task.start();
      shitstarted = true;
      await interaction.reply("Shit started, homie.");
    } catch (error) {
      console.log("[ERROR]", error);
    }
  },
};

//   async execute(interaction) {
//     try {
//       const task = cron.schedule(
//         `0 ${Math.floor(Math.random() * 55) + 3} * * * *`,
//         async () => {
//           const connection = joinVoiceChannel({
//             channelId: interaction.options.getChannel("channel").id,
//             guildId: interaction.guild.id,
//             adapterCreator: interaction.guild.voiceAdapterCreator,
//           });

//           const audioFiles = fs.readdirSync("./audio").filter((file) => {
//             return file.endsWith(".mp3");
//           });

//           const memePicked = _.sample(audioFiles);
//           const memePath = `./audio/${memePicked}`;
//           console.log("playing");
//           console.log(memePicked);

//           const resource = createAudioResource(`${memePath}`);
//           const player = createAudioPlayer();

//           player.play(resource);
//           connection.subscribe(player);

//           player.on(AudioPlayerStatus.Idle, () => {
//             player.stop();
//             connection.destroy();
//           });
//         }
//       );

//       task.start();
//     } catch (error) {
//       console.log("[ERROR]", error);
//     }
//   },
// };