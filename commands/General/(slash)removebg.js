const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('배경제거')
		.setDescription('첨부된 첨부파일의 배경을 제거합니다.')
        .addAttachmentOption(option => option.setName('이미지').setDescription('배경을 제거할 첨부파일을 선택합니다.').setRequired(true)),
      
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const image = interaction.options.getAttachment('이미지');

        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-API-Key': 'poDwFF92eHCniZiYKjZko1dF',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                image_url: image.proxyURL,
                size: 'auto'
            })

        });

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const attachment = new AttachmentBuilder(buffer, { name: 'removebg.png'});
        
        const embed= new EmbedBuilder()
        .setColor("Yellow")
        .setTitle(`배경 제거됨`)
        .setImage(`attachment://removebg.png`)
        
        await interaction.editReply({ embeds: [embed], files: [attachment], ephemeral: true });
    },
};