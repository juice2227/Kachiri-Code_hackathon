import React, { useState, useRef, useEffect } from "react";

const ChatUI = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hey Alara! That's a great question and I'm really glad you reached out. Before we get into options, can you tell me - are you just looking for a more convenient method?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponses = [
        "I understand your concern about contraceptive options.",
        "Injectable contraceptives might be a good alternative if you're having trouble remembering to take pills daily.",
        "Many users find that switching methods helps with consistency. Would you like me to explain more about your options?",
        "Let me check some resources for you. What specific concerns do you have about your current method?",
        "Based on what you've shared, I'd recommend discussing these options with your healthcare provider.",
      ];
      setMessages((prev) => [
        ...prev,
        {
          text: botResponses[Math.floor(Math.random() * botResponses.length)],
          sender: "bot",
        },
      ]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-pink-50 to-white overflow-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white p-4 shadow-lg rounded-b-2xl">
        <div className="container mx-auto max-w-6xl px-2 sm:px-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-pink-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold">BintiAI</h1>
              <p className="text-xs opacity-90">
                Your trusted health companion
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 container mx-auto max-w-6xl px-2 sm:px-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[90%] xs:max-w-[85%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[65%] rounded-3xl p-4 ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-100"
              }`}
            >
              <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
                {message.text}
              </p>
              <div className="text-right mt-1">
                <span className="text-xs opacity-70">
                  {message.sender === "user" ? "You" : "BintiAI"} •{" "}
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 rounded-3xl rounded-bl-none p-4 shadow-md max-w-[65%] border border-gray-100">
              <div className="flex space-x-2 items-center">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                <span className="text-xs ml-2 text-gray-500">
                  BintiAI is typing
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm p-4 rounded-t-3xl">
        <div className="container mx-auto max-w-6xl px-2 sm:px-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your health question..."
              className="flex-1 border border-gray-300 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base shadow-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-full p-3 w-12 h-12 flex items-center justify-center hover:from-pink-700 hover:to-pink-600 disabled:opacity-50 shadow-md transform hover:scale-105 transition-all duration-200"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-center text-gray-500 mt-2">
            BintiAI provides health information, not medical advice
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
