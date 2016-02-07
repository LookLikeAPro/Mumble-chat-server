import mumble from "mumble";
import buildChannelTree from "../utils/buildChannelTree";

var options = {
	key: "",
	cert: ""
};

console.log("Connecting");
mumble.connect("mumble://104.196.9.223", options, function ( error, connection ) {
	if(error) { throw new Error(error); }
	console.log("Connected");
	connection.on("ready", function() {
		console.log("Ready!");
		console.log(buildChannelTree(connection.rootChannel, 0));
		console.log("Those were all channels!");
		console.log("Users:");
		var list = connection.users();
		for (var key in list) {
			var user = list[key];
			console.log("  - " + user.name + " in channel " + user.channel.name);
		}
		console.log("\nThose were all users!");
		// var desiredChannel = connection.rootChannel.children.filter(function(channel) {
		// 	return channel.name === "260918";
		// })[0];
		// desiredChannel.join();
	});
	connection.on("channel-move", function(channel, from, to) {
		console.log("Channel " + channel.name + " was moved from " + from.name + " to " + to.name );
	});
	connection.on("channel-links-add", function(channel, links) {
		for(var key in links) {
			console.log("Channel " + links[key].name + " was linked to " + channel.name);
		}
	});
	connection.on("channel-links-remove", function(channel, links) {
		for(var key in links) {
			console.log("Channel " + links[key].name + " was unlinked from " + channel.name);
		}
	});
	connection.on("channel-rename", function(channel, oldName, newName) {
		console.log("Channel " + oldName + " was renamed to " + newName);
	});
	connection.on("user-mute", function(user, muted, actor) {
		console.log("User " + user.name + " changed mute to: " + muted + " by " + actor.name );
	});
	connection.on("user-self-deaf", function(user, deaf, actor) {
		console.log("User " + user.name + " changed deaf to: " + deaf + " by " + actor.name );
	});
	connection.on("user-self-mute", function(user, muted, actor) {
		console.log("User " + user.name + " changed self-mute to: " + muted + " by " + actor.name );
	});
	connection.on("user-suppress", function(user, suppress, actor) {
		console.log("User " + user.name + " changed suppress to: " + suppress + " by " + actor.name );
	});
	connection.on("user-move", function(user, fromChannel, toChannel, actor) {
		console.log("User " + user.name + " moved from channel " + fromChannel.name + " to " + toChannel.name + " by " + actor.name );
	});
	connection.on("user-recording", function( user, state , actor) {
		console.log("User " + user.name + ( state ? " started" : " stopped" ) + " recording"  + " by " + actor.name );
	});
	connection.on("user-disconnect", function(user) {
		console.log("User " + user.name + " disconnected");
	});
	connection.on("user-connect", function(user) {
		console.log("User " + user.name + " connected");
	});
	connection.on("channel-create", function(channel) {
		console.log("Channel " + channel.name + " created");
	});
	connection.on("channel-remove", function(channel) {
		console.log("Channel " + channel.name + " removed");
	});
	connection.on( "textMessage", function (data) {
		//check actor null, is server message
    console.log(data.message);
  });
	connection.authenticate("ExampleUser");
});

export function run() {
	console.log("fucking lol");
}
