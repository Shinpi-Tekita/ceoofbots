const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const client = require('./index.js')
module.exports = class MessagePagination {
constructor(options) {
(async () => {
let {
message,
description,
field1n,
field1v,
field2n,
field2v,
} = options;

this.options = options
  
let modLog = new MessageEmbed()
.setTitle("Mod Logs")
.setDescription(description)
.setColor("#6F8FAF")
.setTimestamp()

if(field1n && field1v)modLog.addField(field1n,field1v);
if(field2n && field2v)modLog.addField(field2n,field2v);

client.channels.cache
.get('981668126557102190')
.send({ embeds: [modLog] }).catch(e => { });
     
})()
}
}
