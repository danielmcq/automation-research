const https = require("https")

const username = process.argv[2] || process.env["ICOMFORT_USERNAME"]
const password = process.argv[3] || process.env["ICOMFORT_PASSWORD"]
const options = {
	host: "services.myicomfort.com",
	port: "443",
	protocol: "https:",
	// auth: username + ':' + password,
	// path: "/DBAcessService.svc/ValidateUser?UserName="+username,
	path: "/DBAcessService.svc/GetSystemsInfo?UserId="+username,
	headers: {
		'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
	},
	// method: "PUT"
	method: "GET"
};

var req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
  res.on("end", () => {
  	console.log("\n")
  })
});
req.end();

req.on('error', (e) => {
  console.error(e);
});