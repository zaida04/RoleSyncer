# Role Syncer

[![made-with-Discord.js](https://img.shields.io/badge/Made%20with-Discord.js-1f425f.svg?style=for-the-badge)](https://github.com/discordjs/discord.js/)
![Discord.js-Version-Discord.js](https://img.shields.io/badge/Discord.js-12.2.0-1f425f.svg?style=for-the-badge) ![GitHub last commit](https://img.shields.io/github/last-commit/zaida04/Discord-Role-Syncer.svg?style=for-the-badge) ![GitHub issues](https://img.shields.io/github/issues/zaida04/Discord-Role-Syncer.svg?style=for-the-badge)

A discord bot that syncs up roles between a main and numerous children servers.

# Features

- When Role is added to a Guild Member in the **main** server, add the role to the same user in the **children** server
- When Role is removed to a Guild Member in the **main** server, remove the role from the same user in the **children** server
- When a person joins the **children** server, and already has the role in the **main** server, add the role to them
- When a person leaves and rejoins a **children** server, reapply the role if appropriate (Store this data in a db)

### Uses SQLite3 as a database to only store data regarding if a Guild Member has a role or not.

## Env Variables

```
TOKEN=BOTTOKEN
ROLE_NAME=nameofroletosync
MAIN_SERVER=MAINSERVERID
CHILDREN_SERVER=CHILDRENSERVERID1, CHILDRENSERVERID2
```

The Children server key can contain multiple ids, separated my commas.
