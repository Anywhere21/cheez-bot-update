const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("랜덤유저추첨")
    .setDescription("서버의 멤버중 한명을 랜덤으로 추첨합니다."),
    /**
     * 
     * @param {import("discord.js").ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        await interaction.deferReply();

        const random_member = interaction.guild.members.cache.filter(f=>!f.user.bot).random()
        console.log(random_member)

        const embed1 = new EmbedBuilder()
        .setTitle('랜덤 유저 추첨')
        .setDescription('추첨 진행중 . ')
        .setColor('Yellow')
        .setFooter({text:'추천 종료까지 3초'})

        const embed2 = new EmbedBuilder()
        .setTitle('랜덤 유저 추첨')
        .setDescription('추첨 진행중 . .')
        .setColor('Yellow')
        .setFooter({text:'추천 종료까지 2초'})

        const embed3 = new EmbedBuilder()
        .setTitle('랜덤 유저 추첨')
        .setDescription('추첨 진행중 . . .')
        .setColor('Yellow')
        .setFooter({text:'추천 종료까지 1초'})

        const embed4 = new EmbedBuilder()
        .setTitle('추첨 결과')
        .addFields(
            { name: '당첨자', value: `${random_member} (${random_member.user.username})` }
            )
        .setColor('Yellow')
        .setThumbnail(`${random_member.displayAvatarURL({ dynamic: true })}?size=4096`)
        .setTimestamp()
    
        setTimeout(() => {
            interaction.editReply({embeds: [embed1]});
            setTimeout(() => {
                interaction.editReply({embeds: [embed2]});
                setTimeout(() => {
                    interaction.editReply({embeds: [embed3]});
                    setTimeout(() => {
                        interaction.editReply({embeds: [embed4]});
        }, 1000);
    }, 1000);
}, 1000);
})
  
    },
};