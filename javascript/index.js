var ws;

function searchForGame() {	
	gameId = 101
	letters = "teiroadnce"
	
	location.href = 'game.html?gameId=' + gameId + "&letters=" + letters;
}

function connect() {
	var socket = new WebSocket('ws://localhost:8080/greeting');
	ws = Stomp.over(socket);

	ws.connect({}, function(frame) {
		ws.subscribe("/user/queue/errors", function(message) {
			alert("Error " + message.body);
		});

		ws.subscribe("/topic/user", function(message) {
			showGreeting(message.body);
		});
	}, function(error) {
		alert("STOMP error " + error);
	});
}

function disconnect() {
    if (ws != null) {
        ws.close();
    }
    setConnected(false);
    console.log("Disconnected");
}

function send() {
	var data = JSON.stringify({
		'playerId' : 999
	})
	ws.send("/app/playerQueue", {}, data);
}

function showGreeting(message) {
	console.log(message);
}