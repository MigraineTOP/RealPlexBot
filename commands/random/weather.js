const Discord = require('discord.js');
const commando = require('discord.js-commando');
var bot = new commando.Client({
         owner: '170627115660607499',
         commandPrefix: '-'
     });
    ;
;;
const prefix = '-'
bot.on('message', msg => {
    var message = msg.content.toUpperCase();
    let sender = msg.author;
    let cont = msg.content.slice(prefix.length).trim().split(/ +/g);
    let args = cont.slice(1);
     
     class WeatherCommand extends commando.Command {
     
         constructor(client) {
     
             super(client, {
     
                 name: 'weather',
     
                 group: 'random',
     
                 memberName: 'weather',
     
                 description: 'Gives the weather'
     
             });
     
         }
     
         async run(message, args) {
     
            var weather = require('weather-js');
            if (msg.content.toLowerCase().startsWith(prefix + 'WEATHER')); {
                weather.find({
                    search: args.join(" "),
                    degreeType: 'F'
                }, function(err, result) {
                    if (err) message.channel.send(err);
        
                    if (result === undefined) {
                        message.channel.send('**Please enter a valid location!**');
                        return;
                    }
        
                    var current = result[0].current;
                    var location = result[0].location;
                    var embed = new Discord.RichEmbed()
                        .setDescription(`**${current.observationpoint}**`)
                        .setAuthor(`Weather for ${current.observationpoint}`)
                        .setThumbnail(current.imageUrl)
                        .setColor(0x00AE86)
                        .addField('Timezone', `UTC{location.timezone}`, true)
                        .addField('Degree Type', location.degreetype, true)
                        .addField('Temperature', `${current.temperature} Degrees`, true)
                        .addField('Feels Like', `${current.feelslike} Degrees`, true)
                        .addField('Winds', current.winddisplay, true)
                        .addField('Humidity', `${current.humidity}%`, true);
        
                    msg.channel.send({
                        embed
                    });
                });
             };
            };
        };
        module.exports = WeatherCommand;
    ;
    });
;
