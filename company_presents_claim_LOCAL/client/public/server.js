var express = require('express')();
var server = require('http').Server(express);
var io = require("socket.io")(server, {
	handlePreflightRequest: (req, res) => {
		const headers = {
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
			"Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
			"Access-Control-Allow-Credentials": true
		};
		res.writeHead(200, headers);
		res.end();
	}
});

io.on('connection',  (socket) => {

	//User's Leave
	// socket.on('RequestUsersLeaveTable',  () => {
	// 	io.emit('GetUsersLeaveTable', )
	// })

//================================================================================ SAMPLE
	//Request - Multiple Parameter
	socket.on('RequestLinkMultiple',  (Data1, Data2, Data3) => {
		io.emit('SendLinkMultiple', Data1, Data2, Data3)
	})
//================================================================================ SAMPLE
});

//For auto refreshing

server.listen(9001, ()=> {
	console.log('socket.io server listen at 9001');
});
