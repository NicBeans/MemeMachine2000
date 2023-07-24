import { readdirSync } from "fs";
import { debug, tready } from "../utils/logger.js";

/**
 * Loads event modules from the ./events/ folder.
 *
 * Ignores files that start with a dot.
 *
 * @module events
 * @param {Client} client The Discord client.
 * @returns {Promise<void>}
 */
export async function loadEventModules(client) {
  await tready("events", "Initialized", async () => {
    const eventsPath = "./events/";
    const eventFiles = readdirSync(eventsPath).filter(
      (file) => file.endsWith(".js") && !file.startsWith(".")
    );

    for (const file of eventFiles) {
      const filePath = `../events/${file}`;
      const event = await import(filePath);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
        debug("events", `${event.name}(once)`);
      } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
        debug("events", `${event.name}(on)`);
      }
    }
    return eventFiles.length;
  });
}
