import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
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
  margin-bottom: 14px;
  color: ${(props) => props.theme.color};

  @media (min-width: 1500px) {
    font-size: 52px;
  }
`;

const Subtext = styled.p`
  font-size: 15px;
  color: ${(props) => props.theme.textSecondary};
  line-height: 1.7;
  max-width: 540px;
  margin: 0 auto;

  @media (min-width: 1500px) {
    font-size: 17px;
  }
`;

const Groups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 52px;
`;

const GroupLabel = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: ${(props) => props.theme.accentColor};
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;

  &::before {
    content: "";
    flex: 1;
    height: 1px;
    background: ${(props) => props.theme.border};
  }

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${(props) => props.theme.border};
  }

  @media (min-width: 1500px) {
    font-size: 13px;
  }
`;

const FloatsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
`;

const FloatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  animation: ${fadeUp} 0.4s ease both;
  animation-delay: ${(props) => props.delay};
`;

const FloatBubble = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.border};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(10, 25, 49, 0.07);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: default;

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 24px rgba(74, 127, 167, 0.2);
  }

  @media (min-width: 1500px) {
    width: 88px;
    height: 88px;
    border-radius: 24px;

    img {
      width: 52px;
      height: 52px;
    }
  }

  @media (max-width: 760px) {
    width: 60px;
    height: 60px;
    border-radius: 16px;

    img {
      width: 34px;
      height: 34px;
    }
  }
`;

const FloatName = styled.div`
  font-family: "Manrope", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
  text-align: center;

  @media (min-width: 1500px) {
    font-size: 13px;
  }
`;

function Skills() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.skills, {
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
          <Eyebrow>What I work with</Eyebrow>
          <Heading>Skills &amp; Technologies</Heading>
          <Subtext>{data.intro}</Subtext>
        </SectionHeader>

        <Groups>
          {data.skills.map((group) => (
            <div key={group.title}>
              <GroupLabel>{group.title}</GroupLabel>
              <FloatsGrid>
                {group.items.map((skill, idx) => (
                  <FloatItem key={skill.title} delay={`${idx * 0.05}s`}>
                    <FloatBubble>
                      <img src={skill.icon} alt={skill.title} />
                    </FloatBubble>
                    <FloatName>{skill.title}</FloatName>
                  </FloatItem>
                ))}
              </FloatsGrid>
            </div>
          ))}
        </Groups>
      </Section>
    </Wrap>
  );
}

export default Skills;
