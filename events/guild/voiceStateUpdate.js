const delay = require("delay");
const { Permissions, EmbedBuilder } = require("discord.js");

module.exports = async (client, oldState, newState) => {
	const player = client.manager?.players.get(newState.guild.id);
	if (!player) return;

	if (!newState.guild.members.cache.get(client.user.id).voice.channelId) player.destroy();

	if (newState.channelId && newState.channel.type == "GUILD_STAGE_VOICE" && newState.guild.members.me.voice.suppress) {
		if (newState.guild.members.me.permissions.has(Permissions.FLAGS.SPEAK) || (newState.channel && newState.channel.permissionsFor(nS.guild.members.me).has(Permissions.FLAGS.SPEAK))) {
			newState.guild.members.me.voice.setSuppressed(false);
		}
	}
	const vcRoom = oldState.guild.members.me.voice.channel.id;

    const leaveEmbed = client.channels.cache.get(player.textChannel);

	if (oldState.id === client.user.id) return;
	if (!oldState.guild.members.cache.get(client.user.id).voice.channelId) return;

	if (player.twentyFourSeven) return;

	if (oldState.guild.members.cache.get(client.user.id).voice.channelId === oldState.channelId) {
		if (oldState.guild.members.me.voice?.channel && oldState.guild.members.me.voice.channel.members.filter((m) => !m.user.bot).size === 0) {

				await delay(client.config.LEAVE_TIMEOUT);

				const vcMembers = oldState.guild.members.me.voice.channel?.members.size;
				if (!vcMembers || vcMembers === 1) {
				const newPlayer = client.manager?.players.get(newState.guild.id)
				newPlayer ? player.destroy() : oldState.guild.members.me.voice.channel.leave();
				client.UpdateMusic(newPlayer);
				const TimeoutEmbed = new EmbedBuilder()
            		.setDescription(`**Disconnected from <#${vcRoom}> because I was left alone ;(**`);
            	try {
		            if (leaveEmbed) leaveEmbed.send({ embeds: [TimeoutEmbed] });
		        } catch (error) {
		            console.log(error);
		        }
			}
		}
	}
};