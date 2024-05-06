const { SlashCommandBuilder, EmbedBuilder, User } = require("discord.js")
const { RockPaperScissors } = require("discord-gamecord");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("가위바위보")
    .setDescription("다른 유저와 가위바위보를 진행합니다.")
    .addUserOption(option =>
        option.setName('유저')
          .setDescription('가위바위보를 할 상대를 선택하세요.')
          .setRequired(true)),
    async execute (interaction) {

        const { options } = interaction;
        const player = interaction.user;
        const targetUser = options.getUser("유저");

        const embed = new EmbedBuilder()
        .setTitle('오류 발생 <:warning:1088949545880277042>')
        .setDescription('봇을 상대로 가위바위보를 진행할 수 없습니다.')
        .setColor('Yellow')
        .setTimestamp()

        const embedd = new EmbedBuilder()
        .setTitle('<:warning:1088949545880277042> **오류 발생**')
        .setDescription('자기 자신을 상대로 가위바위보를 진행할 수 없습니다.')
        .setColor('Yellow')
        .setTimestamp()
 
        const Game = new RockPaperScissors({
            message: interaction,
            opponent: targetUser,
            embed: {
                title: '가위바위보',
                color: 'Yellow',
                description: '아래의 버튼을 눌러 선택하세요.'
            },
            buttons: {
                accept: '수락',
                reject: '거절',
                rock: '바위',
                paper: '보자기',
                scissors: '가위',
            },
            emojis: {
                rock: '✊',
                paper: '✋',
                scissors: '✌️',
            },
            mentionUser: true,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            requestMessage: '{player}님이 **가위바위보** 대결을 신청했어요.',
            rejectMessage: '{opponent}님이 **가위바위보** 대결 신청을 거절했어요.',
            pickMessage: '{emoji}를 선택했어요.',
            winMessage: '{player}님이 이겼습니다!',
            tieMessage: `무승부! ${player}님과 {opponent}, 둘다 같은걸 선택하셨네요.`,
            timeoutMessage: '시간 내에 응하지 않아 게임이 종료되었습니다.',
            playerOnlyMessage: '{player}과 {opponent}만 버튼을 누를 수 있습니다.',
            reqTimeoutMessage: '시간 내에 응답하지 않아 게임이 취소되었습니다.'
    
        });

        Game.startGame();
        Game.on('gameOver', result => {
        console.log(result);  // =>  { result... }
});
    }}