import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";

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

const ExpList = styled.div`
  position: relative;
  max-width: 860px;
  margin: 0 auto;
  padding-left: 40px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: linear-gradient(
      to bottom,
      ${(props) => props.theme.accentDark},
      ${(props) => props.theme.accentColor},
      ${(props) => props.theme.accentLight}
    );
  }

  @media (max-width: 680px) {
    padding-left: 28px;
  }
`;

const ExpItem = styled.div`
  position: relative;
  margin-bottom: 40px;
  padding-left: 36px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 680px) {
    padding-left: 24px;
  }
`;

const ExpDot = styled.div`
  position: absolute;
  left: -47px;
  top: 20px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${(props) => props.theme.accentDark};
  border: 3px solid ${(props) => props.theme.background};
  box-shadow: 0 0 0 2px ${(props) => props.theme.accentDark};
  z-index: 1;

  @media (max-width: 680px) {
    left: -35px;
  }
`;

const ExpCard = styled.div`
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 16px;
  padding: 24px 28px;
  box-shadow: 0 2px 12px rgba(10, 25, 49, 0.06);
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    box-shadow: 0 8px 28px rgba(26, 61, 99, 0.12);
    border-color: ${(props) => props.theme.accentLight};
    transform: translateX(4px);
  }

  @media (max-width: 680px) {
    padding: 18px 20px;
  }
`;

const ExpCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const ExpCardLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const LogoWrap = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: ${(props) => props.theme.accentColor};
`;

const LogoImg = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

const ExpTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const ExpTitle = styled.div`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: ${(props) => props.theme.color};
  line-height: 1.2;

  @media (min-width: 1500px) {
    font-size: 21px;
  }
`;

const ExpCompany = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.textSecondary};
`;

const ExpBadges = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: flex-start;
`;

const Badge = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 100px;
  white-space: nowrap;
`;

const BadgeType = styled(Badge)`
  background: ${(props) => props.theme.border};
  color: ${(props) => props.theme.accentColor};
`;

const BadgeDate = styled(Badge)`
  background: ${(props) => props.theme.accentDark};
  color: ${(props) => props.theme.accentLight};
`;

const ExpDivider = styled.div`
  height: 1px;
  background: ${(props) => props.theme.border};
  margin-bottom: 14px;
`;

const ExpBullets = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ExpBullet = styled.li`
  font-size: 14px;
  line-height: 1.65;
  color: ${(props) => props.theme.textSecondary};
  padding-left: 20px;
  position: relative;

  &::before {
    content: "→";
    position: absolute;
    left: 0;
    color: ${(props) => props.theme.accentColor};
    font-size: 12px;
    top: 2px;
  }

  strong {
    color: ${(props) => props.theme.color};
    font-weight: 700;
  }

  p {
    margin: 0;
  }

  @media (min-width: 1500px) {
    font-size: 16px;
  }
`;

function LogoOrInitial({ src, name }) {
  const [error, setError] = useState(false);
  const initial = name ? name.charAt(0).toUpperCase() : "?";

  if (!src || error) {
    return <LogoWrap>{initial}</LogoWrap>;
  }

  return (
    <LogoWrap>
      <LogoImg src={src} alt={name} onError={() => setError(true)} />
    </LogoWrap>
  );
}

function Experience() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences, {
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
          <Eyebrow>Where I&apos;ve worked</Eyebrow>
          <Heading>Experience</Heading>
        </SectionHeader>

        <ExpList>
          {data.experiences.map((exp) => (
            <ExpItem key={`${exp.title}-${exp.subtitle}-${exp.dateText}`}>
              <ExpDot />
              <ExpCard>
                <ExpCardHeader>
                  <ExpCardLeft>
                    <LogoOrInitial src={exp.logo} name={exp.subtitle} />
                    <ExpTitleGroup>
                      <ExpTitle>{exp.title}</ExpTitle>
                      <ExpCompany>{exp.subtitle}</ExpCompany>
                    </ExpTitleGroup>
                  </ExpCardLeft>
                  <ExpBadges>
                    {exp.workType && <BadgeType>{exp.workType}</BadgeType>}
                    {exp.dateText && <BadgeDate>{exp.dateText}</BadgeDate>}
                  </ExpBadges>
                </ExpCardHeader>
                <ExpDivider />
                <ExpBullets>
                  {exp.workDescription.map((point) => (
                    <ExpBullet key={point}>
                      <ReactMarkdown>{point}</ReactMarkdown>
                    </ExpBullet>
                  ))}
                </ExpBullets>
              </ExpCard>
            </ExpItem>
          ))}
        </ExpList>
      </Section>
    </Wrap>
  );
}

export default Experience;
