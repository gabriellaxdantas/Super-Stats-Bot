const {SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Responde com pong"),

    async execute(interation){
        await interation.reply("Pong!")
    }
}