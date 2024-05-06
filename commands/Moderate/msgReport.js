const { ApplicationCommandType, ContextMenuCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, messageLink, userMention, ClientUser } = require("discord.js");

module.exports = {
    data : new ContextMenuCommandBuilder()
    .setName("메시지 신고")
    .setType(ApplicationCommandType.Message),
    /**
     * 
     * @param {import("discord.js").MessageContextMenuCommandInteraction} interaction 
     */
    async execute(interaction) {
        const Message = interaction.targetMessage;
        console.log(Message);

        const user = Message.author;
        console.log(user);
        
        const modal = new ModalBuilder().setCustomId("report").setTitle("메시지를 신고합니다.")

        const reason = new ActionRowBuilder({
            components:[
                new TextInputBuilder()
                .setCustomId("reason")
                .setLabel("사유")
                .setStyle(TextInputStyle.Paragraph),
            ],
        });

        modal.addComponents(reason);

        await interaction.showModal(modal);

        const collector = await interaction.awaitModalSubmit({
            time: 10 * 60 * 1000,
        });

        if(collector){
            const reason_value = collector.fields.fields.get("reason")?.value;

            const embed = new EmbedBuilder()
            .setTitle(`신고 접수됨`)
            .setDescription(`**유저 : ${user.globalName || user.username} (${user.username}) \n\n메시지 : [메시지 바로 가기](https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${Message.id})\n\n사유 : ${reason_value}**`)
            .setFooter({text : `신고자 : ${interaction.user.globalName || interaction.user.username} (${user.id})`})
            .setColor("Yellow")
            .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}?size=4096`);
            
            const developer_channel = interaction.client.channels.cache.get(
                "1074222288645410889"
                );

            developer_channel.send({embeds: [embed]});

            collector.reply({
                ephemeral: true,
                content: `**신고가 접수되었습니다!\n\n(현재 신고 기능으로 들어온 신고들은\n서포트 서버로 접수되고 있습니다.\n빠른 시일 내에 신고채널 지정 명령어를 마련하겠습니다.)**`
            })
        }
    },
};