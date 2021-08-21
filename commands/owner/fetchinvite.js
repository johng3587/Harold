const Discord = require('discord.js');

module.exports = {
	name: 'fetchinvite', //command name
	description: 'Get invite for guild by id', //command description
	args: true, //needs arguments? delete line if no
  usage: `<guild id>`, //usage instructions w/o command name and prefix
	cooldown: 5, //cooldown in seconds, defaults to 3
	permissions: [], //permissions required for command
	ownerOnly: true, //need to be the owner? delete line if no
	aliases: [],
	async execute(message, args, prefix) { //inside here command stuff
		    const guildgo = message.client.guilds.cache.get(args[0])
        async function makeinv(){
          const channels = await guildgo.channels.fetch()
          let channel = channels.filter(((channel) => channel.type === 'GUILD_TEXT')).first()
          let invite = await channel.createInvite({ maxAge: 120, maxUses: 10 })
          return invite
          }
        let invitecode = (await makeinv()).code
        const inviteembed = new Discord.MessageEmbed()
        .setTitle(guildgo.name)
        .setDescription(`Invite to ${guildgo.name}: https://discord.gg/${invitecode}\n⚠️⚠️**Do NOT use this code lightly, you are joining a server unexpectedly and may not be greeted in a friendly manner, especially if the server is meant to be a private server**⚠️⚠️`)
        .setColor('RANDOM')
        message.react('📬')
        message.author.send({ embeds: [inviteembed]})
	},
};