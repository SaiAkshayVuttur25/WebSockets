const socket = new WebSocket('ws://localhost:3000')
// webSocket = new WebSocket(url, protocols);
/*
1. this should be the URL to which the WebSocket server will respond. This should use the URL scheme wss://, although some software may allow you to use the insecure ws:// for a local connection. 
2. Either a single protocol string or an array of protocol strings. These strings are used to indicate sub-protocols, so that a single server can implement multiple WebSocket sub-protocols (for example, you might want one server to be able to handle different types of interactions depending on the specified protocol)
*/
function sendMessage(e) {
    e.preventDefault()
    const input = document.querySelector('input')
    if (input.value) {
        socket.send(input.value)
        //Once you've opened your connection, you can begin transmitting data to the server. To do this, call the WebSocket object's send()
        input.value = ""
    }
    input.focus()
}
/*
1. As establishing a connection is asynchronous and prone to failure there is no guarantee that calling the send() method immediately after creating a WebSocket object will be successful. We can at least be sure that attempting to send data only takes place once a connection is established by defining an onopen event handler to do the work:
    exampleSocket.onopen = (event) => {
        exampleSocket.send("Here's some text that the server is urgently awaiting!");
    };

2. One handy thing you can do is use JSON to send reasonably complex data to the server.
        const msg = {
            type: "message",
            text: document.getElementById("text").value,
            id: clientID,
            date: Date.now(),
        };
    Send the msg object as a JSON-formatted string.
        exampleSocket.send(JSON.stringify(msg));

3. Receiving messages from the server
        exampleSocket.onmessage = (event) => {
            console.log(event.data);
        };
 
*/

document.querySelector('form').addEventListener('submit', sendMessage)

// Listen for messages 
socket.addEventListener("message", ({ data }) => {
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})