const Discord = require('discord.js');
const fs = require('fs');
const { runMain } = require('module');
runMain()
exports.createClient = function() {
    const client = new Discord.Client({intents: 'GUILDS'})

    client.commands = new Discord.Collection();
}

exports.commandHandlerWithNoFolder = function(commandFolder) {
    fs.readdir(`./${commandFolder}/`, (error, f) => {
        if (error) { return console.error(error); }
            let commands = f.filter(f => f.split('.').pop() === 'js');
            if (commands.length <= 0) { return console.log('Aucune commande trouvée !'); }
    
            commands.forEach((f) => {
                let commande = require(`./${commandFolder}/${f}`);
                console.log(`${f} commande chargée !`);
                client.commands.set(commande.help.name, commande);
            });
    });
}

exports.slashCommandHandler = function() {

}

exports.eventHandler = function(eventFolder) {
    fs.readdir('./'+eventFolder+'/', (error, f) => {
        if (error) { return console.error(error); }
            console.log(`${f.length} events chargés`);
    
            f.forEach((f) => {
                let events = require(`./${eventFolder}/${f}`);
                let event = f.split('.')[0];
                client.on(event, events.bind(null, client));
            });
    });
}

exports.loginBot = function(botToken){
    client.login(botToken);
}