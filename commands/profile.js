const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	name: 'profile', // command name
	description: 'Gets a user\'s profile information.', // command description
	usage: '', // usage instructions w/o command name and prefix
	cooldown: 5, // cooldown in seconds, defaults to 3
	permissions: [], // permissions required for command
	myPermissions: ['SEND_MESSAGES'], // permissions bot needs for command
	aliases: ['pfp', 'profileimage', 'whois', 'userinfo'],
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Gets a user\'s profile information.')
		.addUserOption(option =>
			option.setName('user')
				.setRequired(false)
				.setDescription('The user to get the profile of.')),

	async execute(interaction) { // inside here command stuff.
		let pfptarget;
		if (!interaction.options.getUser('user')) {
			pfptarget = await interaction.user.fetch({ force: true });
		}
		else {
			pfptarget = await interaction.options.getUser('user').fetch({ force: true });
		}
		const accountCreated = Math.round(pfptarget.createdAt / 1000);
		const pfpembed = new Discord.MessageEmbed()
			.setAuthor('Details provided by Harold, recorded by Discord', interaction.client.user.avatarURL(), 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
			.setColor('RANDOM')
			.setTitle('Profile info')
			.setDescription(`
				**Name:** ${pfptarget.tag}
				**Discriminator:** ${pfptarget.discriminator}
				**ID:** ${pfptarget.id}
				**Bot:** ${pfptarget.bot}
				**System:** ${pfptarget.system}
				**Partial:** ${pfptarget.partial}
				**Flags:** ${pfptarget.flags.toArray().join(', ').replace('_', ' ')}
				**Created on:** <t:${accountCreated}:D> at <t:${accountCreated}:t> (Translated into your time zone)
				**Accent color:** ${pfptarget.hexAccentColor}
				**Avatar hash:** ${pfptarget.avatar}
				**Banner hash:** ${pfptarget.banner}
				**Avatar URL:** [Link↗](${pfptarget.displayAvatarURL()})
				**Banner URL:** [Link↗](${pfptarget.bannerURL()})
			`)
			.setThumbnail(pfptarget.avatarURL({ dynamic: true, size: 512 }) || 'https://i.imgflip.com/6e4j42.jpg')
			.setTimestamp();
		if (interaction.guild !== null) {
			const guildMember = interaction.guild.members.cache.find(user => user.id === pfptarget.id);
			const joinedGuild = Math.round(guildMember.joinedTimestamp / 1000);
			pfpembed.addField('Server-specific information', `
				**Joined on: ** <t:${joinedGuild}:D> at <t:${joinedGuild}:t> (Translated into your time zone)
				**Display name:** ${guildMember.displayName}
				**Display color:** ${guildMember.displayHexColor}
				**Pending membership:** ${guildMember.pending}
				**Kickable:** ${guildMember.kickable}
				**Bannable:** ${guildMember.bannable}
			`);
		}
		interaction.reply({ embeds: [pfpembed] });
	},
};
