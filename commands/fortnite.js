const Fortnite = require('fortnite')
const stats = new Fortnite('aaec2c4a-b522-4d3c-95bb-de2065f18aad');
const Discord = require('discord.js')
const client = new Discord.Client();

exports.run = (client, message, args, tools) => {

    let platform;
    let username;

    if (!['pc', 'xbl', 'psn'].includes(args[0])) message.channel.send('**Please Inclde the Platform: `-fortnite [platform] <username>`**')
    if (!args[0]) message.channel.send('**Please Include the Platform: `-fortnite [platform] <username>`**');
    if (!args[0]) message.channel.send('**Please Include the Platform: `-fortnite [platform] <username>`**');

    platform = args.shift();
    username = args.join(' ')

    stats.getInfo(username, platform).then( data => {
        const embed = new Discord.MessageEmbed()
            .setColor(0xffffff)
            .setTitle(`Stats for ${data.username}`)
            .addField('Top Placement', `**Top 3s:** *${data.lifetimeStats[0].value}*\n**Top 5s** *${data.lifetimeStats[1].value}*\n**Top 6s** *${data.lifetimeStats[3].value}*\n**Top 5s** *${data.lifetimeStats[1].value}*\n**Top 12s** *${data.lifetimeStats[4].value}*\n**Top 5s** *${data.lifetimeStats[1].value}*\n**Top 25s** *${data.lifetimeStats[5].value}*\n`)
            .addField('Total Score', data.lifetimeStats[6].value, true)
            .addField('Matches Played', data.lifetimeStats[7].value, true)
            .addField('Wins', data.lifetimeStats[8].value, true)
            .addField('Win Percentage', data.lifetimeStats[9].value, true)
            .addField('Kills', data.lifetimeStats[10].value, true)
            .addField('K/D Ratio', data.lifetimeStats[11].value, true)
            .addField('KIlls Per Minute', data.lifetimeStats[12].value, true)
            .addField('Time Played', data.lifetimeStats[13].value, true)
            .addField('Average Survival Time', data.lifetimeStats[14].value, true)
            
        message.channel.send(embed)
    })
    .catch(error => {
        message.channel.send('Username not found')
    })

}