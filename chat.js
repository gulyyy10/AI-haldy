function simulateClick(text) {
  document.getElementById('user-input').value = text;
  sendMessage();
}

async function sendMessage() {
  const input = document.getElementById('user-input');
  const messagesContainer = document.getElementById('chatbot-messages');
  const text = input.value.trim();
  if (!text) return;

  const userMsg = document.createElement('div');
  userMsg.className = 'msg user';
  userMsg.textContent = text;
  messagesContainer.appendChild(userMsg);
  input.value = '';

  const loadingMsg = document.createElement('div');
  loadingMsg.className = 'msg bot';
  loadingMsg.textContent = 'Přemýšlím...';
  messagesContainer.appendChild(loadingMsg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    loadingMsg.remove();

    const botMsg = document.createElement('div');
    botMsg.className = 'msg bot';
    botMsg.textContent = data.message || 'Žádná odpověď od AI.';
    messagesContainer.appendChild(botMsg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  } catch (error) {
    loadingMsg.remove();
    const botMsg = document.createElement('div');
    botMsg.className = 'msg bot';
    botMsg.textContent = 'Chyba při komunikaci s AI.';
    messagesContainer.appendChild(botMsg);
  }
}
