import { Route, Routes } from "react-router";  
import { TareasScreen } from "../components/screens/tareasScreen/TareasScreen";
import { BacklogScreen } from "../components/screens/backlogscreen/BacklogScreen";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<TareasScreen />} />
      <Route path="/backlog" element={<BacklogScreen />} />
    </Routes>
  );
};
