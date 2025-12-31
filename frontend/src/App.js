import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import PasteForm from "./components/PasteForm/PasteForm";
import PastePage from "./pages/PastePage";


function App() {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Pastebin Lite</h1>

      <Routes>
        <Route path="/" element={<PasteForm />} />
        <Route path="/p/:id" element={<PastePage />} />
      </Routes>
    </div>
  );
}

export default App;
