import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, clearError, resetStatus } from "../store/authSlice";
import { toast } from 'react-toastify';
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
} from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";

/* ------------------------------------------------
   MAIN LAYOUT
------------------------------------------------ */
const StyledContainer = styled(Box)`
  display: flex;
  min-height: 100vh;
  height: auto;
  background: #f8fafc;
  position: relative;

  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    max-width: 100vw;
    overflow-x: hidden;
  }
`;

/* ------------------------------------------------
   LEFT PANEL
------------------------------------------------ */
const LeftSection = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 60px 60px 60px;
  position: relative;

  @media (max-width: 1200px) {
    padding: 32px 32px 40px 32px;
  }
  @media (max-width: 900px) {
    padding: 24px 12px 32px 12px;
    order: 1;
  }
  @media (max-width: 600px) {
    padding: 18px 10px 24px 10px;
    order: 1;
  }
`;

const FormWrapper = styled(Box)`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  padding: 32px 28px 28px 28px;

  @media (max-width: 1200px) {
    width: 340px;
    padding: 24px 16px 20px 16px;
  }
  @media (max-width: 900px) {
    width: 100%;
    max-width: 500px;
    gap: 16px;
    padding: 18px 8px 16px 8px;
  }
  @media (max-width: 600px) {
    width: 100%;
    max-width: 100vw;
    gap: 12px;
    padding: 14px 4vw 14px 4vw;
    border-radius: 12px;
    box-shadow: 0 1px 8px rgba(0,0,0,0.06);
  }
`;

const Title = styled(Typography)`
  font-size: 36px;
  font-weight: 800;
  color: #0f172a;

  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

const SubTitle = styled(Typography)`
  font-size: 16px;
  color: #475569;
  margin-top: -5px;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    height: 52px;
    border-radius: 10px;
  }
`;

const Dropdown = styled(FormControl)`
  & .MuiOutlinedInput-root {
    height: 52px;
    border-radius: 10px;
  }
`;

/* ------------------------------------------------
   SOCIAL BUTTON GRID
------------------------------------------------ */
const SocialGrid = styled(Box)`
  display: flex;
  width: 100%;
  gap: 15px;
  margin-top: 5px;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const SocialItem = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  height: 50px;
  border-radius: 12px;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
  transition: 0.3s;
  padding: 0 18px;

  &:hover {
    background: #e2e8f0;
  }

  @media (max-width: 600px) {
    height: auto;
    font-size: 13px;
    padding: 10px 10px;
    border-radius: 9px;
    min-height: 44px;
    align-items: center;
  }
`;

/* ------------------------------------------------
   RIGHT PANEL
------------------------------------------------ */
const RightPanel = styled.div`
  flex: 1;
  width: 100%;
  max-width: 100vw;
  margin: 0;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 70px 24px;
  min-height: 900px;
  position: relative;

  &::before {
    content: "";
    width: 80%;
    height: 80%;
    position: absolute;
    filter: blur(100px);
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
  }

  @media (max-width: 1200px) {
    width: 100%;
    padding: 48px 8px;
    min-height: 700px;
  }
  @media (max-width: 900px) {
    width: 100%;
    max-width: 100vw;
    min-height: 500px;
    padding: 32px 8px;
    flex: 1;
    order: 2;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
  @media (max-width: 600px) {
    width: 100%;
    max-width: 100vw;
    min-height: 320px;
    padding: 18px 4px;
    order: 2;
    border-radius: 0;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
`;

const RightContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const RightTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 10px;

  @media (max-width: 600px) {
    font-size: 26px;
  }
`;

const RightSubtitle = styled.p`
  font-size: 17px;
  opacity: 0.95;
  margin-bottom: 40px;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const PreviewCard = styled.div`
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 22px;
  padding: 0;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transform: translateY(0);
  transition: 0.3s;

  &:hover {
    transform: translateY(-6px);
  }

  img {
    width: 100%;
    max-width: 420px;
    height: auto;
    max-height: 320px;
    object-fit: cover;
    border-radius: 20px;
    display: block;
  }
  @media (max-width: 600px) {
    max-width: 100%;
    img {
      max-width: 100%;
      max-height: 180px;
    }
  }
`;

/* ------------------------------------------------
   FOOTER
------------------------------------------------ */
const Footer = styled(Box)`
  position: static;
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #64748b;
  margin-top: 28px;
`;

/* ------------------------------------------------
   MAIN COMPONENT
------------------------------------------------ */
const SignIn = () => {
  const [loginType, setLoginType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    dispatch(resetStatus());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/dashboard");
    }
  }, [status, navigate]);

  const handleLogin = () => {
    if (!loginType) {
      toast.error("Please select a Login Type");
      return;
    }
    dispatch(loginUser({ email, password, userType: loginType }));
  };

  return (
    <StyledContainer>
      {/* LEFT SIDE */}
      <LeftSection>
        <FormWrapper>
          <Title>Welcome Back</Title>
          <SubTitle>Enter your email and password to access your account.</SubTitle>

          {error && <Alert severity="error">{error}</Alert>}

          <Dropdown fullWidth>
            <InputLabel id="login-type-label">Login Type</InputLabel>
            <Select
              labelId="login-type-label"
              value={loginType}
              label="Login Type"
              onChange={(e) => setLoginType(e.target.value)}
            >
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Candidate">Candidate</MenuItem>
            </Select>
          </Dropdown>

          <StyledTextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledTextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Remember Me"
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            disabled={status === 'loading'}
            sx={{
              height: { xs: "48px", sm: "52px" },
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              borderRadius: { xs: "8px", sm: "10px" },
              fontSize: { xs: "1.08rem", sm: "1.1rem" },
              fontWeight: 600,
            }}
          >
            {status === 'loading' ? 'LOGGING IN...' : 'LOG IN'}
          </Button>

          <Typography style={{ textAlign: "center", marginTop: 20, fontSize: 14 }}>
            Or Login With
          </Typography>

          <SocialGrid>
            <SocialItem>
              <img src="/assets/icons/Google__G__logo.svg.png" width="20" alt="" />
              GOOGLE
            </SocialItem>

            <SocialItem>
              <img src="/assets/icons/apple-logo-transparent.png" width="20" alt="" />
              APPLE
            </SocialItem>
          </SocialGrid>

          <Typography style={{ textAlign: "center", marginTop: 10, fontSize: 14 }}>
            Don't Have An Account?{" "}
            <Link to="/signup" style={{ color: "#6366f1", fontWeight: 600 }}>
              Register Now
            </Link>
          </Typography>
          <div style={{ height: 18 }} />
        </FormWrapper>
        <Footer>Copyright © 2025 HRMS.</Footer>
      </LeftSection>

      {/* RIGHT SIDE */}
      <RightPanel>
        <RightContent>
          <RightTitle>Effortlessly manage your team.</RightTitle>
          <RightSubtitle>
            Log in to access your CRM dashboard and manage your team.
          </RightSubtitle>

          <PreviewCard>
            <img src="/assets/auth-video.gif" alt="Preview" />
          </PreviewCard>
        </RightContent>
      </RightPanel>
    </StyledContainer>
  );
};

export default SignIn;
