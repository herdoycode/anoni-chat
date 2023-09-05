import { ReactNode, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useThemeStore } from "../store";

interface Props {
  children: ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const mode = useThemeStore((s) => s.mode);
  useEffect(() => {
    const body = document.querySelector("body");
    body?.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <>
      {children} <ToastContainer theme={mode} />
    </>
  );
};

export default ThemeProvider;
