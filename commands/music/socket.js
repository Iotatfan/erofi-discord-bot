const WebSocket = require('ws')
const url = 'wss://listen.moe/gateway_v2'
let ws = null
let heartbeatInterval = null

module.exports = {
    name: 'connect',
    connect() {
        if (ws) ws.removeAllListeners()
        ws = new WebSocket(url)
        // console.log(ws)

        ws.on('open', this.onOpen.bind())
        ws.on('message', this.onMessage.bind(this))
        
        // Refactor Later

    },
    disconnect() {
        if(!ws) return
        return ws.close(1000)
    },
    heartbeat(interval) {
        heartbeatInterval = setInterval(() => {
            ws.send(JSON.stringify({ op: 9}))
        }, interval)
    },
    onOpen() {
        clearInterval(heartbeatInterval)
        heartbeatInterval = null
    },
    onMessage(data) {
        if (!data.length) return;
        let response
        try {
            response = JSON.parse(data);
            console.log(response)
        } catch (error) {
            return;
        }
        switch (response.op) {
            case 0:
                ws.send(JSON.stringify({ op: 9 }));
                this.heartbeat(response.d.heartbeat);
                break;
            case 1:
                if (response.t !== 'TRACK_UPDATE' && response.t !== 'TRACK_UPDATE_REQUEST' && response.t !== 'QUEUE_UPDATE' && response.t !== 'NOTIFICATION') break;
                console.log(response.d); // Do something with the data
                break;
            default:
                break;
        }
    },
    onclose(err) {
        clearInterval(heartbeatInterval)
        heartbeatInterval = null
        if (ws) {
            ws.close();
            ws = null
        }
    },
    currentSongGame() {
        
    }
}