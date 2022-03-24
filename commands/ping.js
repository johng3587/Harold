const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 1,
	myPermissions: ['SEND_MESSAGES'],
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with the latency'),

	execute(interaction) {
		interaction.reply({ content: `🏓 Latency is ${interaction.client.ws.ping}ms`, ephemeral: true });
	},
};