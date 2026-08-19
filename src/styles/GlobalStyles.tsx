import { createGlobalStyle } from "styled-components";
import cursor from "../assets/cursor.png";

export const GlobalStyle = createGlobalStyle`
:root {
  font-family: "Poppins", sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light;
  color: #f8fafc;
  background-color: #1e293b;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  --toastify-font-family: "Poppins", sans-serif;
  --toastify-color-error: #f87171;
  --toastify-color-success: #facc15;
  --toastify-color-progress-dark: #f472b6;
  --toastify-color-progress-light: #f472b6;
}

* {
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  cursor: url(${cursor}), auto !important;
}

*::selection {
  background: rgba(244, 114, 182, 0.4);
}

html {
  scroll-behavior: smooth;
  scrollbar-gutter: stable;
}

body {
  font-family: "Poppins", sans-serif !important;
  margin: 0;
  background: linear-gradient(180deg, #1e293b 0%, #334155 42%, #f9a8d4 100%);
  color: #f8fafc;
  min-width: 320px;
  min-height: 100vh;
  touch-action: manipulation;
}

#root {
  min-height: 100vh;
}

.MuiPaper-root,
.MuiButtonBase-root {
  font-family: "Poppins", sans-serif !important;
}

.MuiDialog-container {
  backdrop-filter: blur(8px);
}

a {
  text-decoration: none;
}

button {
  font-family: "Poppins", sans-serif;
}

.Toastify__toast-theme--light {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 12px 16px;
  border-radius: 18px;
  color: #1e293b;
  box-shadow: 0 12px 30px rgba(30, 41, 59, 0.18);
  user-select: none;
}

.MuiSlider-valueLabel {
  border-radius: 10px !important;
  box-shadow: 0 12px 30px rgba(30, 41, 59, 0.18) !important;
  text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2) !important;
  padding: 6px 14px !important;
  color: #1e293b !important;
  background: rgba(248, 250, 252, 0.96) !important;
  margin-top: 90px;
}

.MuiSlider-valueLabel::before,
.MuiSlider-valueLabel::after {
  display: none;
}

.MuiTooltip-tooltip {
  color: white !important;
  background-color: rgba(51, 65, 85, 0.9) !important;
  backdrop-filter: blur(6px) !important;
  padding: 8px 16px !important;
  border-radius: 8px !important;
  font-size: 12px !important;
  box-shadow: 0 10px 30px rgba(30, 41, 59, 0.2) !important;
}
`;
