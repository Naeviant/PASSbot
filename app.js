const config = require("./config.json"),
	  Discord = require("discord.js"),
	  client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", message => {
	if (message.channel.type == "dm" && message.author.id != client.user.id) {
		client.channels.fetch(config.sscChannelId).then(channel => {
			channel.send(message.content);
		});
		message.reply("Your feedback has been sent anonymously to the Student Staff Committee representatives. Thank you.");
	}
});

client.login(config.botToken);