const { Telegraf } = require('telegraf');
require('dotenv').config()
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

let userId = ''
module.exports = function (app) {
    bot.launch();
    app.get('/', async (req, res) => {
        try {
            // bot.context.db = { userId: '' }
            bot.start((ctx) => {
                ctx.reply(`Hello, ${ctx.message.chat.id}.\nI'm your ToDo reminder.\nYou can add remind date for any of your tasks and I'll send you notification.`)
                userId = ctx.message.chat.id
                console.log('Successfully connected with ' + userId)
                
            })
            // bot.on('text', async (ctx, next) => {
            //     // Explicit usage
            //     await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello, Im your ToDo reminder.`)
            //     ctx.db.userId = await ctx.message.chat.id
            //     userId = ctx.db.userId
            //     // Using context shortcut
            //     await ctx.reply(`Your chat id is: ${ctx.db.userId}`)
            //     await console.log('ctx.db.userId: ' + ctx.db.userId)
            //     await console.log('userId: ' + userId)
            //     // return {
            //     //     userId: userId
            //     // }
            //     // return next()
            // });
            
            process.once('SIGINT', () => bot.stop('SIGINT'));
            process.once('SIGTERM', () => bot.stop('SIGTERM'));
            res.json(userId)
        } catch (e) {
            bot.stop()
            console.log(e)
            res.send(e)
        }
    })
}