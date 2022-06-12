const client = require("../index");
const { nicerPermissions } = require("../functions/nicerPerms");
const ban = require("../models/ban");
const { MessageEmbed } = require('discord.js') 

client.on("interactionCreate", async (interaction) => {
if (interaction.isCommand()) {

const cmd = client.slashCommands.get(interaction.commandName);
if(!cmd)return interaction.reply({ content: "An error has occured " });

const args = [];

for (let option of interaction.options.data) {
if (option.type === "SUB_COMMAND") {
if (option.name) args.push(option.name);
option.options?.forEach((x) => {
if (x.value) args.push(x.value);
});
} else if (option.value) args.push(option.value);
}
interaction.member = interaction.guild.members.cache.get(interaction.user.id);

var check = await ban.findOne({
user: interaction.user.id,
ban: true
})

if(check)return 
 
if (!interaction.memberPermissions.has(cmd.userPerms || []))
return interaction.reply({
embeds: [
new MessageEmbed()
.setTitle("Missing Permisssion")
.setDescription("You do not have the required permissions to use this command.")
.addField("Required Permissions", `\`\`\`${cmd.userPerms.map((perm) => nicerPermissions(perm)).join("\n")}\`\`\``)
.setColor("RED")
],
epehemeral: true
});
 
if (!interaction.guild.me.permissions.has(cmd.botPerms || []))
return interaction.reply({
embeds: [
new MessageEmbed()
.setTitle("Missing Permisssion")
.setDescription("I have some required permissions to run this command.")
.addField("Required Permissions", `\`\`\`${cmd.botPerms.map((perm) => nicerPermissions(perm)).join("\n")}\`\`\``)
.setColor("RED")
],
epehemeral: true
});

cmd.run(client, interaction, args);
}

});
