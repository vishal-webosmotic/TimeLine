import { useState } from "react";
import "./App.css";
import CustomizedTimeline from "./components/TimeComp";
import "./components/i18n";
import i18n from "./components/i18n";
function App() {
  const languages = [
    { name: "Hindi", code: "hin" },
    { name: "Guj", code: "guj" },
    { name: "En", code: "en" },
  ];
  const [language, setLanguage] = useState("en");

  const handleChangeLocale = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="App">
      <CustomizedTimeline />
      <select onChange={handleChangeLocale} value={language}>
        {languages.map(({ name, code }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
