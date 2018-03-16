const db = require("quick.db")

exports.run = (bot, message, args, func) => {

    db.fetchObject(message.author.id + message.guild.id).then(i => { // This is the object of messages sent
        db.fetchObject(`userLevel_${message.author.id + message.guild.id}`).then(o => { // This is the object of their level
            message.channel.send('Messages sent: `' + (i.value + 1) + '`\nLevel: `' + o.value + '`'); 
        })
    })

}
