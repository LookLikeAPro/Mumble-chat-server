function wrapper(channel, level) {
	var tree = "";
	function buildChannelTree(channel, level) {
		for (var i = 0; i < level; i++) {
			tree += "   ";
		}
		tree += "  - " + channel.name + ": ";
		for(var u in channel.users) {
			var user = channel.users[u];
			tree += user.name + ", ";
		}
		tree += "\n";
		for(var c in channel.children) {
			buildChannelTree(channel.children[c], level + 1);
		}
	}
	buildChannelTree(channel, level);
	return tree;
}

export default wrapper;
