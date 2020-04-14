const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const fs = require('fs');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(TOKEN);

const mobs = {
  bonAppeti: 'Вивиан',
  terrorthorn: 'Шип',
  grimReaper: 'Жнец',
  hardrox: 'Голем',
  gargantua: 'Гаргантюа',
  megaMaggot: 'Магот',
  gryphon: 'Грифон',
  tidalTitan: 'Титан',
  blackwing: 'Чернокрыл',
  queenBee: 'Пчела',
  frostwing: 'Ледокрыл',
  noceros: 'Рино',
  jadeWyrm: 'Змей',
  saberfang: 'Саблезуб',
  voodooShaman: 'Шаман',
  snowBeast: 'Вьюжник',
  hellDrider: 'Драйдер',
  mechaTrojan: 'Конь',
};

const keyBoard = [
  [mobs.bonAppeti, mobs.terrorthorn, mobs.grimReaper],
  [mobs.hardrox, mobs.gargantua, mobs.megaMaggot],
  [mobs.gryphon, mobs.tidalTitan, mobs.blackwing],
  [mobs.queenBee, mobs.frostwing, mobs.noceros],
  [mobs.jadeWyrm, mobs.saberfang, mobs.voodooShaman],
  [mobs.snowBeast, mobs.hellDrider, mobs.mechaTrojan],
];

bot.start(({ reply }) => {
  return reply('Привет! Выбери моба, чтобы узнать какими героями его бить',
    Markup.keyboard(keyBoard).resize().extra()
  )
});

bot.hears(/(.*)/i, ctx => {
  const selectedMob = ctx.match[1];
  const selectedEntity = Object.entries(mobs).find(([key, value]) => value.includes(selectedMob));

  if (selectedEntity) {
    try {
      return ctx.replyWithPhoto({ source: fs.createReadStream(`src/images/${selectedEntity[0]}.jpg`) });
    } catch {
      return ctx.reply('Мне такой моб не знаком :( Выбери моба из меню ниже');
    }
  }

  return ctx.reply('Мне такой моб не знаком :( Выбери моба из меню ниже');
});

bot.launch({
  webhook: {
    domain: 'hackuna-bot.herokuapp.com',
    hookPath: '/RANDOM_ID',
    port: process.env.PORT ||  '0.0.0.0'
  }
});
