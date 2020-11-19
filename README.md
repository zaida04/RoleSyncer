# Role Syncer

[![made-with-Discord.js](https://img.shields.io/badge/Made%20with-Discord.js-1f425f.svg?style=for-the-badge)](https://github.com/discordjs/discord.js/)
![Discord.js-Version-Discord.js](https://img.shields.io/badge/Discord.js-12.2.0-1f425f.svg?style=for-the-badge) ![GitHub last commit](https://img.shields.io/github/last-commit/zaida04/RoleSyncer.svg?style=for-the-badge) ![GitHub issues](https://img.shields.io/github/issues/zaida04/RoleSyncer.svg?style=for-the-badge)

# About
RoleSyncer is A discord bot that syncs up roles between a main and numerous children servers.

# Features

- When Role is added to a Guild Member in the **main** server, add the role to the same user in the **children** server
- When Role is removed to a Guild Member in the **main** server, remove the role from the same user in the **children** server
- When a person joins the **children** server, and already has the role in the **main** server, add the role to them
- When a person leaves and rejoins a **children** server, reapply the role if appropriate (Store this data in a db)

# Built With
* [discord.js](https://discord.js.org/) - Interaction with the Discord API
* [sqlite3](https://www.npmjs.com/package/sqlite3) - Storage of data regarding role adding/removal

# How to Use
## Installation
* `git clone https://github.com/zaida04/RoleSyncer`
* `cd RoleSyncer`
* `npm i`
* [Configure ENV Variables](#env)
* `node src/index.js`

## ENV

```
TOKEN=BOTTOKEN
ROLE_NAME=nameofroletosync
MAIN_SERVER=MAINSERVERID
CHILDREN_SERVER=CHILDRENSERVERID1, CHILDRENSERVERID2
```
The Children server key can contain multiple ids, separated by commas.

# License

~ July, 2020
> RoleSyncer © zaida04, Released under the MIT License.
