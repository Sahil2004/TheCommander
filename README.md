# TheCommander

## Introduction

TheCommander is a discord **moderation** bot with a lot of features and very little configuration. It was made to ease the moderation of a server with linux like commands. Also it reflects my love for linux.

Basically, everyone will have a normal looking role so that people behave normally without the fear of someone moderating them. When moderation is needed, a mod can do his stuff wherever needed by elevating his permissions by entering root or using sudo.

## How it is linked to linux
This is bot is based on the principle of linux. The way linux has every user as a standard user and the system admin is no different and whenever the system admin wants to run any command which requires higher privledges they can get into root with $su, the same way you can get the highest privledges after running $su else, everyone's a normal user.

To prevent any normal user from accessing root, 'sudo' has a sudoers file where the users who can access sudo are mentioned, the same way, you give sudoers role to the people who can access the $su command.

## Commands list

| Command     | Description                                                                                                           |
| ----------- | --------------------------------------------------------------------------------------------------------------------- |
| `/su`       | It gives the user the role of superuser, hence they are now able to manage the server and members.                    |
| `/exit`     | It exits you out of your superuser role, thus bringing you out of root.                                               |
| `/sudo`     | It helps execute commands without needing to go into superuser role only for superusers.                              |
| `/config`   | It creates the roles and channels needed.                                                                             |
| `/mute`     | It muted the mentioned user with an optional reason.                                                                  |
| `/unmute`   | It unmuted the mentioned user.                                                                                        |
| `/kick`     | It kicks the mentioned user with an optional reason.                                                                  |
| `/ban`      | It bans the mentioned user.                                                                                           |
| `/unban`    | It unbans the mentioned user.                                                                                         |
| `/warn`     | It warns the mentioned user with an optional reason.                                                                  |
| `/warnings` | It shows all the warnings of the mentioned user.                                                                      |
| `/pardon`   | It removes a warning of the mentioned user with the warning index which can be found in `/warnings`.                  |
| `/purge`    | It deletes the specified number (less than 100) of messages from the channel.                                         |
| `/slowmode` | It enables the slowmode in the channel with specified time (less than 21600 seconds, i.e. 6hrs) with optional reason. |
| `/man`      | It shows help only to the person who ran it (to prevent spam) with optional command name to elaborate it.             |

## License

This code is licensed under GPL-v3. Full license can be found in [LICENSE file](./LICENSE).

## Contribution

You can contribute by opening an issue if you find a bug.

If you want to contribute code, then you may first open an issue and ask it to be assigned it to you before you start coding it and after it is assigned to you then you may code it and send a PR.