import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrap = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 760px) {
    padding: 0 24px;
  }
`;

const Section = styled.section`
  padding: 88px 0 100px;

  @media (min-width: 1500px) {
    padding: 110px 0 130px;
  }

  @media (max-width: 760px) {
    padding: 56px 0 64px;
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

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
`;

const CertCard = styled.div`
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 20px;
  padding: 32px 28px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(10, 25, 49, 0.05);
  animation: ${fadeUp} 0.4s ease both;
  animation-delay: ${(props) => props.$delay};
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${(props) => props.theme.accentDark},
      ${(props) => props.theme.accentColor},
      ${(props) => props.theme.accentLight}
    );
  }

  &:hover {
    box-shadow: 0 8px 28px rgba(10, 25, 49, 0.12);
    border-color: ${(props) => props.theme.accentLight};
    transform: translateY(-4px);
  }
`;

const LogoWrap = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 16px;
  background: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 44px;
    height: 44px;
    object-fit: contain;
  }
`;

const CertTitle = styled.div`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: ${(props) => props.theme.color};
  line-height: 1.35;
  margin-bottom: 10px;
  flex: 1;

  @media (min-width: 1500px) {
    font-size: 17px;
  }
`;

const CertIssuer = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: ${(props) => props.theme.accentColor};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
`;

const CredentialBtn = styled.a`
  font-family: "Manrope", sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => props.theme.background};
  background: ${(props) => props.theme.accentDark};
  padding: 9px 20px;
  border-radius: 100px;
  text-decoration: none;
  display: inline-block;
  transition: background 0.15s ease;

  &:hover {
    background: ${(props) => props.theme.accentColor};
  }

  @media (min-width: 1500px) {
    font-size: 14px;
    padding: 11px 24px;
  }
`;

function Certifications() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.certifications, { method: "GET" })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <FallbackSpinner />;

  return (
    <Wrap>
      <Section>
        <SectionHeader>
          <Eyebrow>Credentials</Eyebrow>
          <Heading>Certifications</Heading>
        </SectionHeader>

        <Cards>
          {data.certifications.map((cert, idx) => (
            <CertCard key={cert.title} $delay={`${idx * 0.1}s`}>
              <LogoWrap>
                <img src={cert.logo} alt={cert.issuer} />
              </LogoWrap>
              <CertTitle>{cert.title}</CertTitle>
              <CertIssuer>{cert.issuer}</CertIssuer>
              <CredentialBtn
                href={cert.credentialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View credential →
              </CredentialBtn>
            </CertCard>
          ))}
        </Cards>
      </Section>
    </Wrap>
  );
}

export default Certifications;
