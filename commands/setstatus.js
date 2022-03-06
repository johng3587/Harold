module.exports = {
	name: 'setstatus', // command name
	description: 'Sets the bot\'s presence.', // command description
	args: true, // needs arguments? delete line if no
	usage: '<online|invisible|dnd|idle>', // usage instructions w/o command name and prefix
	cooldown: 5, // cooldown in seconds, defaults to 3
	permissions: [], // permissions required for command
	myPermissions: ['SEND_MESSAGES'], // permissions bot needs for command
	ownerOnly: true, // need to be the owner? delete line if no
	aliases: [],
	execute(message, args) { // inside here command stuff
		if (args[0] === 'online') {
			message.client.user.setPresence({ status: 'online' });
			message.reply(`Status set to ${args[0]}`);
		}
		else if (args[0] === 'idle') {
			message.client.user.setPresence({ status: 'idle' });
			message.reply(`Status set to ${args[0]}`);
		}
		else if (args[0] === 'invisible') {
			message.client.user.setPresence({ status: 'invisible' });
			message.reply(`Status set to ${args[0]}`);
		}
		else if (args[0] === 'dnd') {
			message.client.user.setPresence({ status: 'dnd' });
			message.reply(`Status set to ${args[0]}`);
		}
		else {
			message.reply(`Invalid argument: ${args[0]}. Valid arguments are:\nonline, idle, invisible, dnd`);
		}
	},
};