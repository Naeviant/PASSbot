const config = require("./config.json"),
	  Discord = require("discord.js"),
	  client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async message => {
  if (message.channel.type == "dm" && message.author.id != client.user.id && ! (message.content.startsWith('!') || message.content.startsWith(';') || message.content.startsWith('='))) {
    let msg = await message.reply("Would you like to send this message anonymously to the Student Staff Committee representatives?")
    await msg.edit("", new Discord.MessageEmbed()
                       .setTitle("Would you like to send this message anonymously to the Student Staff Committee representatives?")
                       .addField("React with ✅ to give confirmation and send your message.", "Your message is sent anonymously so please provide as much description of your issue as you can.")
                       .addField("React with ❌ to cancel.", "Your message will not be sent.")
                       .addField("React with ❔ to display a help message.", "Your message will not be sent.")
                       .setTimestamp())
    await msg.react('✅')
    await msg.react('❌')
    await msg.react('❔')
    msg.awaitReactions(reactions => ['✅', '❌', '❔'].includes(reactions.emoji.name), {max: 1, time: 30000}).then(reactions => {
      let reaction = reactions.first();
      if (reaction.emoji.name == '✅') {
        client.channels.fetch(config.sscChannelId).then(channel => {
          channel.send("<@&766971425801633822> There's new student feedback!").then(sentMessage => {
            const sentEmbed = new Discord.MessageEmbed()
            .setTitle("New student feedback")
            .setDescription(message.content).setTimestamp();
            sentMessage.edit("", sentEmbed).then(sent => {
              sent.pin()
            })
          })
        });
        const replyEmbed = new Discord.MessageEmbed()
        .setTitle("✅ Your feedback has been sent anonymously to the Student Staff Committee representatives.")
        .setDescription("Thank you for leaving your feedback. If this was a mistake, don't worry :)")
        .setColor(0xc800);
        message.reply("Your feedback has been sent anonymously to the Student Staff Committee representatives.").then(sentMessage => {sentMessage.edit("", replyEmbed)});
        msg.delete();
      }
      else if (reaction.emoji.name == '❌') {
        message.reply("Operation cancelled").then(sentMessage => {sentMessage.edit("", new Discord.MessageEmbed().setTitle("❌ Cancelled").setColor(0xd0021b).setDescription("This message has not been sent. Please write a new one (don't edit) and confirm the new message that you would like to send."))})
        msg.delete();
      }
      else if (reaction.emoji.name == '❔') {
        message.reply("To send a message to the Student Staff Committee representatives, please write a message and confirm that you would like to send the message by reacting with ✅.").then(sentMessage => {sentMessage.edit("", new Discord.MessageEmbed().setTitle("❔ Help Message").setDescription("To send a message to the Student Staff Committee representatives, please write a message and confirm that you would like to send the message by reacting with ✅.\n\nThese messages will be sent granting you complete anonymity. If you would like to receive a response, leave your details (e.g. Discord username#0000) so we can get back to you.\n\nPlease do not write enormously long messages you should write multiple shorter messages instead.\n\nThank you for informing yourself about this feature. If you would like to proceed sending a message please type a new one (do not edit)."))})
        msg.delete();

      }
    }).catch(error => {
      message.reply("Timed out!").then(sentMessage => {sentMessage.edit("", new Discord.MessageEmbed().setTitle("Timed out! You didn't select an option in time.").setDescription("Your message was not sent.").setColor(0xd0021b))})
      msg.delete();
    })
  }
});

client.login(config.botToken);
