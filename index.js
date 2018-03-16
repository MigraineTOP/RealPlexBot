var Discord = require('discord.js');
var bot = new Discord.Client();
var prefix = "-";
var weather = require('weather-js');
var fs = require('fs');
var commands = JSON.parse(fs.readFileSync('Storage/commands.json', 'utf-8'))
var db = require('quick.db')


const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  }, 280000);

bot.on('message', message => {

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);
    
    // Purge
    if (msg.startsWith(prefix + 'PURGE')) { 
        
        async function purge() {
            message.delete(); 

           
            if (isNaN(args[0])) {
                
                message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>'); 
                
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]}); 
            console.log(fetched.size + ' messages found, deleting...'); 

            
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`)); 

        }

        
        purge();  

    };
  
    //Ping
    if (msg.startsWith(prefix + 'PING')) {
        message.channel.sendMessage('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
    }

    //Weather
    if (msg.startsWith(prefix + 'WEATHER')) { 

        weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) { 
            if (err) message.channel.send(err);


            if (result.length === 0) {
                message.channel.send('Please enter a valid location.') 
                return; 
            }


            var current = result[0].current; 
            var location = result[0].location; 


            const embed = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl) 
                .setColor(0x00AE86) 
                .addField('Timezone',`UTC${location.timezone}`, true) 
                .addField('Degree Type',location.degreetype, true)
                .addField('Temperature',`${current.temperature} Degrees`, true)
                .addField('Feels Like', `${current.feelslike} Degrees`, true)
                .addField('Winds',current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)


                message.channel.send({embed});
        });
    };

    //Help
    if (msg.startsWith(prefix + 'HELP')) { 

    
    if (msg === `${prefix}HELP`) { 

       
        const embed = new Discord.RichEmbed()
            .setColor(0x1D82B6) 
        
        let commandsFound = 0; 

       
        for (var cmd in commands) {

            if (commands[cmd].group.toUpperCase() === 'USER') {
                
                commandsFound++
               
                embed.addField(`${commands[cmd].name}`, `**Description:** ${commands[cmd].desc}\n**Usage:** ${prefix + commands[cmd].usage}`); 
            }

        }

        
        embed.setFooter(`Currently showing user commands. To view another group do ${prefix}help [group / command]`)
        embed.setDescription(`**${commandsFound} commands found** - <> means required, [] means optional`)

       
        message.author.send({embed})
        
        message.channel.send({embed: {
            color: 0x1D82B6,
            description: `**Check your DMs ${message.author}!**`
        }})

        

    } else if (args.join(" ").toUpperCase() === 'GROUPS') {

        
        let groups = '';

        for (var cmd in commands) {
            if (!groups.includes(commands[cmd].group)) {
                groups += `${commands[cmd].group}\n`
            }
        }

        message.channel.send({embed: {
            description:`**${groups}**`,
            title:"Groups",
            color: 0x1D82B6
        }})

        return; 


    } else {
        
        let groupFound = '';

        for (var cmd in commands) { 

            if (args.join(" ").trim().toUpperCase() === commands[cmd].group.toUpperCase()) {
                groupFound = commands[cmd].group.toUpperCase(); 
                break;
            }

        }

        if (groupFound != '') {
            
            const embed = new Discord.RichEmbed()
                .setColor(0x1D82B6)
            
            let commandsFound = 0; 


            for (var cmd in commands) { 

               
                if (commands[cmd].group.toUpperCase() === groupFound) {
                   
                    commandsFound++
                    
                    embed.addField(`${commands[cmd].name}`, `**Description:** ${commands[cmd].desc}\n**Usage:** ${prefix + commands[cmd].usage}`);
                }

            }

           
            embed.setFooter(`Currently showing ${groupFound} commands. To view another group do ${prefix}help [group / command]`)
            embed.setDescription(`**${commandsFound} commands found** - <> means required, [] means optional`)

           
            message.author.send({embed})
            
            message.channel.send({embed: {
                color: 0x1D82B6,
                description: `**Check your DMs ${message.author}!**`
            }})

            
            return; 

           
        }

        let commandFound = '';
        let commandDesc = '';
        let commandUsage = '';
        let commandGroup = '';

        for (var cmd in commands) { 

            if (args.join(" ").trim().toUpperCase() === commands[cmd].name.toUpperCase()) {
                commandFound = commands[cmd].name; 
                commandDesc = commands[cmd].desc;
                commandUsage = commands[cmd].usage;
                commandGroup = commands[cmd].group;
                break;
            }

        }

        
        if (commandFound === '') {
            message.channel.send({embed: {
                description:`**No group or command found titled \`${args.join(" ")}\`**`,
                color: 0x1D82B6,
            }})

        }

    
        message.channel.send({embed: {
            title:'<> means required, [] means optional',
            color: 0x1D82B6,
            fields: [{
                name:commandFound,
                value:`**Description:** ${commandDesc}\n**Usage:** ${commandUsage}\n**Group:** ${commandGroup}`
            }]
        }})

        return; 

    }

};
});





bot.login('Mzk0MjgwOTgzNjAxNDc5Njkx.DSC1cw.2aBpwmeAfMR3m8yzq4njXB5vKzE');



console.log('Yay! Bot Started')
