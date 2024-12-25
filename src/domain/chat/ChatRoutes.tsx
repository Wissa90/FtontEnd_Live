import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../common/components/PrivateRoute";
import { Chat } from "./pages/Chat";

const ChatRoutes = () => (
  <Routes>
    <Route element={<PrivateRoute />}>
      <Route path="/" element={<Chat />} />
    </Route>
  </Routes>
);

export { ChatRoutes };
