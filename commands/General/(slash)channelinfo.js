const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { } = require('../..');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('채널정보')
		.setDescription('선택한 채널에 대한 정보를 보여줍니다.')
        .addChannelOption((option) =>

        option.setName("채널").setDescription("채널을 선택해주세요.").setRequired(false)
      ),
      
	async execute(interaction) {
        await interaction.deferReply();
        const { options } = interaction;
        const guild = interaction.guild;
        console.log(guild);
        const channel = options.getChannel("채널") || interaction.channel;
        const { name, id, topic, type, createdTimestamp, icon, rateLimitPerUser } = channel;
        console.log(channel);

        let topiic = channel.topic;
        if (topiic == null) topiic = " "

        let chtype = channel.type;
        if (chtype == 0) chtype = "<:Text:1186594773415501834> (텍스트)"
        if (chtype == 2) chtype = "<:Voice:1186594768566886400> (음성)"
        if (chtype == 4) chtype = "<:Folder:1186594905586413618> (카테고리)"
        if (chtype == 5) chtype = "<:Announcement:1186594763793768470> (공지)"
        if (chtype == 10) chtype = "<:Announcement:1186594763793768470> (공지 스레드)"
        if (chtype == 11) chtype = "<:Threads:1186595830463995984> (스레드)"
        if (chtype == 12) chtype = "<:Private_Thread:1112734053133713418> (비공개 스레드)"
        if (chtype == 13) chtype = "<:Stage:1186594777907609651> (스테이지)"
        if (chtype == 15) chtype = "<:Forum:1186594762011185172> (포럼)"
        if (chtype == 16) chtype = "<:Media:1186594758865469470> (미디어)"


        const embed = new EmbedBuilder()
        .setTitle(`**[${name}] 채널 정보**`)
        .setColor("Yellow")
        .setTimestamp()
        .setThumbnail(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=4096`)
        .addFields(
            { name: "채널 이름", value:`**<#${id}> (${name})**`, inline: false },
            { name: "채널 아이디", value: `**${id}**` },
            { name: "채널 주제", value: `${topiic}` },
            { name: "채널 분류", value: `**${chtype}**` },
            { name: "채널 생성일", value: `**<t:${parseInt(createdTimestamp / 1000)}:R> (<t:${parseInt(createdTimestamp / 1000)}:D>)**` , inline: true},
        );
        interaction.editReply({embeds: [embed] });
    },
};