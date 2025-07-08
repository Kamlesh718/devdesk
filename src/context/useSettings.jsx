import { createContext, useContext, useEffect, useState } from "react";

const SettingContext = createContext();

function SettingsProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true; // default to dark
  });
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "Admin"
  );

  // Theme handler
  const handleTheme = () => {
    const newTheme = !theme;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Sync theme from localStorage
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme === "dark") setTheme(true);
  }, []);

  // Save user name
  const handleSaveUsername = () => {
    localStorage.setItem("username", username);
  };

  return (
    <SettingContext.Provider
      value={{
        theme,
        handleTheme,
        username,
        setUsername,
        handleSaveUsername,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}

const useSetting = () => {
  const context = useContext(SettingContext);

  if (context === undefined)
    throw new Error("Context used outside of the provider");
  return context;
};

export { SettingsProvider, useSetting };
