const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { } = require('../..');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('서버정보')
		.setDescription('서버 정보를 보여줍니다.')
        .addStringOption((option) =>

            option.setName("서버아이디").setDescription("서버 ID를 입력해주세요.").setRequired(false)
          ),
	async execute(interaction) {
        await interaction.deferReply();
        const { options } = interaction;
        const server = options.getString("서버아이디");
        const guild = await interaction.guild.fetch(server) || interaction.guild;
        console.log(guild);
        const { name, ownerId, createdTimestamp, memberCount, premiumSubscriptionCount, id, icon, channels, roles } = guild;

        let baseVerification = guild.verificationLevel;
        if (baseVerification == 0) baseVerification = "없음"
        if (baseVerification == 1) baseVerification = "낮음"
        if (baseVerification == 2) baseVerification = "중간"
        if (baseVerification == 3) baseVerification = "높음"
        if (baseVerification == 4) baseVerification = "매우 높음"

        let msgNotification = guild.defaultMessageNotifications;
        if (msgNotification == 0) msgNotification = "모든 메시지"
        if (msgNotification == 1) msgNotification = "@mention만"


        const embed = new EmbedBuilder()
        .setTitle(`**${name} 서버 정보**`)
        .setColor("Yellow")
        .setTimestamp()
        .setThumbnail(`https://cdn.discordapp.com/icons/${id}/${icon}.webp?size=4096`)
        .addFields(
            { name: "서버 소유자", value:`**<@${ownerId}><:Server_Owner:1099667334412652644> (${ownerId})**`},
            { name: "서버 이름", value:`**${name}**`, inline: true },
            { name: "서버 아이디", value: `**${id}**`, inline: true },
            { name: "서버 생성일", value: `**<t:${parseInt(createdTimestamp / 1000)}:D>**` , inline: true},
            { name: "멤버 수", value: `**${memberCount}명**`,inline: true},
            { name: "역할 수", value: `**${roles.cache.size}개**`, inline: true },
            { name: "채널 수", value: `**${channels.cache.size}개**`, inline: true },
            { name: "기본 알림 설정", value: `**${msgNotification}**`, inline: true },
            { name: "서버 보안 수준", value: `**${baseVerification}**`, inline: true },
            { name: "서버 부스트 레벨", value: `**${premiumSubscriptionCount} 레벨**`, inline: true },
        );
        interaction.editReply({embeds: [embed] });
    },
};