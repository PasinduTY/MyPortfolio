import React, { useState, useEffect } from "react";
import styled from "styled-components";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";

const Wrap = styled.div`
  background: ${(props) =>
    props.theme.background === "#0D1B2A"
      ? "radial-gradient(ellipse 75% 65% at 50% 50%, #0F2035 0%, #0D1B2A 100%)"
      : "radial-gradient(ellipse 75% 65% at 50% 50%, #CCDFF0 0%, #F6FAFD 100%)"};
`;

const Section = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 88px 40px 100px;

  @media (min-width: 1500px) {
    padding: 110px 40px 130px;
  }

  @media (max-width: 760px) {
    padding: 56px 24px 64px;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
`;

const Eyebrow = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: ${(props) => props.theme.accentColor};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 14px;

  @media (min-width: 1500px) {
    font-size: 14px;
  }
`;

const Heading = styled.h2`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.1;
  color: ${(props) => props.theme.color};

  @media (min-width: 1500px) {
    font-size: 52px;
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      ${(props) => props.theme.accentDark},
      ${(props) => props.theme.accentColor}
    );
    transform: translateX(-50%);
  }

  @media (max-width: 680px) {
    &::before {
      left: 20px;
    }
  }
`;

const TlItem = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 48px;

  &:last-child {
    margin-bottom: 0;
  }

  &:nth-child(odd) {
    justify-content: flex-start;
    padding-right: calc(50% + 32px);
  }

  &:nth-child(even) {
    justify-content: flex-end;
    padding-left: calc(50% + 32px);
  }

  @media (max-width: 680px) {
    &:nth-child(odd),
    &:nth-child(even) {
      justify-content: flex-start;
      padding-left: 48px;
      padding-right: 0;
    }
  }
`;

const TlDot = styled.div`
  position: absolute;
  left: 50%;
  top: 28px;
  transform: translateX(-50%);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${(props) => props.theme.accentDark};
  border: 3px solid ${(props) => props.theme.background};
  box-shadow:
    0 0 0 2px ${(props) => props.theme.accentDark},
    0 0 12px rgba(26, 61, 99, 0.25);
  z-index: 1;

  @media (max-width: 680px) {
    left: 20px;
  }
`;

const TlCard = styled.div`
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  box-shadow: 0 2px 12px rgba(10, 25, 49, 0.06);
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    box-shadow: 0 8px 28px rgba(26, 61, 99, 0.14);
    border-color: ${(props) => props.theme.accentColor};
    transform: translateY(-3px);
  }
`;

const TlCardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
`;

const TlLogo = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }
`;

const TlMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const TlYear = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: ${(props) => props.theme.accentColor};
  letter-spacing: 0.05em;

  @media (min-width: 1500px) {
    font-size: 12px;
  }
`;

const TlSub = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => props.theme.textSecondary};
`;

const TlDivider = styled.div`
  height: 1px;
  background: ${(props) => props.theme.border};
  margin-bottom: 14px;
`;

const TlTitle = styled.div`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 17px;
  color: ${(props) => props.theme.color};
  line-height: 1.3;
  margin-bottom: 12px;

  @media (min-width: 1500px) {
    font-size: 20px;
  }
`;

const TlStream = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 10px;
  font-style: italic;
`;

const TlDetail = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: ${(props) => props.theme.accentColor};
  background: ${(props) => props.theme.border};
  padding: 4px 10px;
  border-radius: 100px;
  display: inline-block;
`;

function Education() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.education, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  if (!data) return <FallbackSpinner />;

  return (
    <Wrap>
      <Section>
        <SectionHeader>
          <Eyebrow>My journey</Eyebrow>
          <Heading>Education</Heading>
        </SectionHeader>

        <Timeline>
          {data.education.map((item) => {
            const parts = item.cardDetailedText
              ? item.cardDetailedText.split("·").map((s) => s.trim())
              : [];
            const stream = parts.length > 1 ? parts[0] : null;
            const result = parts.length > 1 ? parts[1] : parts[0];

            return (
              <TlItem key={item.cardTitle}>
                <TlDot />
                <TlCard>
                  <TlCardTop>
                    <TlLogo>
                      <img src={item.icon?.src} alt={item.cardSubtitle} />
                    </TlLogo>
                    <TlMeta>
                      <TlYear>{item.title}</TlYear>
                      <TlSub>{item.cardSubtitle}</TlSub>
                    </TlMeta>
                  </TlCardTop>
                  <TlDivider />
                  <TlTitle>{item.cardTitle}</TlTitle>
                  {stream && <TlStream>{stream}</TlStream>}
                  {result && <TlDetail>{result}</TlDetail>}
                </TlCard>
              </TlItem>
            );
          })}
        </Timeline>
      </Section>
    </Wrap>
  );
}

export default Education;
