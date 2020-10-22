# PASSbot
Adds functionality to the University of Manchester PASSbot to allow students to anonymously send feedback to SSC reps.

### Issues & Suggestions

This is intended as an addon to the existing PASSbot. It took about 30 minutes to throw together and hence is very basic. Suggestions via the Issues page and contributions by Pull Requests are welcomed and encouraged.

### Installation Guide

1. Clone the repository.
2. Navigate to the directory you've cloned the repository to and run `npm install`.
3. Rename `config-sample.json` to `config.json`.
4. Add your Discord bot token and the SSC reps' channel ID to the relevant sections of the `config.json` file.
5. Run `node app.js`. You should get a console message to confirm the bot is logged in.

### Credits

- Thank you to Amish Shah (and all other contributors) for the amazing Discord.js module.
- Thank you to Javier Pacheco Rodríguez for hosting this and the existing PASSbot.