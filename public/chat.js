const socket = io()

const form = document.getElementById("form");
const input = document.getElementById("input");
const list = document.getElementById("messages");
const user = document.getElementById("name");


form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (input.value && user.value) {
        socket.emit("chat message", { name: user.value,  message: input.value });
        input.value = "";
    }  
})
 socket.on("chat message", function (msg) {
   const item = document.createElement("li");
   item.textContent = `${msg.name}: ${msg.message}`;
   messages.appendChild(item);
   window.scrollTo(0, document.body.scrollHeight);
 });