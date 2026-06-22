import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";

const Wrap = styled.div`
  background: linear-gradient(160deg, #f6fafd 0%, #dceaf5 100%);
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  gap: 56px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 40px 100px;

  @media (min-width: 1500px) {
    gap: 90px;
    padding: 110px 40px 130px;
  }

  @media (max-width: 760px) {
    flex-direction: column-reverse;
    padding: 32px 24px 56px;
    text-align: center;
    gap: 40px;
  }
`;

const PhotoSide = styled.div`
  flex: 0 0 auto;
  width: 280px;
  aspect-ratio: 1 / 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 1500px) {
    width: 340px;
  }

  @media (max-width: 760px) {
    width: 200px;
  }
`;

const Blob = styled.div`
  position: absolute;
  border-radius: 58% 42% 53% 47% / 44% 56% 41% 59%;
  background: ${(props) => props.theme.accentLight};
  opacity: 0.55;
  width: 110%;
  height: 110%;
  top: -8%;
  left: -6%;
  z-index: 0;
`;

const PhotoFrame = styled.div`
  position: relative;
  z-index: 1;
  width: 90%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.border};
  box-shadow: 0 1px 2px rgba(10, 25, 49, 0.04);
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const TextSide = styled.div`
  flex: 1;
  min-width: 0;
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

const Heading = styled.h1`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: clamp(32px, 4vw, 48px);
  line-height: 1.1;
  margin-bottom: 24px;
  color: ${(props) => props.theme.color};

  @media (min-width: 1500px) {
    font-size: 56px;
  }
`;

const BioText = styled.div`
  font-size: 16px;
  line-height: 1.7;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 36px;

  p {
    margin: 0 0 16px;
  }
  p:last-child {
    margin-bottom: 0;
  }

  @media (min-width: 1500px) {
    font-size: 18px;
  }
`;

const FactsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px 32px;
  margin-bottom: 40px;
  padding-top: 28px;
  border-top: 1px solid ${(props) => props.theme.border};

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    text-align: left;
  }
`;

const FactLabel = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-size: 13px;
  color: ${(props) => props.theme.accentColor};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
`;

const FactValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.color};
`;

const CtaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
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

  @media (min-width: 1500px) {
    font-size: 16px;
    padding: 17px 30px;
  }
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

  @media (min-width: 1500px) {
    font-size: 16px;
    padding: 17px 30px;
  }
`;

function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.about, {
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
        <PhotoSide>
          <Blob />
          <PhotoFrame>
            <Photo src={data.imageSource} alt="Pasindu Siriwardena" />
          </PhotoFrame>
        </PhotoSide>

        <TextSide>
          <Eyebrow>About me</Eyebrow>
          <Heading>A bit more about me</Heading>
          <BioText>
            <ReactMarkdown>{data.about.trim()}</ReactMarkdown>
          </BioText>

          <FactsGrid>
            <div>
              <FactLabel>Based in</FactLabel>
              <FactValue>Sri Lanka</FactValue>
            </div>
            <div>
              <FactLabel>Education</FactLabel>
              <FactValue>B.Sc (Hons) IT, University of Moratuwa</FactValue>
            </div>
            <div>
              <FactLabel>Focus</FactLabel>
              <FactValue>Full-stack Development &amp; UI/UX Design</FactValue>
            </div>
            <div>
              <FactLabel>Status</FactLabel>
              <FactValue>Open to new opportunities</FactValue>
            </div>
          </FactsGrid>

          <CtaRow>
            <BtnPrimary
              href="https://drive.google.com/file/d/1LwHMnOCBPDAOnyHbVTVFgAsCEUTXSUSd/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download resume
            </BtnPrimary>
            <BtnSecondary href="#projects">View my work</BtnSecondary>
          </CtaRow>
        </TextSide>
      </Section>
    </Wrap>
  );
}

export default About;
