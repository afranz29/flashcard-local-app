import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Library } from "./pages/Library";
import { SetView } from "./pages/SetView";
import { SetEditor } from "./pages/SetEditor";
import { Study } from "./pages/Study";
import { Learn } from "./pages/Learn";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Library />} />
        <Route path="/sets/:setId" element={<SetView />} />
        <Route path="/sets/:setId/edit" element={<SetEditor />} />
        <Route path="/sets/:setId/study" element={<Study />} />
        <Route path="/sets/:setId/learn" element={<Learn />} />
      </Route>
    </Routes>
  );
}

export default App;
