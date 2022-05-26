const telegramBot = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const api = '5302178408:AAHY_QKojp_chyONfY5pNImgQXZus0rc2Z8'

const bot = new telegramBot(api, { polling: true })

const chats = {};

const startGame = async (chatId, User) => {
    await bot.sendMessage(chatId, ` ${User} You need to guess jojo character which I guess `);
    const jojoCharacters = ['Jotaro', 'Jolihn', 'Josuke', 'Giorno', 'Joseph', 'Johnatan'];
    const randomJojoNumber = Math.floor(Math.random() * jojoCharacters.length);
    const randomJojo = jojoCharacters[randomJojoNumber];
    chats[chatId] = randomJojo;
    console.log(randomJojo);

    await bot.sendMessage(chatId, 'Guess Jojo', gameOptions);
}



const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'start command' },
        { command: '/info', description: 'indo command' },
        { command: '/game', description: 'game command' }
    ])

    bot.on("message", async msg => {
        const text = msg.text
        const chatId = msg.chat.id
        const User = msg.chat.first_name
        if (text === '/start') {
            await bot.sendMessage(chatId, `Hi ${User}`)
            return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/e39/5d2/e395d287-1fe2-3988-a0b0-6f6a215ea77e/6.webp')
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `I'm bot make by Al-An and your name ${User}`)
        }
        if (text === '/game') {
            return startGame(chatId, User)
        }
        bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/e39/5d2/e395d287-1fe2-3988-a0b0-6f6a215ea77e/192/7.webp')
        return bot.sendMessage(chatId, `${User}, I dont understand you`)
    })


    bot.on('callback_query', async msg => {
        const data = msg.data;
        const User = msg.from.first_name
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId, User)
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `You right it's ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `Your answer it's wrong, it's  ${chats[chatId]}`, againOptions)

        }
    })
}

start()