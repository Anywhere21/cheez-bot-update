const { ApplicationCommandType, ContextMenuCommandBuilder, EmbedBuilder, messageLink } = require("discord.js");

module.exports = {
    data : new ContextMenuCommandBuilder()
    .setName("거짓말 탐지기")
    .setType(ApplicationCommandType.Message),
    /**
     * 
     * @param {import("discord.js").MessageContextMenuCommandInteraction} interaction 
     */
    async execute(interaction) {
        await interaction.deferReply()
        const Message = interaction.targetMessage;
        console.log(Message);

        const user = Message.author;
        console.log(user);

            const embed1 = new EmbedBuilder()
            .setTitle(`거짓말 탐지기`)
            .setDescription(`탐지중 .`)
            .setFooter({text : `탐지 종료까지 3초`})
            .setColor("Yellow")
            .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}?size=4096`);

            const embed2 = new EmbedBuilder()
            .setTitle(`거짓말 탐지기`)
            .setDescription(`탐지중 . .`)
            .setFooter({text : `탐지 종료까지 2초`})
            .setColor("Yellow")
            .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}?size=4096`);

            const embed3 = new EmbedBuilder()
            .setTitle(`거짓말 탐지기`)
            .setDescription(`탐지중 . . .`)
            .setFooter({text : `탐지 종료까지 1초`})
            .setColor("Yellow")
            .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}?size=4096`);

            var names = ['진실', '거짓'];
            var random_index = Math.floor(Math.random() * names.length);
            var result = names[random_index];

            let joosa = 'a'
            if (result == '거짓') {
                joosa = '으로'
            }
            else (joosa = '로')


            const finalembed = new EmbedBuilder()
            .setTitle(`${result}${joosa} 탐지됨`)
            .setDescription(`[메시지](https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${Message.id})가 ${result}${joosa} 판별되었습니다.`)
            .setTimestamp()
            .setColor("Yellow")
            .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}?size=4096`);

            if (result == '진실') {
                finalembed.setThumbnail(`https://cdn.discordapp.com/emojis/1086454663429247056.png`)
            }
            else {
                finalembed.setThumbnail(`https://cdn.discordapp.com/emojis/1086454712066392105.png`)
            }
            
            setTimeout(() => {
                interaction.editReply({embeds: [embed1]});
                setTimeout(() => {
                    interaction.editReply({embeds: [embed2]});
                    setTimeout(() => {
                        interaction.editReply({embeds: [embed3]});
                        setTimeout(() => {
                            interaction.editReply({embeds: [finalembed]});
            }, 1000);
        }, 1000);
    }, 1000);
    })

    }};