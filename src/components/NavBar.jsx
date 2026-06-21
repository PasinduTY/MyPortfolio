import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import endpoints from "../constants/endpoints";
import ThemeToggler from "./ThemeToggler";

const Bar = styled.div`
  max-width: 1380px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 760px) {
    padding: 0 24px;
  }
`;

const NavRow = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid ${(props) => props.theme.border};
`;

const Logo = styled(NavLink)`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: ${(props) => props.theme.color};
  text-decoration: none;
`;

const Links = styled.div`
  display: flex;
  gap: 26px;
  align-items: center;

  @media (max-width: 760px) {
    display: none;
  }
`;

const StyledLink = styled(NavLink)`
  font-family: "Manrope", sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${(props) => props.theme.textSecondary};
  text-decoration: none;

  &.navbar__link--active {
    color: ${(props) => props.theme.accentColor};
  }

  @media (min-width: 1500px) {
    font-size: 15px;
  }
`;

const CtaLink = styled.a`
  font-family: "Manrope", sans-serif;
  font-size: 12px;
  font-weight: 700;
  background: ${(props) => props.theme.accentDark};
  color: ${(props) => props.theme.background};
  padding: 9px 18px;
  border-radius: 100px;
  text-decoration: none;
  white-space: nowrap;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Burger = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 20px;
  line-height: 1;
  color: ${(props) => props.theme.color};
  cursor: pointer;
  padding: 4px;

  @media (max-width: 760px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid ${(props) => props.theme.border};

  a {
    font-family: "Manrope", sans-serif;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${(props) => props.theme.textSecondary};
    text-decoration: none;
  }
`;

const NavBar = () => {
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch(endpoints.navbar, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  if (!data) return null;

  const internalLinks =
    data.sections?.filter((section) => section.type !== "link") ?? [];
  const externalLinks =
    data.sections?.filter((section) => section.type === "link") ?? [];

  return (
    <Bar>
      <NavRow>
        <Logo to="/" exact onClick={() => setExpanded(false)}>
          pasinduTY
        </Logo>

        <Links>
          {internalLinks.map((section) => (
            <StyledLink
              key={section.title}
              to={section.href}
              exact={section.href === "/"}
              activeClassName="navbar__link--active"
            >
              {section.title}
            </StyledLink>
          ))}
        </Links>

        <RightSide>
          {externalLinks.map((section) => (
            <CtaLink
              key={section.title}
              href={section.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {section.title}
            </CtaLink>
          ))}
          <ThemeToggler />
          <Burger
            onClick={() => setExpanded(!expanded)}
            aria-label="Toggle menu"
          >
            {expanded ? "✕" : "☰"}
          </Burger>
        </RightSide>
      </NavRow>

      <MobileMenu open={expanded}>
        {internalLinks.map((section) => (
          <NavLink
            key={section.title}
            to={section.href}
            exact={section.href === "/"}
            onClick={() => setExpanded(false)}
          >
            {section.title}
          </NavLink>
        ))}
        {externalLinks.map((section) => (
          <a
            key={section.title}
            href={section.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setExpanded(false)}
          >
            {section.title}
          </a>
        ))}
      </MobileMenu>
    </Bar>
  );
};

const NavBarWithRouter = withRouter(NavBar);
export default NavBarWithRouter;
