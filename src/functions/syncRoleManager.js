const better_sqlite3 = require('better-sqlite3');
let table_name = 'user_roles_relation';


class syncRoleManager {
	constructor(name, children_servers) {
		this.db = new better_sqlite3(`${__dirname}/../../data.db`);
		this.role_name = name;
		this.children = children_servers;
		this.init();
	}
	init() {
		this.db.exec(`CREATE TABLE IF NOT EXISTS ${table_name}(user_id TEXT, have_role BIT);`);
	}
	async addRole({
		id,
		client
	}) {
		client.guilds.cache.forEach(async x => {
			if (!this.children.includes(x.id)) return;
			let role = x.roles.cache.find(x => x.name === this.role_name);
			try {
				let member = await x.members.fetch(id);
				await member.roles.add(role);
			} catch (e) {
				return;
			}
		});
		if (!(this.db.prepare(`SELECT user_id FROM ${table_name} WHERE user_id=?`).get(id))) {
			return this.add_to_db(id, true);
		} else {
			return this.db.prepare(`UPDATE ${table_name} SET have_role=? WHERE user_id=?`).run(1, id);
		}
	}
	async removeRole({
		id,
		client
	}) {
		client.guilds.cache.forEach(async x => {
			if (!this.children.includes(x.id)) return;
			let role = x.roles.cache.find(x => x.name === this.role_name);
			try {
				let member = await x.members.fetch(id);
				await member.roles.remove(role);
			} catch (e) {
				return;
			}
		});
		if (!(this.db.prepare(`SELECT user_id FROM ${table_name} WHERE user_id=?`).get(id))) {
			return this.add_to_db(id, false);
		} else {
			return this.db.prepare(`UPDATE ${table_name} SET have_role=? WHERE user_id=?`).run(0, id);
		}
	}
	async add_to_db(id, initial_value = false) {
		this.db.prepare(`INSERT INTO ${table_name}(user_id, have_role) VALUES (?, ?)`).run(id, initial_value ? 1 : 0);
	}

	async has_role({id}) {
		let retrieve = this.db.prepare(`SELECT * FROM ${table_name} WHERE user_id=?`).get(id);
		if(!retrieve) return false;
		return retrieve.have_role;
	}
}

module.exports = syncRoleManager;