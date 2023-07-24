import auth from "./config/auth.js";
import { REST, Client, GatewayIntentBits } from "discord.js";
import config from "./config/config.js";
import { error, ready } from "./utils/logger.js";
import { loadEventModules } from "./modules/events.js";
import { loadCommandModules, registerCommands } from "./modules/commands.js";
import handleTerminationSignals from "./utils/cleanup.js";
import Enmap from "enmap";

// Create a new client instance and read the intents messages and guilds.
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Load config settings.
client.config = config;

// Load auth settings.
client.auth = auth;
ready("auth", "Initialized");

// Load the Discord REST API.
client.rest = new REST().setToken(client.auth.botToken);

// Handle termination signals.
handleTerminationSignals(client);

// Load event modules.
client.loadEventModules = loadEventModules;
await client.loadEventModules(client);

// Load command modules.
client.loadCommandModules = loadCommandModules;
await client.loadCommandModules(client);

// Register slash commands if enabled.
client.registerCommands = registerCommands;
await client.registerCommands(client);

// Load the database.
// client.loadDatabase = loadDatabase;
// await client.loadDatabase(client);

client.db = {};
client.db.members = new Enmap({
  name: "members",
  fetchAll: true,
  autoFetch: true,
});

// Start the bot.
client.login(client.auth.botToken).catch((e) => {
  error("client", e.message);
});
