import express from "express";

var router = express.Router();



// define the home page route
router.get("/", function(req, res) {
	var url = req.query.url;
	const spawn = require('child_process').spawn;
	const query = spawn('youtube-dl', [url, "--get-description"]);

	query.stdout.on("data", (data) => {
		console.log(data);
		res.send("Birds home page");
	});

	// query.stderr.on('data', (data) => {
	// 	console.log(`stderr: ${data}`);
	// });

	// query.on('close', (code) => {
	// 	console.log(`child process exited with code ${code}`);
	// });

});

export default router;
