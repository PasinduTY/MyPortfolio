import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../App";

const ToggleBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  background: ${(props) => (props.$isDark ? "#1A3D63" : "#E4EEF6")};
  color: ${(props) => (props.$isDark ? "#B3CFE5" : "#0A1931")};
  transition:
    background 0.15s ease,
    color 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background: ${(props) => (props.$isDark ? "#1E3050" : "#B3CFE5")};
  }

  i {
    font-size: 16px;
  }
`;

function ThemeToggler() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <ToggleBtn
      $isDark={isDark}
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <i className={isDark ? "ti ti-sun" : "ti ti-moon"} />
    </ToggleBtn>
  );
}

export default ThemeToggler;
