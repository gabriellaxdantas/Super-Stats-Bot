const {SlashCommandBuilder, EmbedBuilder } = require("discord.js")

// inside a command, event listener, etc.
const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Comandos do SuperStats')
	.addFields(
		{ name: '/ping', value: 'Responde com Pong (vamos usar esse pra testar se o bot está no ar)' },
		{ name: '\u200B', value: '\u200B' },
		{ name: '/frifas', value: 'Mostra as estatísticas de kills de cada um dos sururus' },
        { name: '\u200B', value: '\u200B' },
		{ name: '/gartic', value: 'Mostra as estatísticas de vitórias no Gartic de cada um' },
        { name: '\u200B', value: '\u200B' },
		{ name: '/stopots', value: 'Mostra as estatísticas de vitórias de cada um dos sururus no stopots' },
        
	)

module.exports = {
    data: new SlashCommandBuilder()
        .setName("comandos")
        .setDescription("Responde com os comandos do bot"),

    async execute(interation){
        await interation.reply({ embeds: [exampleEmbed] });
    }
}