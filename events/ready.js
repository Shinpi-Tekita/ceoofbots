const { MessageEmbed, MessageAttachment } = require("discord.js");
const emojis = require("../emojis")
const client = require("../index");

client.on("ready", async () => {
let servers = client.users.cache.size
let servercount = client.guilds.cache.reduce((a,b) => a+b.memberCount, 0)
console.log(`Ready! Logged in as ${client.user.tag}\ncurrently in ${servers} servers and watching over ${servercount} members`);  

let ready = new MessageEmbed()
.setDescription(`**Ceo Of Bots Is Back Online**`)
.setColor("#6F8FAF")
.setTimestamp()
client.channels.cache.get('981668126557102190').send({embeds: [ready]})
console.log('Sent')

client.user.setActivity(`/help | ${servers} users`, { type: 'PLAYING' });
});
