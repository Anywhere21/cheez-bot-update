const { ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");
const createUserInfo = require('../../utils/userInfo');


module.exports = {
    data : new ContextMenuCommandBuilder()
    .setName("유저정보")
    .setType(ApplicationCommandType.User),
    /**
     * 
     * @param {import("discord.js").UserContextMenuCommandInteraction} interaction 
     */
    async execute(interaction){
        await interaction.deferReply();
        const user = interaction.targetUser;
        console.log(user);
        const embed = createUserInfo(user);
        interaction.editReply({embeds: [embed] });
    },
};