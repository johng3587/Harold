const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const got = require('got');

module.exports = {
	name: 'bored', // command name
	description: 'Gives you something to do.', // command description
	usage: '', // usage instructions w/o command name and prefix
	cooldown: 1, // cooldown in seconds, defaults to 3
	permissions: [], // permissions required for command
	myPermissions: ['SEND_MESSAGES'], // permissions bot needs for command
	aliases: ['imbored'],
	data: new SlashCommandBuilder()
		.setName('bored')
		.setDescription('Gives you a suggestion of something to do.'),

	async execute(interaction) { // inside here command stuff
		try {
			await got('https://www.boredapi.com/api/activity') //	im bored
				.then(async response => {
					const data = JSON.parse(response.body);
					const boredembed = new Discord.MessageEmbed()
						.setTitle('Bored? Try this:')
						.setDescription(`
							${data.activity}
							Type: ${data.type}
							Participants: ${data.participants}
							Price: ${data.price * 10}/10
						`)
						.setColor('RANDOM');
					try {
						interaction.reply({ embeds: [boredembed] });
					}
					catch (error) {
						throw new Error(error.stack);
					}
				});
		}
		catch (error) {
			const returnError = { message: error.message, stack: error.stack, code: 444 };
			throw returnError;
		}
	},
};