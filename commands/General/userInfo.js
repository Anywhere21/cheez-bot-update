const { SlashCommandBuilder } = require("discord.js");
const createUserInfo = require('../../utils/userInfo');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('유저정보')
    .setDescription('유저 정보를 보여줍니다.')
    .addUserOption(option =>
      option.setName('유저')
        .setDescription('정보를 불러올 유저를 선택하세요.')),
  async execute(interaction) {
    await interaction.deferReply();
    const { options } = interaction;
    const user = options.getUser("유저") || interaction.user;
    console.log(user)
    if (!user) return;
    const embed = createUserInfo(user);
    interaction.editReply({ embeds: [embed] });
  },
};