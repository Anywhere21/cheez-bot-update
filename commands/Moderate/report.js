const { ApplicationCommandType, ContextMenuCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require("discord.js");

module.exports = {
    data : new ContextMenuCommandBuilder()
    .setName("유저신고")
    .setType(ApplicationCommandType.User),
    /**
     * 
     * @param {import("discord.js").UserContextMenuCommandInteraction} interaction 
     */
    async execute(interaction) {
        const user = interaction.targetUser;
        console.log(user);
        const modal = new ModalBuilder().setCustomId("report").setTitle("유저를 신고합니다.")
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
    .setDescription(`**유저 : <@${user.id}> (${user.globalName || user.username})\n\n아이디 : ${user.id}\n\n사유 : ${reason_value}**`)
    .setFooter({text : `신고자 : ${interaction.user.globalName || interaction.user.username} (${interaction.user.id})`})
    .setColor("Yellow")
    .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}?size=4096`);

    const developer_channel = interaction.client.channels.cache.get(
        "1074222288645410889"
        );

    developer_channel.send({embeds: [embed]});
    
    collector.reply({
        ephemeral: true,
        content: `**신고가 접수되었습니다!**`
    })
}
    },
};