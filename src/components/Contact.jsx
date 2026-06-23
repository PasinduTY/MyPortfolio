import React, { useState } from "react";
import { SocialIcon } from "react-social-icons";
import styled from "styled-components";

const SectionWrap = styled.div`
  background: #0a1931;
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 88px 40px 0;

  @media (min-width: 1500px) {
    padding: 110px 40px 0;
  }
  @media (max-width: 760px) {
    padding: 56px 24px 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
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
  margin-bottom: 12px;

  @media (min-width: 1500px) {
    font-size: 52px;
  }
`;

const Subtext = styled.p`
  font-size: 15px;
  color: #8fb8d4;
  line-height: 1.7;
  max-width: 480px;
  margin: 0 auto;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: start;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const SocialsLabel = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: #4a7fa7;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const SocialLinkItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 1px solid rgba(74, 127, 167, 0.25);
  border-radius: 12px;
  background: rgba(26, 61, 99, 0.4);
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background: rgba(26, 61, 99, 0.7);
    border-color: #4a7fa7;
  }
`;

const SocialIconWrap = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: rgba(74, 127, 167, 0.15);
  border: 1px solid rgba(74, 127, 167, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
`;

const SocialInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const SocialName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #f6fafd;
`;

const SocialHandle = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: #4a7fa7;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SocialArrow = styled.div`
  font-size: 14px;
  color: #4a7fa7;
  flex-shrink: 0;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: #4a7fa7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
  display: block;
`;

const inputStyles = `
  width: 100%;
  background: rgba(26, 61, 99, 0.5);
  border: 1px solid rgba(74, 127, 167, 0.3);
  border-radius: 10px;
  padding: 12px 14px;
  font-family: 'Manrope', sans-serif;
  font-size: 13px;
  color: #F6FAFD;
  outline: none;
  transition: border-color 0.15s ease, background 0.15s ease;

  &::placeholder { color: #4A7FA7; opacity: 0.7; }
  &:focus { border-color: #4A7FA7; background: rgba(26, 61, 99, 0.7); }
`;

const FormInput = styled.input`
  ${inputStyles}
`;
const FormTextarea = styled.textarea`
  ${inputStyles}
  height: 130px;
  resize: none;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  font-family: "Manrope", sans-serif;
  font-size: 14px;
  font-weight: 700;
  background: #f6fafd;
  color: #0a1931;
  border: none;
  padding: 14px 24px;
  border-radius: 100px;
  cursor: pointer;
  margin-top: 4px;
  transition: background 0.15s ease;

  &:hover {
    background: #b3cfe5;
  }
  @media (min-width: 1500px) {
    font-size: 16px;
    padding: 16px 28px;
  }
`;

const ErrorMsg = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: #ff6b6b;
  margin-top: 10px;
  text-align: center;
`;

const FooterStrip = styled.div`
  margin-top: 72px;
  padding: 24px 40px 40px;
  border-top: 1px solid rgba(74, 127, 167, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1450px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 760px) {
    flex-direction: column;
    gap: 12px;
    text-align: center;
    padding: 24px 24px 48px;
  }
`;

const FooterLogo = styled.div`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #f6fafd;
`;

const FooterCopy = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: #4a7fa7;
`;

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  }

  function handleSubmit() {
    const { name, email, subject, message } = form;

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError("Please fill in all fields before sending.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:pasindutysiriwardena@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <SectionWrap>
      <Inner>
        <SectionHeader>
          <Eyebrow>Let&apos;s connect</Eyebrow>
          <Heading>Get in touch</Heading>
          <Subtext>
            Have a project in mind, an opportunity to discuss, or just want to
            say hello? My inbox is always open.
          </Subtext>
        </SectionHeader>

        <TwoCol>
          <div>
            <SocialsLabel>Find me online</SocialsLabel>
            <SocialLinks>
              <SocialLinkItem
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/pasindusiriwardena",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                <SocialIconWrap>
                  <SocialIcon
                    url="https://www.linkedin.com/in/pasindusiriwardena"
                    network="linkedin"
                    bgColor="transparent"
                    fgColor="#B3CFE5"
                    style={{ width: 24, height: 24 }}
                  />
                </SocialIconWrap>
                <SocialInfo>
                  <SocialName>LinkedIn</SocialName>
                  <SocialHandle>Pasindu Siriwardena</SocialHandle>
                </SocialInfo>
                <SocialArrow>→</SocialArrow>
              </SocialLinkItem>

              <SocialLinkItem
                onClick={() =>
                  window.open(
                    "https://github.com/PasinduTY",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                <SocialIconWrap>
                  <SocialIcon
                    url="https://github.com/PasinduTY"
                    network="github"
                    bgColor="transparent"
                    fgColor="#B3CFE5"
                    style={{ width: 24, height: 24 }}
                  />
                </SocialIconWrap>
                <SocialInfo>
                  <SocialName>GitHub</SocialName>
                  <SocialHandle>@PasinduTY</SocialHandle>
                </SocialInfo>
                <SocialArrow>→</SocialArrow>
              </SocialLinkItem>
            </SocialLinks>
          </div>

          <div>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="c-name">Name</FormLabel>
                <FormInput
                  id="c-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="c-email">Email</FormLabel>
                <FormInput
                  id="c-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormRow>
            <FormGroup>
              <FormLabel htmlFor="c-subject">Subject</FormLabel>
              <FormInput
                id="c-subject"
                name="subject"
                type="text"
                placeholder="What's it about?"
                value={form.subject}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="c-message">Message</FormLabel>
              <FormTextarea
                id="c-message"
                name="message"
                placeholder="Tell me what you're thinking..."
                value={form.message}
                onChange={handleChange}
              />
            </FormGroup>
            <SubmitBtn onClick={handleSubmit}>Send message →</SubmitBtn>
            {error && <ErrorMsg>{error}</ErrorMsg>}
          </div>
        </TwoCol>
      </Inner>

      <FooterStrip>
        <FooterLogo>pasinduTY</FooterLogo>
        <FooterCopy>© 2025 Pasindu Siriwardena</FooterCopy>
      </FooterStrip>
    </SectionWrap>
  );
}

export default Contact;
