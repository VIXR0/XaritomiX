const weather = require("weather-js");

exports.run = (client, message, args, Discord) => {
    loc = args[0];

    if(!loc) message.channel.send("Usage: !weather <city>");

    weather.find({
        search: loc,
        degreeType: 'C'
    }, function(err, result) {
        if (err) console.log(err)

        let temperatureC = result[0].current.temperature + "° C";
        let feelsLikeC = result[0].current.feelslike + "° C";
        let humidityP = result[0].current.humidity + "%";

        if(loc) {
            let weatherEmbed = new Discord.RichEmbed()
            .setColor('0xffffff')
            .addField('Weather Data For', result[0].location.name)
            .addField('Temperature', temperatureC, true)
            .addField('Feels Like', feelsLikeC, true)
            .addField('Humidity', humidityP, true)
            .addField('Wind Speed', result[0].current.winddisplay, true);

            message.channel.send(weatherEmbed);
        }
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "weather",
    description: "Gets the local weather for the user",
    usage: "weather <city>"
};