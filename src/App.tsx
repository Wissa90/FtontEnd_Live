import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthRoutes } from "./domain/auth/AuthRoutes";
import { ChatRoutes } from "./domain/chat/ChatRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/chat/*" element={<ChatRoutes />} />
        <Route path="*" element={<div>404 Page Not Found</div>} />{" "}
        {/* Fallback route */}
      </Routes>
    </Router>
  );
}

export default App;
