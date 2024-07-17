const { SlashCommandBuilder,  } = require("discord.js")
const { } = require("../..")

module.exports = {
    data :new SlashCommandBuilder().setName("서포트-서버").setDescription("서포트 서버 링크를 불러옵니다."),
    /**
     * 
     * @param {import("discord.js").CommandInteraction} interaction 
     */
    async execute(interaction){
        await interaction.reply({content: `서포트 서버 놀러오세요!\nhttps://discord.gg/f4sa44Dj34`})
    }
}