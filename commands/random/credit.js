const commando = require('discord.js-commando');
var bot = new commando.Client({
    owner: '170627115660607499',
    commandPrefix: '-'
});



class CreditCommand extends commando.Command {

    constructor(client) {

        super(client, {

            name: 'credits',

            group: 'random',

            memberName: 'credits',

            description: 'Gives credit to those who... need credit'

        });

    }

    async run(message, args) {

            

            message.reply("Credit (and big thank you to) Goldensaur and SimplyCasual for helping me!");

    }

}

module.exports = CreditCommand;
