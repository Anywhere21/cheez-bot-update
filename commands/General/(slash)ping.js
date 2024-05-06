const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("핑")
    .setDescription("봇의 현재 핑을 확인합니다."),
    /**
     * 
     * @param {import("discord.js").ChatInputCommandInteraction} interaction 
     */
    async execute(interaction){
        await interaction.deferReply();

        const msg = await interaction.fetchReply();

        const embed = new EmbedBuilder()
        .setTitle('핑')
        .setColor('Yellow')
        .setTimestamp()
        .setThumbnail('https://cdn.discordapp.com/avatars/1066656400618557471/2399f679a9aa95a366537af5a9cfecf6.webp?size=4096')
        .addFields(
      { name: "커맨드 핑", value: `**${msg.createdTimestamp - interaction.createdTimestamp}**` },
      { name: "봇 핑", value: `**${interaction.client.ws.ping}**` },
    );

    interaction.editReply({embeds: [embed]});
    },
};