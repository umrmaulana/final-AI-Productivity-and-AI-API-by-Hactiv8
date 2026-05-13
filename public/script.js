const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

const conversation = [];

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage("user", userMessage);
  conversation.push({ role: "user", text: userMessage });
  input.value = "";
  input.focus();

  const thinkingMessage = appendMessage("bot", "Thinking...");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ conversation }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    const botReply =
      typeof data?.result === "string"
        ? data.result.trim()
        : typeof data?.response === "string"
          ? data.response.trim()
          : "";

    if (!botReply) {
      updateMessage(thinkingMessage, "Sorry, no response received.");
      return;
    }

    updateMessage(thinkingMessage, botReply);
    conversation.push({ role: "model", text: botReply });
  } catch (error) {
    console.error("Failed to get response from server:", error);
    updateMessage(thinkingMessage, "Failed to get response from server.");
  }
});

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
  return message;
}

function updateMessage(messageElement, text) {
  messageElement.textContent = text;
  chatBox.scrollTop = chatBox.scrollHeight;
}
