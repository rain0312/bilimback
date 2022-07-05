const express = require('express')
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 8999
const TelegramBot = require('node-telegram-bot-api');
var token = "5550945630:AAEr-lkttfiPtdiKfqce9IG57n7eRPo6rI0"
const bot = new TelegramBot(token, {polling: true});
var app = express();
app.use(express.json()) 

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

app.listen(PORT, () => {
  console.log("Server running on port 8999");
 });

 app.post("/send-email", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  let message = `Имя: ${req.body.name}\nEmail: ${req.body.email}\nДата: ${req.body.date}\nНомер телефона: ${req.body.phone}\nДополнительное описание: ${req.body.message}`
  bot.sendMessage(466485762, message);
 });