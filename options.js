module.exports = {
    gameOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Jonathan', callback_data: 'Jonathan' }, { text: 'Joseph', callback_data: 'Joseph' }, { text: 'Jotaro', callback_data: 'Jotaro' }],
                [{ text: 'Josuke', callback_data: 'Josuke' }, { text: 'Giorno', callback_data: 'Giorno' }, { text: 'Jolihn', callback_data: 'Jolihn' }]
            ]
        })
    },
    againOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Play again', callback_data: '/again' }]

            ]
        })
    }
}