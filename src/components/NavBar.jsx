import React, { useEffect, useState } from "react";
import styled from "styled-components";
import endpoints from "../constants/endpoints";
import ThemeToggler from "./ThemeToggler";

const HeaderWrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: ${(props) => props.theme.background};
`;

const Bar = styled.div`
  max-width: 1450px;
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

const Logo = styled.a`
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

const StyledLink = styled.a`
  font-family: "Manrope", sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${(props) =>
    props.$active ? props.theme.accentColor : props.theme.textSecondary};
  text-decoration: none;

  @media (min-width: 1500px) {
    font-size: 16px;
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
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    fetch(endpoints.navbar, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const internalLinks =
    data?.sections?.filter((section) => section.type !== "link") ?? [];
  const externalLinks =
    data?.sections?.filter((section) => section.type === "link") ?? [];

  useEffect(() => {
    if (internalLinks.length === 0) return undefined;

    const elements = internalLinks
      .map((section) => document.querySelector(section.href))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line
  }, [data]);

  if (!data) return null;

  return (
    <HeaderWrap>
      <Bar>
        <NavRow>
          <Logo href="#home" onClick={() => setExpanded(false)}>
            pasinduTY
          </Logo>

          <Links>
            {internalLinks.map((section) => (
              <StyledLink
                key={section.title}
                href={section.href}
                $active={section.href === `#${activeId}`}
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
            <a
              key={section.title}
              href={section.href}
              onClick={() => setExpanded(false)}
            >
              {section.title}
            </a>
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
    </HeaderWrap>
  );
};

export default NavBar;
