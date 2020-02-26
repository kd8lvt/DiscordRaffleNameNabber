const Discord = require('discord.js'); //Get the Discord API
const client = new Discord.Client(); //Make a client for the Discord API

const low = require('lowdb'); //Get the file-manager API
const FileSync = require('lowdb/adapters/FileSync'); //A preset from low-db for file management - specifically, halting the program while writing, in order to prevent funkiness.

const adapter = new FileSync('names.json'); //Define which file to put names in
const db = low(adapter); //Set up the "database" (names file) object

db.defaults({ names: [] }) //defaults for the file, so I don't get weird errors
  .write()

client.on('ready', () => { //When the Discord client is ready for action...
  console.log(`Logged in as ${client.user.tag}!`); //Tell us so in the console
});

client.on('message', msg => { //Every time we get a message in any of the servers we are in...
  if (msg.channel.name === 'raffle' && !db.get('names').value().includes(msg.author.username)) { //check that it's in the "#raffle" channel, and the user doesn't already have an entry, and if they do...
  	db.get('names').push(msg.author.username); //...put their name in the list...
    msg.reply('you have been entered! There is nothing else you have to do, good luck!'); //...and let them know they have entered.
  }
});

client.login('TOKEN HERE'); //Start logging in to Discord with your bot's token