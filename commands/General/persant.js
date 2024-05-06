const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { } = require("../..")

module.exports = {
    data :new SlashCommandBuilder()
    .setName("확률")
    .setDescription("봇이 확률을 랜덤을 띄웁니다.")
    .addStringOption((option) => 

    option.setName("선택지").setDescription("선택지를 입력하세요.").setRequired(true)
  ),
    /**
     * 
     * @param {import("discord.js").CommandInteraction} interaction 
     */
    async execute(interaction){
        await interaction.deferReply();
        const { options } = interaction;
        const selected = Math.floor(Math.random() * 101);
        const persant = interaction.options.getString("선택지")

        const embed = new EmbedBuilder()
            .setTitle(`확률`)
            .setDescription(`${persant} 확률은 **${selected}%**예요.`)
            .setTimestamp()
            .setColor("Yellow")
            interaction.editReply({embeds: [embed] })
    }}