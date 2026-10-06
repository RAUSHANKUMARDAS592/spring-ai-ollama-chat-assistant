import { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim() || loading) return;

    const question = inputText.trim();

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: question }
    ]);

    setInputText("");
    setLoading(true);

    try {
      const response = await fetch(
          `http://localhost:8081/api/v1/chat?inputText=${encodeURIComponent(question)}`
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const answer = await response.text();

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: answer }
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, something went wrong. Please check Spring Boot and Ollama."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const newChat = () => {
    setMessages([]);
    setInputText("");
  };

  return (
      <div className="app">

        {/* SIDEBAR */}
        <aside className="sidebar">

          <div className="logo">
            <div className="logo-icon">🤖</div>
            <div>
              <h2>AI Assistant</h2>
              <span>Powered by Ollama</span>
            </div>
          </div>

          <button className="new-chat" onClick={newChat}>
            <span>＋</span>
            New Chat
          </button>

          <div className="menu">
            <div className="menu-item active">
              <span>💬</span>
              Current Chat
            </div>

            <div className="menu-item">
              <span>🕘</span>
              Chat History
            </div>
          </div>

          <div className="sidebar-bottom">
            <div className="menu-item">
              <span>⚙️</span>
              Settings
            </div>

            <div className="model-info">
              <div className="status-dot"></div>
              <div>
                <strong>Llama 3.2</strong>
                <small>Local AI Model</small>
              </div>
            </div>
          </div>

        </aside>

        {/* MAIN CHAT */}
        <main className="chat-container">

          {/* HEADER */}
          <header className="chat-header">
            <div>
              <h1>AI Assistant</h1>
              <div className="online">
                <span></span>
                Online
              </div>
            </div>

            <button className="header-button" onClick={newChat}>
              🗑️ Clear
            </button>
          </header>

          {/* MESSAGES */}
          <section className="messages">

            {messages.length === 0 && (
                <div className="welcome">

                  <div className="welcome-icon">
                    🤖
                  </div>

                  <h2>How can I help you today?</h2>

                  <p>
                    Ask me anything about Java, Spring Boot,
                    programming, or technology.
                  </p>

                  <div className="suggestions">

                    <button
                        onClick={() => setInputText("Explain Spring Boot")}
                    >
                      ☕ Explain Spring Boot
                    </button>

                    <button
                        onClick={() => setInputText("What is Java Stream API?")}
                    >
                      💻 Java Stream API
                    </button>

                    <button
                        onClick={() => setInputText("Explain REST API")}
                    >
                      🌐 REST API
                    </button>

                  </div>

                </div>
            )}

            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`message-row ${
                        message.sender === "user" ? "user-row" : "ai-row"
                    }`}
                >

                  <div className="avatar">
                    {message.sender === "user" ? "👤" : "🤖"}
                  </div>

                  <div className="message-content">

                    <div className="sender-name">
                      {message.sender === "user" ? "You" : "AI Assistant"}
                    </div>

                    <div className="message-text">
                      {message.text}
                    </div>

                  </div>

                </div>
            ))}

            {loading && (
                <div className="message-row ai-row">

                  <div className="avatar">
                    🤖
                  </div>

                  <div className="message-content">

                    <div className="sender-name">
                      AI Assistant
                    </div>

                    <div className="typing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                  </div>

                </div>
            )}

          </section>

          {/* INPUT */}
          <div className="input-section">

            <div className="input-box">

              <input
                  type="text"
                  placeholder="Message AI Assistant..."
                  value={inputText}
                  onChange={(event) => setInputText(event.target.value)}
                  onKeyDown={handleKeyDown}
              />

              <button
                  className="send-button"
                  onClick={sendMessage}
                  disabled={loading || !inputText.trim()}
              >
                ➤
              </button>

            </div>

            <p>
              AI Assistant can make mistakes. Powered by Spring AI + Ollama + Llama 3.2
            </p>

          </div>

        </main>

      </div>
  );
}

export default App;