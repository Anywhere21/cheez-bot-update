const { ChannelType, SlashCommandBuilder } = require("discord.js");
const client = require("../index");

module.exports = {
    name : "interactionCreate",
    once : false,
    /**
     * 
     * @param {import("discord.js").Interaction} interaction 
     */
    async execute(interaction) {
        if(!interaction.isChatInputCommand() && !interaction.isContextMenuCommand()) return;
        const isChat = interaction.isChatInputCommand();
        const command = client.commands.filter(x=>x.data.name == interaction.commandName && (x.data instanceof SlashCommandBuilder) == isChat).at(0);
        if(!command) return;
        try {
            await command.execute(interaction);
        } catch (error) {
            console.log(error);
        }
    },
};