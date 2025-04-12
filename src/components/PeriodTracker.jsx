import React, { useState, useEffect } from "react";

const PeriodTracker = () => {
  // Form state
  const [formData, setFormData] = useState({
    lastPeriodDate: "",
    cycleLength: 28,
    periodDuration: 5,
  });

  // Tracker state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("cycleData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
      setHasSubmitted(true);
    }
  }, []);

  // Form handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("cycleData", JSON.stringify(formData));
    setHasSubmitted(true);
  };

  // Calculate period dates
  const calculatePeriodDates = () => {
    if (!formData.lastPeriodDate) return {};

    const lastPeriod = new Date(formData.lastPeriodDate);
    const cycleLength = parseInt(formData.cycleLength);
    const periodDuration = parseInt(formData.periodDuration);

    const nextPeriodStart = new Date(lastPeriod);
    nextPeriodStart.setDate(nextPeriodStart.getDate() + cycleLength);

    const nextPeriodEnd = new Date(nextPeriodStart);
    nextPeriodEnd.setDate(nextPeriodEnd.getDate() + periodDuration - 1);

    const fertileWindowStart = new Date(nextPeriodStart);
    fertileWindowStart.setDate(fertileWindowStart.getDate() - 14);

    const fertileWindowEnd = new Date(fertileWindowStart);
    fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 5);

    return {
      nextPeriodStart,
      nextPeriodEnd,
      fertileWindowStart,
      fertileWindowEnd,
      periodDuration,
    };
  };

  const periodDates = calculatePeriodDates();

  // Check if today is the day before period starts
  useEffect(() => {
    if (periodDates.nextPeriodStart) {
      const today = new Date();
      const reminderDate = new Date(periodDates.nextPeriodStart);
      reminderDate.setDate(reminderDate.getDate() - 1);

      if (
        today.getDate() === reminderDate.getDate() &&
        today.getMonth() === reminderDate.getMonth() &&
        today.getFullYear() === reminderDate.getFullYear()
      ) {
        alert("Your period is expected to start tomorrow!");
      }
    }
  }, [periodDates.nextPeriodStart]);

  // Generate calendar days
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];
    let dayCounter = 1;

    // Previous month days
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-12 border"></div>);
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(year, month, day);
      let dayClass = "h-12 border flex items-center justify-center";

      // Check if day is in period range
      if (
        periodDates.nextPeriodStart &&
        periodDates.nextPeriodEnd &&
        currentDay >= periodDates.nextPeriodStart &&
        currentDay <= periodDates.nextPeriodEnd
      ) {
        dayClass += " bg-pink-200 font-bold";
      }

      // Check if day is in fertile window
      if (
        periodDates.fertileWindowStart &&
        periodDates.fertileWindowEnd &&
        currentDay >= periodDates.fertileWindowStart &&
        currentDay <= periodDates.fertileWindowEnd
      ) {
        dayClass += " bg-green-100";
      }

      // Check if today
      const today = new Date();
      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayClass += " border-2 border-purple-500";
      }

      calendarDays.push(
        <div key={`day-${day}`} className={dayClass}>
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  const handleAiSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would call an AI API
    setAiResponse(
      `BintiAI: Thanks for your question about "${aiQuestion}". For accurate information about your cycle, please consult with your healthcare provider.`
    );
    setAiQuestion("");
  };

  if (!hasSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-purple-800 mb-6">
            Health Information
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Period Date
              </label>
              <input
                type="date"
                name="lastPeriodDate"
                value={formData.lastPeriodDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Average Cycle Length (days)
              </label>
              <input
                type="number"
                name="cycleLength"
                value={formData.cycleLength}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                min="20"
                max="45"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Period Duration (days)
              </label>
              <input
                type="number"
                name="periodDuration"
                value={formData.periodDuration}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                min="1"
                max="10"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
            >
              Continue to Period Tracker
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-purple-800 mb-6">
          Your Period Tracker
        </h1>

        {/* Calendar Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  const prevMonth = new Date(currentDate);
                  prevMonth.setMonth(prevMonth.getMonth() - 1);
                  setCurrentDate(prevMonth);
                }}
                className="p-1 rounded hover:bg-gray-100"
              >
                &lt;
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="p-1 rounded hover:bg-gray-100"
              >
                Today
              </button>
              <button
                onClick={() => {
                  const nextMonth = new Date(currentDate);
                  nextMonth.setMonth(nextMonth.getMonth() + 1);
                  setCurrentDate(nextMonth);
                }}
                className="p-1 rounded hover:bg-gray-100"
              >
                &gt;
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-medium text-sm py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
        </div>

        {/* Period Prediction */}
        {periodDates.nextPeriodStart && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Your Cycle Information
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Next Period:</span>{" "}
                {periodDates.nextPeriodStart.toDateString()} -{" "}
                {periodDates.nextPeriodEnd.toDateString()}
              </p>
              <p>
                <span className="font-medium">Fertile Window:</span>{" "}
                {periodDates.fertileWindowStart.toDateString()} -{" "}
                {periodDates.fertileWindowEnd.toDateString()}
              </p>
            </div>
          </div>
        )}

        {/* BintiAI Chat */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <button
            onClick={() => setShowChat(!showChat)}
            className="flex items-center justify-between w-full mb-4"
          >
            <h2 className="text-xl font-semibold">BintiAI Assistant</h2>
            <span>{showChat ? "▲" : "▼"}</span>
          </button>

          {showChat && (
            <div className="border rounded-lg p-4">
              {aiResponse && (
                <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                  {aiResponse}
                </div>
              )}
              <form onSubmit={handleAiSubmit} className="flex">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Ask me anything about your cycle..."
                  className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700"
                >
                  Ask
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeriodTracker;
