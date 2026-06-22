import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SectionWrap = styled.div`
  position: relative;
  overflow: hidden;
  background: #0a1931;
`;

const BrainBg = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 600px;
  pointer-events: none;
  z-index: 0;

  @media (max-width: 900px) {
    width: 600px;
    height: 400px;
  }
  @media (max-width: 560px) {
    width: 380px;
    height: 260px;
  }

  svg * {
    transition: opacity 0.5s ease;
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 2;
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
  margin-bottom: 40px;
`;

const Eyebrow = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: #b3cfe5;
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
  color: #f6fafd;
  margin-bottom: 10px;

  @media (min-width: 1500px) {
    font-size: 52px;
  }
`;

const Subtext = styled.p`
  font-size: 14px;
  color: #8fb8d4;
  line-height: 1.7;
`;

const TabRow = styled.div`
  display: flex;
  border: 1.5px solid rgba(179, 207, 229, 0.3);
  border-radius: 100px;
  width: fit-content;
  margin: 0 auto 44px;
  padding: 4px;
  background: rgba(26, 61, 99, 0.8);
  backdrop-filter: blur(6px);
`;

const Tab = styled.button`
  font-family: "Manrope", sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 28px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  background: ${(props) => (props.$active ? "#F6FAFD" : "transparent")};
  color: ${(props) => (props.$active ? "#0A1931" : "#B3CFE5")};

  @media (min-width: 1500px) {
    font-size: 16px;
    padding: 12px 34px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const DevCard = styled.div`
  background: rgba(26, 61, 99, 0.55);
  border: 1px solid rgba(74, 127, 167, 0.3);
  border-radius: 16px;
  overflow: hidden;
  animation: ${fadeUp} 0.4s ease both;
  animation-delay: ${(props) => props.$delay};
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    box-shadow: 0 8px 28px rgba(74, 127, 167, 0.25);
    border-color: #4a7fa7;
    transform: translateY(-3px);
  }
`;

const CardImg = styled.div`
  width: 100%;
  height: 160px;
  overflow: hidden;
  background: linear-gradient(135deg, #0a1931, #1a3d63);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    opacity: 0.85;
    transition:
      opacity 0.2s ease,
      transform 0.3s ease;
  }

  ${DevCard}:hover & img {
    opacity: 1;
    transform: scale(1.03);
  }
`;

const CardBody = styled.div`
  padding: 16px 18px 18px;
`;

const CardTitle = styled.div`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: #f6fafd;
  margin-bottom: 8px;
  line-height: 1.3;

  @media (min-width: 1500px) {
    font-size: 17px;
  }
`;

const CardDesc = styled.p`
  font-size: 12px;
  color: #8fb8d4;
  line-height: 1.65;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 14px;
`;

const Tag = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  background: rgba(74, 127, 167, 0.2);
  color: #b3cfe5;
  padding: 3px 8px;
  border-radius: 100px;
`;

const LinkRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const CardLink = styled.a`
  font-family: "Manrope", sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #b3cfe5;
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: #f6fafd;
  }
`;

const UIUXCard = styled.div`
  background: rgba(26, 61, 99, 0.55);
  border: 1px solid rgba(74, 127, 167, 0.3);
  border-radius: 16px;
  overflow: hidden;
  animation: ${fadeUp} 0.4s ease both;
  animation-delay: ${(props) => props.$delay};
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    box-shadow: 0 8px 28px rgba(74, 127, 167, 0.25);
    border-color: #4a7fa7;
    transform: translateY(-3px);
  }
`;

const UIUXImg = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: linear-gradient(135deg, #0a1931, #1a3d63);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    opacity: 0.85;
    transition:
      opacity 0.2s ease,
      transform 0.3s ease;
  }

  ${UIUXCard}:hover & img {
    opacity: 1;
    transform: scale(1.03);
  }
`;

const UIUXBody = styled.div`
  padding: 14px 18px 16px;
`;

const UIUXTitle = styled.div`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #f6fafd;
  margin-bottom: 10px;
  line-height: 1.3;
`;

const FigmaLink = styled.a`
  font-family: "Manrope", sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #b3cfe5;
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: #f6fafd;
  }
`;

const modalIn = keyframes`
  from { opacity: 0; transform: scale(0.96) translateY(12px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const ModalOverlay = styled.div`
  display: ${(props) => (props.$open ? "flex" : "none")};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 200;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  padding: 24px;
`;

const ModalBox = styled.div`
  background: #0f2440;
  border: 1px solid rgba(74, 127, 167, 0.4);
  border-radius: 20px;
  max-width: 580px;
  width: 100%;
  padding: 32px;
  position: relative;
  animation: ${modalIn} 0.25s ease;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 20px;
  font-size: 20px;
  cursor: pointer;
  color: #4a7fa7;
  background: none;
  border: none;
  line-height: 1;
  transition: color 0.15s;
  &:hover {
    color: #f6fafd;
  }
`;

const ModalImg = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #0a1931, #1a3d63);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const ModalTitle = styled.div`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #f6fafd;
  margin-bottom: 12px;
  line-height: 1.3;
  padding-right: 28px;
`;

const ModalDesc = styled.p`
  font-size: 14px;
  color: #8fb8d4;
  line-height: 1.75;
  margin-bottom: 20px;
`;

const ModalTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
`;

const ModalTag = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  background: rgba(74, 127, 167, 0.2);
  color: #b3cfe5;
  padding: 4px 10px;
  border-radius: 100px;
`;

const ModalLinks = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

const ModalLink = styled.a`
  font-family: "Manrope", sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #b3cfe5;
  text-decoration: none;
  transition: color 0.15s;
  &:hover {
    color: #f6fafd;
  }
`;

const ViewDetails = styled.button`
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: #4a7fa7;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-bottom: 10px;
  display: inline-block;
  transition: color 0.15s;
  &:hover {
    color: #b3cfe5;
  }
`;

const BRAIN_IDS = {
  leftHemi: "proj-left-hemi",
  rightHemi: "proj-right-hemi",
  leftGlow: "proj-left-glow",
  rightGlow: "proj-right-glow",
  leftNodes: "proj-left-nodes",
  rightNodes: "proj-right-nodes",
};

function setBrainTab(tab) {
  const el = (id) => document.getElementById(id);
  if (tab === "dev") {
    el(BRAIN_IDS.leftHemi).style.opacity = "0.85";
    el(BRAIN_IDS.leftGlow).style.opacity = "1";
    el(BRAIN_IDS.leftNodes).style.opacity = "0.8";
    el(BRAIN_IDS.rightHemi).style.opacity = "0.1";
    el(BRAIN_IDS.rightGlow).style.opacity = "0.1";
    el(BRAIN_IDS.rightNodes).style.opacity = "0.08";
  } else {
    el(BRAIN_IDS.rightHemi).style.opacity = "0.85";
    el(BRAIN_IDS.rightGlow).style.opacity = "1";
    el(BRAIN_IDS.rightNodes).style.opacity = "0.8";
    el(BRAIN_IDS.leftHemi).style.opacity = "0.1";
    el(BRAIN_IDS.leftGlow).style.opacity = "0.1";
    el(BRAIN_IDS.leftNodes).style.opacity = "0.08";
  }
}

function Projects() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("dev");
  const [modalProject, setModalProject] = useState(null);

  useEffect(() => {
    fetch(endpoints.projects, { method: "GET" })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setModalProject(null);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function handleTab(tab) {
    setActiveTab(tab);
    setBrainTab(tab);
  }

  if (!data) return <FallbackSpinner />;

  return (
    <SectionWrap>
      <BrainBg>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 900 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="projLeftGrad" cx="30%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4A7FA7" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#4A7FA7" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="projRightGrad" cx="70%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#B3CFE5" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#B3CFE5" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse
            id={BRAIN_IDS.leftGlow}
            cx="285"
            cy="300"
            rx="240"
            ry="250"
            fill="url(#projLeftGrad)"
            opacity="0.9"
          />
          <ellipse
            id={BRAIN_IDS.rightGlow}
            cx="615"
            cy="300"
            rx="240"
            ry="250"
            fill="url(#projRightGrad)"
            opacity="0.3"
          />

          <g
            id={BRAIN_IDS.leftHemi}
            stroke="#4A7FA7"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          >
            <path d="M450,110 C410,78 355,62 305,68 C240,76 192,116 166,168 C138,224 140,290 162,342 C188,402 232,440 288,458 C330,472 376,466 412,446 C434,434 450,416 450,398" />
            <path d="M260,130 C244,155 232,184 238,212 C244,238 262,256 258,282" />
            <path d="M208,192 C196,214 194,244 204,268 C214,292 232,306 230,332" />
            <path d="M178,272 C174,298 180,326 194,348 C208,368 226,382 224,406" />
            <path d="M310,105 C298,132 292,164 300,192" />
            <path d="M362,92 C350,120 346,152 354,180 C362,208 378,226 374,254" />
            <path d="M412,100 C402,128 400,160 408,188" />
            <path d="M222,358 C238,382 258,400 276,420" />
            <path d="M214,220 C238,212 264,216 288,210" />
            <path d="M188,300 C214,294 242,298 268,292" />
          </g>

          <g
            id={BRAIN_IDS.rightHemi}
            stroke="#B3CFE5"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.3"
          >
            <path d="M450,110 C490,78 545,62 595,68 C660,76 708,116 734,168 C762,224 760,290 738,342 C712,402 668,440 612,458 C570,472 524,466 488,446 C466,434 450,416 450,398" />
            <path d="M640,130 C656,155 668,184 662,212 C656,238 638,256 642,282" />
            <path d="M692,192 C704,214 706,244 696,268 C686,292 668,306 670,332" />
            <path d="M722,272 C726,298 720,326 706,348 C692,368 674,382 676,406" />
            <path d="M590,105 C602,132 608,164 600,192" />
            <path d="M538,92 C550,120 554,152 546,180 C538,208 522,226 526,254" />
            <path d="M488,100 C498,128 500,160 492,188" />
            <path d="M678,358 C662,382 642,400 624,420" />
            <path d="M686,220 C662,212 636,216 612,210" />
            <path d="M712,300 C686,294 658,298 632,292" />
          </g>

          <line
            x1="450"
            y1="95"
            x2="450"
            y2="475"
            stroke="#4A7FA7"
            strokeWidth="1"
            strokeDasharray="8 5"
            opacity="0.35"
          />

          <g id={BRAIN_IDS.leftNodes} fill="#4A7FA7" opacity="0.6">
            <circle cx="194" cy="242" r="4" />
            <circle cx="172" cy="312" r="4" />
            <circle cx="212" cy="140" r="4" />
            <circle cx="236" cy="390" r="4" />
            <line
              x1="194"
              y1="242"
              x2="172"
              y2="312"
              stroke="#4A7FA7"
              strokeWidth="1"
              opacity="0.4"
            />
            <line
              x1="212"
              y1="140"
              x2="194"
              y2="242"
              stroke="#4A7FA7"
              strokeWidth="1"
              opacity="0.4"
            />
          </g>

          <g id={BRAIN_IDS.rightNodes} fill="#B3CFE5" opacity="0.25">
            <circle cx="706" cy="242" r="4" />
            <circle cx="728" cy="312" r="4" />
            <circle cx="688" cy="140" r="4" />
            <circle cx="664" cy="390" r="4" />
          </g>

          <text
            x="260"
            y="56"
            textAnchor="middle"
            fontFamily="JetBrains Mono,monospace"
            fontSize="11"
            fill="#4A7FA7"
            opacity="0.6"
            letterSpacing="3"
          >
            LEFT · LOGIC
          </text>
          <text
            x="640"
            y="56"
            textAnchor="middle"
            fontFamily="JetBrains Mono,monospace"
            fontSize="11"
            fill="#B3CFE5"
            opacity="0.35"
            letterSpacing="3"
          >
            RIGHT · DESIGN
          </text>
        </svg>
      </BrainBg>

      <Inner>
        <SectionHeader>
          <Eyebrow>What I&apos;ve built &amp; designed</Eyebrow>
          <Heading>Projects</Heading>
          <Subtext>
            Two sides of the same brain — engineering and design.
          </Subtext>
        </SectionHeader>

        <TabRow>
          <Tab $active={activeTab === "dev"} onClick={() => handleTab("dev")}>
            ⚙️ &nbsp;Development
          </Tab>
          <Tab $active={activeTab === "uiux"} onClick={() => handleTab("uiux")}>
            ✏️ &nbsp;UI / UX Design
          </Tab>
        </TabRow>

        {activeTab === "dev" && (
          <Grid>
            {data.projects.map((project, idx) => (
              <DevCard key={project.title} $delay={`${idx * 0.06}s`}>
                <CardImg>
                  <img src={project.image} alt={project.title} />
                </CardImg>
                <CardBody>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDesc>{project.bodyText}</CardDesc>
                  <ViewDetails onClick={() => setModalProject(project)}>
                    view details →
                  </ViewDetails>
                  <TagRow>
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagRow>
                  <LinkRow>
                    {project.links.map((link) => (
                      <CardLink
                        key={link.text}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.text} →
                      </CardLink>
                    ))}
                  </LinkRow>
                </CardBody>
              </DevCard>
            ))}
          </Grid>
        )}

        {activeTab === "uiux" && (
          <Grid>
            {data.uiux.map((item, idx) => (
              <UIUXCard key={item.title} $delay={`${idx * 0.06}s`}>
                <UIUXImg>
                  <img src={item.image} alt={item.title} />
                </UIUXImg>
                <UIUXBody>
                  <UIUXTitle>{item.title}</UIUXTitle>
                  <FigmaLink
                    href={item.figmaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Figma →
                  </FigmaLink>
                </UIUXBody>
              </UIUXCard>
            ))}
          </Grid>
        )}
      </Inner>
      <ModalOverlay
        $open={!!modalProject}
        onClick={(e) => {
          if (e.target === e.currentTarget) setModalProject(null);
        }}
      >
        {modalProject && (
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalClose onClick={() => setModalProject(null)}>✕</ModalClose>
            <ModalImg>
              <img src={modalProject.image} alt={modalProject.title} />
            </ModalImg>
            <ModalTitle>{modalProject.title}</ModalTitle>
            <ModalDesc>{modalProject.bodyText}</ModalDesc>
            <ModalTags>
              {modalProject.tags.map((tag) => (
                <ModalTag key={tag}>{tag}</ModalTag>
              ))}
            </ModalTags>
            <ModalLinks>
              {modalProject.links.map((link) => (
                <ModalLink
                  key={link.text}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.text} →
                </ModalLink>
              ))}
            </ModalLinks>
          </ModalBox>
        )}
      </ModalOverlay>
    </SectionWrap>
  );
}

export default Projects;
