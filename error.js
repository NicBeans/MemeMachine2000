import { Events } from "discord.js";
import { error } from "../utils/logger.js";

export const name = Events.Error;

/**
 * Emitted whenever the client's WebSocket encounters a connection error.
 *
 * @param {import('discord.js').Client} client
 * @param {Error} error
 * @returns {void}
 */
export function execute(client, e) {
  error("client", e.message);
}
