const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
var Josa = require('josa-js');
const { } = require("../..")

module.exports = {
    data :new SlashCommandBuilder()
    .setName("골라")
    .setDescription("봇이 대신 골라줍니다.")
    .addStringOption((option) => 

    option.setName("1").setDescription("옵션 중 하나를 봇이 골라줍니다.").setRequired(true)
  )
    .addStringOption((option) =>

    option.setName("2").setDescription("옵션 중 하나를 봇이 골라줍니다.").setRequired(true)
  )
    .addStringOption((option) =>

    option.setName("3").setDescription("옵션 중 하나를 봇이 골라줍니다.").setRequired(false)
  )
    .addStringOption((option) =>

    option.setName("4").setDescription("옵션 중 하나를 봇이 골라줍니다.").setRequired(false)
  )
    .addStringOption((option) =>

    option.setName("5").setDescription("옵션 중 하나를 봇이 골라줍니다.").setRequired(false)
  ),
    /**
     * 
     * @param {import("discord.js").CommandInteraction} interaction 
     */
    async execute(interaction){
        await interaction.deferReply();
        const { options } = interaction;
        let array = [];
        for(let i=0; i<5; i++)  array.push(options.getString((i+1).toString()));
        array = array.filter(x=>x)
        const selected = array[Math.floor(Math.random() * array.length)];
        const embed = new EmbedBuilder()
            .setTitle(`골라`)
            .setDescription(`선택지 ${array.join(", ")} 중에서\n치즈봇은 ${Josa.r(`**${selected}**`,'을/를')} 골랐어요!`)
            .setTimestamp()
            .setColor("Yellow")
            interaction.editReply({embeds: [embed] })
    }}