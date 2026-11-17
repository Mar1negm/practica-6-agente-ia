// Si cambias el puerto o la dirección del backend, actualiza esta constante.
const API_URL = "http://localhost:3000/api/chat";

const conversationHistory = [];
const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const inputField = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");

chatForm.addEventListener("submit", sendMessage);

async function sendMessage(event) {
  event.preventDefault();

  const text = inputField.value.trim();
  if (!text) return;

  appendMessage(text, "user");
  inputField.value = "";
  inputField.focus();
  sendButton.disabled = true;
  sendButton.textContent = "Enviando...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        history: conversationHistory
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Ocurrió un error al consultar el servidor.");
    }

    const reply = data.reply || "No se recibió una respuesta.";
    appendMessage(reply, "assistant");

    conversationHistory.push(
      { role: "user", content: text },
      { role: "assistant", content: reply }
    );
  } catch (error) {
    console.error("Error de conexión:", error);
    appendMessage(error.message || "Error de conexión con el servidor.", "assistant");
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = "Enviar";
    inputField.focus();
  }
}

function appendMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
