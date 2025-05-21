
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

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer sk-proj-...TVŮJ_KLÍČ_SEM_NEZADÁVEJ_PŘÍMO'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Jsi chytrý asistent zaměřený na reality na splátky, investice a auta.' },
        { role: 'user', content: text }
      ]
    })
  });

  const data = await response.json();
  loadingMsg.remove();

  const botMsg = document.createElement('div');
  botMsg.className = 'msg bot';
  botMsg.textContent = data.choices?.[0]?.message?.content || 'Něco se pokazilo.';
  messagesContainer.appendChild(botMsg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
