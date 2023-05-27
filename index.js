// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection, ClientUser } = require('discord.js');

const dotenv = require('dotenv')
dotenv.config()
const { TOKEN } = process.env

const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command){
        client.commands.set(command.data.name, command);
    }
    else{
        console.log(`Esse comando peesente em ${filePath} está sem "data" ou "execute`);
    }
}

console.log(client.commands);

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Tudo ok! Login como ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(TOKEN);

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if(!command) {
        console.error("Comando não foi encontrado")
        return
    }
    try {
        await command.execute(interaction)
    }
    catch (error){
        console.error(error)
        await interaction.reply("Ocorreu um erro ao executar esse comando")
    }
})