var countdown = 30;
var letters = "";

const socket = new WebSocket('wss://p00743q402.execute-api.eu-west-2.amazonaws.com/production')

socket.addEventListener('open', e => {
  console.log('WebSocket is connected')
})

socket.addEventListener('close', e => console.log('WebSocket is closed'))

socket.addEventListener('error', e => console.error('WebSocket is in error', e))

socket.addEventListener('message', e => {
  console.log(e)

  const action = JSON.parse(e.data).action
  console.log(action)
  switch(action) {
    case 'created':
      created_game(e)
      break;
    case 'started':
      started_game(e)
      break;
    case 'ended':
      ended_game(e)
      break
  }
})


function searchForGame() {
    const payload = {
      action: 'search'
    }
    socket.send(JSON.stringify(payload))
}

function startTimer() {
    var x = setInterval(function () {
        countdown--;

        var elemTimer = document.getElementById('timer');
        elemTimer.innerHTML = countdown;

        if (countdown == 0) {
            clearInterval(x)
        }
    }, 1000);
}

function created_game(e) {
  const opp = JSON.parse(e.data).opponent
  letters = JSON.parse(e.data).letters

  console.log('Opponent:', opp)
  var oppEl = document.getElementById('opponent');
  oppEl.innerText = 'Opponent: ' + opp
}

function started_game(e) {
  var lettersEl = document.getElementById('letters');
  lettersEl.innerText = letters

  startTimer()
}

function ended_game(e) {
    console.log('Ending game')
    const answer = document.getElementById("answer").value
    const gameId = JSON.parse(e.data).gameId
    sendResult(gameId, answer)
}

function sendResult(gameId, answer) {
    const payload = {
      action: 'results',
      answer: answer,
      gameId: gameId
    }
    socket.send(JSON.stringify(payload))
}