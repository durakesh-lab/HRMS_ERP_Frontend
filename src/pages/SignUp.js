
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, clearError, resetStatus } from "../store/authSlice";
import { toast } from 'react-toastify';
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Box,
  MenuItem,
  Grid,
  Alert,
} from "@mui/material";
import styled from "styled-components";

/* ------------------ STYLED COMPONENTS ------------------ */

const StyledContainer = styled(Box)`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  height: auto;
  background: #f8fafc;
  position: relative;
  z-index: 0;

  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
    width: 100vw;
  }
  @media (max-width: 600px) {
    min-height: 100vh;
    height: auto;
    width: 100vw;
    padding: 0;
  }
`;

const LeftSection = styled(Box)`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 60px;
  padding-bottom: 60px; /* Space for footer */
  position: relative;

  @media (max-width: 900px) {
    padding: 20px 20px 60px 20px;
    width: 100vw;
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
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const SubTitle = styled(Typography)`
  font-size: 14px;
  color: #64748b;
  margin-bottom: 8px;

  @media (max-width: 600px) {
    font-size: 13px;
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  & .MuiOutlinedInput-root {
    height: 48px;
    border-radius: 8px;
    font-size: 14px;
    background-color: #ffffff;
  }
  & .MuiInputLabel-root {
    font-size: 14px;
    transform: translate(14px, 14px) scale(1);
  }
  & .MuiInputLabel-shrink {
    transform: translate(14px, -6px) scale(0.75);
  }
  & input {
    padding: 12px 14px !important;
  }
`;



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

const RightPanel = styled.div`
  flex: 1 1 0;
  width: 100%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 50px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    width: 80%;
    height: 80%;
    position: absolute;
    filter: blur(100px);
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
  }

  @media (max-width: 900px) {
    width: 100vw;
    padding: 60px 20px;
    min-height: 400px;
  }
`;


const RightContent = styled.div`
position: relative;
z - index: 10;
text - align: center;
`;

const RightTitle = styled.h2`
font - size: 36px;
font - weight: 800;
line - height: 1.3;
margin - bottom: 10px;

@media(max - width: 600px) {
  font - size: 26px;
}
`;

const RightSubtitle = styled.p`
font - size: 17px;
opacity: 0.95;
margin - bottom: 40px;

@media(max - width: 600px) {
  font - size: 14px;
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

/*
// NEWLY ADDED FOR CONSISTENCY WITH SIGNIN PAGE
*/
const Footer = styled(Box)`
position: absolute;
bottom: 20px;
width: 100 %;
text - align: center;
font - size: 14px;
color: #64748b;

@media(max - width: 900px) {
  position: relative;
  margin - top: 20px;
}
`;

/* ------------------ SIGNUP COMPONENT ------------------ */
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [industry, setIndustry] = useState("");
  const [userType, setUserType] = useState("Candidate"); // Default to Candidate to avoid empty state issues

  // Basic Fields State
  const [basicData, setBasicData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "", // Moved dob here for easier handling if common or specific
  });

  const [candidateData, setCandidateData] = useState({
    experience: "",
    skills: "",
    resume: null,
  });
  const [hrData, setHrData] = useState({
    companyName: "",
    jobTitle: "",
    department: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(resetStatus());
      navigate("/signin");
    }
  }, [status, navigate, dispatch]);

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setBasicData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCandidateChange = (e) => {
    const { name, value, files } = e.target;
    setCandidateData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleHrChange = (e) => {
    const { name, value } = e.target;
    setHrData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Basic Fields Validation
    if (!basicData.fullName) newErrors.fullName = "Full Name is required";
    if (!basicData.username) newErrors.username = "Username is required";
    if (!basicData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S/.test(basicData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!basicData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9+\-\s]+$/.test(basicData.phone)) {
      newErrors.phone = "Phone must contain only numbers, +, -, and spaces";
    }

    // Password Validation
    if (!basicData.password) {
      newErrors.password = "Password is required";
    } else {
      // Added (?=.*[A-Z]) to require at least one Uppercase letter
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
      if (!passwordRegex.test(basicData.password)) {
        newErrors.password = "Password must be at least 6 chars, include Uppercase, number & special symbol";
      }
    }

    if (basicData.confirmPassword !== basicData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Role Based Validation
    if (userType === 'Candidate') {
      if (!basicData.dob) newErrors.dob = "Date of Birth is required";
      if (!candidateData.experience) newErrors.experience = "Experience is required";
      if (!candidateData.skills) newErrors.skills = "Skills are required";
    } else {
      if (!hrData.companyName) newErrors.companyName = "Company Name is required";
      if (!hrData.jobTitle) newErrors.jobTitle = "Job Title is required";
      if (!hrData.department) newErrors.department = "Department is required";
    }

    // Terms Validation
    if (!termsAccepted) {
      // We can use a general alert or a specific error if we had a field for it.
      // For now, let's treat it as a block and maybe show an alert or set a general error?
      // Let's set a specific error for the checkbox if possible or just alert.
      // User asked "without clicking... we can not sign up". 
      // Best UX is a small error text below checkbox or just return false.
      // Since we don't have a dedicated error field in UI for terms yet, let's add one or rely on alert for this specific simple check.
      // Actually, let's add it to newErrors for consistency if we can display it.
      // The current UI just has the checkbox. I'll add an alert for now to be safe/quick, 
      // OR better: add error text support to the checkbox area.
      toast.error("You must agree to the Terms & Conditions");
      return false;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
    }

    return isValid;
  };

  const handleSignup = () => {
    if (!validateForm()) return;

    const payload = {
      ...basicData,
      userType,
      industry,
      ...(userType === 'Candidate' ? candidateData : hrData)
    };

    delete payload.confirmPassword;
    // Remove resume for now as unrelated to this task

    dispatch(registerUser(payload));
  };

  return (
    <StyledContainer>
      {/* LEFT SIDE */}
      <LeftSection>
        <FormWrapper>
          <Title>Create Account</Title>
          <SubTitle>Fill in the form below to get started.</SubTitle>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Grid container spacing={1.5}>
            {/* Basic Fields */}
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                label="Full Name"
                name="fullName"
                value={basicData.fullName}
                onChange={handleBasicChange}
                fullWidth
                required
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                label="Username"
                name="username"
                value={basicData.username}
                onChange={handleBasicChange}
                fullWidth
                required
                error={!!errors.username}
                helperText={errors.username}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                label="Email"
                type="email"
                name="email"
                value={basicData.email}
                onChange={handleBasicChange}
                fullWidth
                required
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                label="Phone"
                name="phone"
                value={basicData.phone}
                onChange={handleBasicChange}
                fullWidth
                required
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                label="Password"
                type="password"
                name="password"
                value={basicData.password}
                onChange={handleBasicChange}
                fullWidth
                required
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={basicData.confirmPassword}
                onChange={handleBasicChange}
                fullWidth
                required
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Grid>

            {/* User Type */}
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledTextField
                select
                label="User Type"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                fullWidth
                required
                sx={{ width: '100%' }}
              >
                <MenuItem value="Candidate">Candidate</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
              </StyledTextField>
            </Grid>

            {/* Date of Birth (Only if Candidate, using basicData.dob) */}
            {userType === "Candidate" && (
              <Grid size={{ xs: 12, md: 6 }}>
                <StyledTextField
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  value={basicData.dob}
                  onChange={handleBasicChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  sx={{ width: '100%' }}
                  error={!!errors.dob}
                  helperText={errors.dob}
                />
              </Grid>
            )}

            {/* Conditional Fields for Candidate */}
            {userType === "Candidate" && (
              <>
                <Grid size={{ xs: 12, md: 6 }}>
                  <StyledTextField
                    label="Experience (years)"
                    name="experience"
                    value={candidateData.experience}
                    onChange={handleCandidateChange}
                    fullWidth
                    required
                    error={!!errors.experience}
                    helperText={errors.experience}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <StyledTextField
                    label="Skills"
                    name="skills"
                    value={candidateData.skills}
                    onChange={handleCandidateChange}
                    fullWidth
                    required
                    error={!!errors.skills}
                    helperText={errors.skills}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="gray" mb={1}>Upload Resume</Typography>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleCandidateChange}
                    accept=".pdf,.doc,.docx"
                  />
                </Grid>
              </>
            )}

            {/* Conditional Fields for HR */}
            {userType === "HR" && (
              <>
                <Grid size={{ xs: 12, md: 6 }}>
                  <StyledTextField
                    label="Company Name"
                    name="companyName"
                    value={hrData.companyName}
                    onChange={handleHrChange}
                    fullWidth
                    required
                    error={!!errors.companyName}
                    helperText={errors.companyName}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <StyledTextField
                    label="Job Title"
                    name="jobTitle"
                    value={hrData.jobTitle}
                    onChange={handleHrChange}
                    fullWidth
                    required
                    error={!!errors.jobTitle}
                    helperText={errors.jobTitle}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <StyledTextField
                    label="Department"
                    name="department"
                    value={hrData.department}
                    onChange={handleHrChange}
                    fullWidth
                    required
                    error={!!errors.department}
                    helperText={errors.department}
                  />
                </Grid>
              </>
            )}

            {/* Industry */}
            <Grid size={12} sx={{ width: '100%', flexBasis: '100%' }}>
              <StyledTextField
                select
                label="Industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                fullWidth
                required
                sx={{ width: '100%' }}
              >
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Healthcare">Healthcare</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </StyledTextField>
            </Grid>

            {/* Terms */}
            <Grid size={12} sx={{ width: '100%', flexBasis: '100%' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                }
                label="I agree to the Terms & Conditions"
              />
            </Grid>

            {/* Sign Up */}
            <Grid size={12} sx={{ width: '100%', flexBasis: '100%' }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSignup}
                disabled={status === 'loading'}
                sx={{
                  width: "100%",
                  height: "48px",
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  textTransform: "none",
                  marginTop: "8px",
                }}
              >
                {status === 'loading' ? 'SIGNING UP...' : 'SIGN UP'}
              </Button>
            </Grid>
          </Grid>

          <Typography textAlign="center" mt={2} fontSize={14}>
            Or Sign Up With
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

          <Typography textAlign="center" mt={1} fontSize={14}>
            Already have an account?{" "}
            <Link to="/signin" style={{ color: "#6366f1", fontWeight: 600 }}>
              Sign In
            </Link>
          </Typography>
        </FormWrapper>
        <Footer>Copyright © 2025 HRMS.</Footer>
      </LeftSection>


      {/* RIGHT SIDE */}
      <RightPanel>
        <RightContent>
          <RightTitle>Join Our Platform</RightTitle>
          <RightSubtitle>
            Sign up to access your dashboard and manage your team efficiently.
          </RightSubtitle>

          <PreviewCard>
            <img src="/assets/auth-video.gif" alt="Preview" />
          </PreviewCard>
        </RightContent>
      </RightPanel>

      {/* <Footer>Copyright © 2025 HRMS.</Footer> */}
    </StyledContainer>
  );
};

export default Signup;