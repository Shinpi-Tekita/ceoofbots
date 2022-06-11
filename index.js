const express = require('express')
const app = express()
const emo = require('./emojis')
const { Client, Collection, MessageEmbed } = require("discord.js");

const client = new Client({
intents: 32767,
restTimeOffset: 0,
allowedMentions: {
parse: ["roles","users"],
repliedUser: false
}
}); 

app.get('/', (req, res) => {
res.send('ceo online join https://discord.gg/j3YamACwPu for updates!');
});

app.listen(process.env.PORT || 80, () => {
console.log('Server Started');
});

module.exports = client;
client.slashCommands = new Collection();
client.modLog = require('./modLogs');

require("./handler")(client);

let toJSON = require("@stdlib/error-to-json");
var re = new RegExp(process.env.TOKEN1,"g");
process.on("unhandledRejection", (reason, p) => {
let errChannel = client.channels.cache.get("981668126557102190");
let error = toJSON(reason);
console.log(reason);
let embed = new MessageEmbed()
.setAuthor({name: `${error.name}`,iconURL: client.user.displayAvatarURL({ dynamic: true })})
.setTitle(`unhandledRejection`)
.setDescription(`\`\`\`js\n${error.stack.replace(re,`token`)}\`\`\``)
.addField(
`Reason:`,
`\`\`\`cs\n# ${error.message}\n(code: ${error.code})\n\`\`\``,
true
)
.addField(`Path:`, `\`\`\`bash\n# ${error.path}\n\`\`\``, true)
.setTimestamp()
.setColor("#6F8FAF")
.setFooter({text: `httpStatus: ${error.httpStatus}`});
errChannel.send({embeds: [embed]}) 

});

process.on("uncaughtException", (err, origin) => {
console.log(err, origin);
let errChannel = client.channels.cache.get("981668126557102190");
let embed = new MessageEmbed()
.setAuthor({
name: `${client.user.username} Error Catcher`,
iconURL: client.user.displayAvatarURL({ dynamic: true })
})
.setTitle(`uncaughtException`)
.addField(`Error:`, `\`\`\`js\n${err.replace(re,`token`)}\n\`\`\``)
.setTimestamp()
.setColor("#6F8FAF")
.setFooter({ text:`[ AntiCrash ]`});
errChannel.send({ embeds: [embed] });
});

process.on("multipleResolves", (type, promise, reason) => {
console.log(type, promise, reason);
let errChannel = client.channels.cache.get("981668126557102190");
let embed = new MessageEmbed()
.setAuthor({
name: `${client.user.username} Error Catcher`,
iconURL: client.user.displayAvatarURL({ dynamic: true })
})
.setTitle(`uncaughtException`)
.addField(`Reason:`, `\`\`\`js\n${reason.replace(re,`token`)}\n\`\`\``)
.addField(`Type:`, `\`\`\`js\n${type}\n\`\`\``)
.setTimestamp()
.setColor("#6F8FAF")
.setFooter({ text: `[ AntiCrash ]`});
errChannel.send({ embeds: [embed] });
});

client.login(process.env.TOKEN1);
