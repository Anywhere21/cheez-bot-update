const { EmbedBuilder, Presence, UserPremiumType } = require('discord.js');

const badges = {
  BugHunterLevel1: "<:Bug_Hunter:1096705845317861436> ",
  BugHunterLevel2: "<:GoldBug_Hunter:1096708126209744896> ",
  CertifiedModerator: "<:Certified_Moderator:1099667332239999068> ",
  HypeSquadOnlineHouse1: "<:HypeSquad_Bravery:1096695915953279046> ",
  HypeSquadOnlineHouse2: "<:HypeSquad_Brilliance:1096696106697637939> ", 
  HypeSquadOnlineHouse3: "<:HypeSquad_Balance:1096695157316927489> ",
  Hypesquad: "<:HypeSquad_Events:1096709385213972490> ",
  Partner: "<:Partner:1096708360776196246> ",
  PremiumEarlySupporter: "<:Early_Supporter:1096706427738923028> ",
  Staff: "<:Discord_Staff:1096707523672809485> ",
  VerifiedBot: "<:Verified_Bot1:1102103932551049389><:Verified_Bot2:1102103929396936754> ",
  VerifiedDeveloper: "<:Verified_Developer:1096705237986856981> ",
  ActiveDeveloper: "<:Active_Developer:1096704682329645076> ",
  ApplicationCommands: "명령어 지원 ",
};

function createUserInfo(user, guild) {

  //presence.activities // 활동들
  //presence.clientStatus // 폰, 컴, 웹 에서의 온라인 여부

  let bot = user.bot ? "봇입니다." : "봇이 아닙니다.";


  const userFlags = user.flags.toArray();
  const timestamp = Math.floor(user.createdTimestamp / 1000);

  return new EmbedBuilder()
    .setTitle(`${user.globalName || user.username}님의 유저정보`)
    .setColor(user.accentColor || "Yellow")
    .setTimestamp()
    .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}?size=4096`)
    .addFields(
      { name: "유저 이름", value: `**${user} (${user.username})**` },
      { name: "별명", value: `**${user.globalName || user.username}**` },
      { name: "아이디", value: `**${user.id}**` },
      { name: "봇 여부", value: `**${bot}**` },
      { name: "배지", value: userFlags.length ? userFlags.map(flag => `**${badges[flag]}**`).join(' ') : '**배지가 없습니다.**' },
      { name: "계정 생성일", value: `**<t:${timestamp}:R> (<t:${timestamp}:D>)**` },
    );
}

module.exports = createUserInfo;