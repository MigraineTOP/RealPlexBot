const commando = require('discord.js-commando');
var bot = new commando.Client({
    owner: '170627115660607499',
    commandPrefix: '-'
});



class FlipCoinCommand extends commando.Command {

    constructor(client) {

        super(client, {

            name: 'flip',

            group: 'random',

            memberName: 'flip',

            description: 'Flips a coin'

        });

    }

    async run(message, args) {

            var flip = Math.floor(Math.random() * 2) + 1;

            message.reply("(1 = Heads, 2 = Tails)You flipped a " +flip);

    }

}

module.exports = FlipCoinCommand;
