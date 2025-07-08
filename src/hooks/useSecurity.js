import { useState } from "react";
import { useDispatch } from "react-redux";
import { minimizeApp } from "../store/windowsManagerSlice";

export function useSecurity() {
  const [lockEnabled, setLockEnabled] = useState(null);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleEnableLock = () => {
    setLockEnabled(true);
  };

  const handleDisableLock = () => {
    localStorage.setItem("lock", JSON.stringify(false));
    localStorage.removeItem("securitypassword");
    setLockEnabled(false);
    setPassword("");
  };

  const handlePassword = (e) => {
    const value = e.target.value.trim();
    setPassword(value);
  };

  const handlePasswordSubmission = () => {
    if (password.length < 8) {
      alert("Password should be of 8 length");
      return;
    }
    localStorage.setItem("lock", JSON.stringify(true));
    localStorage.setItem("securitypassword", password);
    dispatch(minimizeApp("security"));
    setPassword("");
    alert("Password set");
  };

  return {
    lockEnabled,
    handleEnableLock,
    handleDisableLock,
    password,
    handlePassword,
    handlePasswordSubmission,
    setLockEnabled,
  };
}
