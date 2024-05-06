const { EmbedBuilder, ActivityType, time, TimestampStyles } = require('discord.js');

module.exports = {
    name : "ready",
    once : true,
    async execute(client){
        console.log(`${client.user.tag} 로그인\n(${client.users.cache.size}명의 유저들과 노는 중)`);
        const status = await client.user.setPresence({
          status: 'online',
          activities: [{
            type: ActivityType.Custom,
            name: 'customstatus',
            state: `${client.users.cache.size}명의 유저들과 노는 중`
          }]
        }) 
        const embed = new EmbedBuilder()
        .setTitle(`치즈봇 <t:${Math.floor(Date.now() / 1000 )}:R> 재시작함`)
        .setDescription(`<t:${Math.floor(Date.now() / 1000 )}:f>`)
        .setColor("Yellow")
        const start_channel = client.channels.cache.get(
          "1117817234077786153"
          );
  
      start_channel.send({embeds: [embed]});
        
        }
}