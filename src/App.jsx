import { Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import WelcomePage from "./pages/WelcomeScreen";
import HomePage from "./pages/Homescreen";
import ChatUIS from "./components/ChatUi";
import { useState } from "react";
import ChatUI from "./components/ChatUi";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route
        path="/welcome"
        element={
          !isAuthenticated ? (
            <ChatUI onLogin={() => setIsAuthenticated(true)} />
          ) : (
            <Navigate to="/home" replace />
          )
        }
      />
      <Route
        path="/home"
        element={
          isAuthenticated ? <HomePage /> : <Navigate to="/welcome" replace />
        }
      />
    </Routes>
  );
}

export default App;
