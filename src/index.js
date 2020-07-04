const {
	Client
} = require('discord.js');
const {
	token,
	role_name,
	main_server,
	children_server
} = require('../config.js');
const {
	errorLog
} = require('./functions/errorLog.js');
const client = new Client();
const syncRole = new(require('./functions/syncRoleManager.js'))(role_name, children_server);


client.on('ready', () => {
	try {
		if (!client.guilds.cache.has(main_server)) throw new Error(`Sorry, but the bot is not in the guild with the id: ${main_server}!`);
		children_server.forEach(id => {
			let guild = client.guilds.cache.get(id);
			if (!guild) throw new Error(`Sorry, but the bot is not in the guild with the id: ${id}!`);
			if (!guild.roles.cache.some(x => x.name === role_name)) throw new Error(`Sorry, but that guild (${guild.name}) does not contain the role with the name ${role_name}`);
		});
	} catch (e) {
		errorLog(`${e}, process terminated`);
		process.exit();
	}
	console.log('Role Syncer Enabled');
});

client.on('guildMemberUpdate', async (old_m, new_m) => {
	if (old_m.guild.id !== main_server) return;
	if (!old_m.roles.cache.some(x => x.name === role_name) && new_m.roles.cache.some(x => x.name === role_name)) {
		return syncRole.addRole(old_m);
	}
	if (old_m.roles.cache.some(x => x.name === role_name) && !new_m.roles.cache.some(x => x.name === role_name)) {
		return syncRole.removeRole(old_m);
	}
});

client.on('guildMemberAdd', async member => {
	let role = member.guild.roles.cache.find(x => x.name === role_name);
	if (await syncRole.has_role(member)) {
		await member.roles.add(role);
	}
});

client.login(token);