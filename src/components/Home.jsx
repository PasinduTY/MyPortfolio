import React, { useState, useEffect, useContext } from "react";
import { SocialIcon } from "react-social-icons";
import styled, { keyframes, ThemeContext } from "styled-components";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";

const codeReveal = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const Wrap = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 760px) {
    padding: 0 24px;
  }
`;

const Hero = styled.section`
  display: flex;
  align-items: center;
  gap: 56px;
  padding: 80px 0 100px;

  @media (min-width: 1500px) {
    gap: 90px;
    padding: 110px 0 130px;
  }

  @media (max-width: 760px) {
    flex-direction: column;
    padding: 32px 0 40px;
    text-align: center;
    gap: 40px;
  }
`;

const HeroLeft = styled.div`
  flex: 1;
  min-width: 0;
`;

const HeroRight = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Eyebrow = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: ${(props) => props.theme.accentColor};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 18px;

  @media (min-width: 1500px) {
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

const Headline = styled.h1`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.08;
  margin-bottom: 20px;
  color: ${(props) => props.theme.color};

  span {
    color: ${(props) => props.theme.accentColor};
  }

  @media (min-width: 1500px) {
    font-size: 72px;
    margin-bottom: 28px;
  }
`;

const IntroText = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${(props) => props.theme.textSecondary};
  max-width: 440px;
  margin-bottom: 32px;

  @media (min-width: 1500px) {
    font-size: 19px;
    max-width: 540px;
    margin-bottom: 40px;
  }

  @media (max-width: 760px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const CtaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 44px;
  flex-wrap: wrap;

  @media (max-width: 760px) {
    justify-content: center;
  }
`;

const BtnPrimary = styled.a`
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 14px;
  background: ${(props) => props.theme.accentDark};
  color: ${(props) => props.theme.background};
  padding: 13px 24px;
  border-radius: 100px;
  text-decoration: none;
`;

const BtnSecondary = styled.a`
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 14px;
  background: transparent;
  color: ${(props) => props.theme.color};
  padding: 13px 24px;
  border-radius: 100px;
  text-decoration: none;
  border: 1.5px solid ${(props) => props.theme.accentLight};
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 760px) {
    justify-content: center;
  }
`;

const SocialsLabel = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: ${(props) => props.theme.accentColor};
  letter-spacing: 0.04em;
  text-transform: uppercase;

  @media (min-width: 1500px) {
    font-size: 13px;
  }

  @media (max-width: 760px) {
    display: none;
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 10px;

  @media (min-width: 1500px) {
    gap: 12px;
  }
`;

const SocialButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid ${(props) => props.theme.accentLight};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    background 0.15s,
    border-color 0.15s;

  @media (min-width: 1500px) {
    width: 48px;
    height: 48px;
  }
`;

const Blob = styled.div`
  position: absolute;
  border-radius: 58% 42% 53% 47% / 44% 56% 41% 59%;
  background: ${(props) => props.theme.accentLight};
  opacity: 0.55;
  width: 320px;
  height: 320px;
  top: -20%;
  right: -4%;
  z-index: 0;

  @media (min-width: 1500px) {
    width: 460px;
    height: 460px;
  }

  @media (max-width: 760px) {
    width: 220px;
    height: 220px;
  }
`;

const CodeWindow = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  background: ${(props) => props.theme.surface};
  border-radius: 14px;
  border: 1px solid ${(props) => props.theme.border};
  box-shadow: 0 1px 2px rgba(10, 25, 49, 0.04);
  overflow: hidden;

  @media (min-width: 1500px) {
    max-width: 560px;
  }
`;

const CodeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid ${(props) => props.theme.border};
`;

const CodeDots = styled.div`
  display: flex;
  gap: 6px;

  span {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    display: block;
  }
  span:nth-child(1) {
    background: ${(props) => props.theme.accentDark};
  }
  span:nth-child(2) {
    background: ${(props) => props.theme.accentColor};
  }
  span:nth-child(3) {
    background: ${(props) => props.theme.accentLight};
  }
`;

const CodeFilename = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: ${(props) => props.theme.accentColor};
`;

const CodeBody = styled.div`
  padding: 20px 18px;
  font-family: "JetBrains Mono", monospace;
  font-size: 13px;
  line-height: 1.85;
  text-align: left;

  @media (min-width: 1500px) {
    padding: 28px 26px;
    font-size: 15px;
  }
`;

const CodeLine = styled.div`
  opacity: 0;
  animation: ${codeReveal} 0.5s ease forwards;
  animation-delay: ${(props) => props.delay};
  white-space: pre;
`;

const Kw = styled.span`
  color: ${(props) => props.theme.accentColor};
`;

const Str = styled.span`
  color: ${(props) => props.theme.textSecondary};
`;

const Prop = styled.span`
  color: ${(props) => props.theme.color};
`;

const Cursor = styled.span`
  display: inline-block;
  width: 7px;
  height: 14px;
  background: ${(props) => props.theme.accentColor};
  margin-left: 2px;
  vertical-align: -2px;
  animation: ${blink} 1s steps(1) infinite;
`;

function Home() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  if (!data) return <FallbackSpinner />;

  const nameParts = data.name.split(" ");
  const [firstName, ...rest] = nameParts;
  const lastName = rest.join(" ");

  return (
    <Wrap>
      <Hero>
        <HeroLeft>
          <Eyebrow>Full-stack engineer · UI/UX designer</Eyebrow>
          <Headline>
            Hey, I&apos;m
            <br />
            <span>{firstName}</span> {lastName}
          </Headline>
          <IntroText>
            I build products end to end — from interfaces to the APIs and
            databases behind them — and design the screens in between.
          </IntroText>
          <CtaRow>
            <BtnPrimary href="#projects">View my work →</BtnPrimary>
            <BtnSecondary href="#about">About me</BtnSecondary>
          </CtaRow>
          <MetaRow>
            <SocialsLabel>Find me online</SocialsLabel>
            <Socials>
              <SocialButton>
                <SocialIcon
                  url="https://www.linkedin.com/in/pasindusiriwardena"
                  network="linkedin"
                  bgColor="transparent"
                  fgColor={theme.textSecondary}
                  style={{ width: 40, height: 40 }}
                  target="_blank"
                />
              </SocialButton>
              <SocialButton>
                <SocialIcon
                  url="https://github.com/PasinduTY"
                  network="github"
                  bgColor="transparent"
                  fgColor={theme.textSecondary}
                  style={{ width: 40, height: 40 }}
                  target="_blank"
                />
              </SocialButton>
              <SocialButton>
                <SocialIcon
                  url="mailto:pasindutysiriwardena@gmail.com"
                  network="email"
                  bgColor="transparent"
                  fgColor={theme.textSecondary}
                  style={{ width: 40, height: 40 }}
                />
              </SocialButton>
            </Socials>
          </MetaRow>
        </HeroLeft>

        <HeroRight>
          <Blob />
          <CodeWindow>
            <CodeHeader>
              <CodeDots>
                <span />
                <span />
                <span />
              </CodeDots>
              <CodeFilename>engineer.ts</CodeFilename>
            </CodeHeader>
            <CodeBody>
              <CodeLine delay="0.15s">
                <Kw>const</Kw> <Prop>engineer</Prop>
                {" = {"}
              </CodeLine>
              <CodeLine delay="0.35s">
                {"  name: "}
                <Str>{`"${data.name}"`}</Str>,
              </CodeLine>
              <CodeLine delay="0.55s">
                {"  stack: ["}
                <Str>&quot;React&quot;</Str>
                {", "}
                <Str>&quot;ASP.NET&quot;</Str>
                {", "}
                <Str>&quot;Azure&quot;</Str>
                {"],"}
              </CodeLine>
              <CodeLine delay="0.75s">
                {"  focus: "}
                <Str>&quot;clean interfaces&quot;</Str>,
              </CodeLine>
              <CodeLine delay="0.95s">{"};"}</CodeLine>
              <CodeLine delay="1.15s">&nbsp;</CodeLine>
              <CodeLine delay="1.35s">
                <Kw>export default</Kw>
                {" engineer;"}
                <Cursor />
              </CodeLine>
            </CodeBody>
          </CodeWindow>
        </HeroRight>
      </Hero>
    </Wrap>
  );
}

export default Home;
