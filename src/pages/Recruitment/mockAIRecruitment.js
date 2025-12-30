/**
 * This file contains ONLY mock AI logic.
 * No JSX.
 * No UI.
 * No API calls.
 * Use setTimeout to simulate AI processing delay.
 */


// src/pages/Recruitment/mockAIService.js

export const parseJobFromText = (text = "") => {
  const lower = text.toLowerCase();

  // Title detection
  let title = "Job Role";
  if (lower.includes("frontend")) title = "Frontend Developer";
  else if (lower.includes("backend")) title = "Backend Engineer";
  else if (lower.includes("full stack")) title = "Full Stack Developer";

  // Location detection
  let location = "Not specified";
  if (lower.includes("bangalore")) location = "Bangalore";
  else if (lower.includes("pune")) location = "Pune";
  else if (lower.includes("delhi")) location = "Delhi";
  else if (lower.includes("remote")) location = "Remote";

  // Skills detection
  const skills = [];
  if (lower.includes("react")) skills.push("React");
  if (lower.includes("javascript")) skills.push("JavaScript");
  if (lower.includes("java")) skills.push("Java");
  if (lower.includes("spring")) skills.push("Spring Boot");
  if (lower.includes("node")) skills.push("Node.js");

  // Experience detection
  const expMatch = lower.match(/(\d+)\s*year/);
  const experience = expMatch ? `${expMatch[1]}+ years experience` : "";

  return {
    title,
    location,
    qualifications: [...skills, experience].filter(Boolean).join(", "),
    description: text,
  };
};


export const rankCandidates = (candidates = []) => {
  return candidates
    .map((candidate) => {
      const score = Math.floor(Math.random() * 40) + 60; // 60–99

      return {
        ...candidate,
        score,
        status:
          score >= 75
            ? "Shortlisted"
            : score >= 60
            ? "Needs Review"
            : "Rejected",
        reason:
          score >= 75
            ? "Strong skills match with job requirements"
            : score >= 60
            ? "Partial skills match, requires HR review"
            : "Low relevance to job requirements",
      };
    })
    .sort((a, b) => b.score - a.score);
};

export const suggestInterviewSlots = () => {
  return [
    {
      date: "Jan 5, 2025",
      time: "11:00 AM – 11:45 AM",
      interviewer: "Tech Lead",
    },
    {
      date: "Jan 6, 2025",
      time: "03:00 PM – 03:45 PM",
      interviewer: "Engineering Manager",
    },
    {
      date: "Jan 7, 2025",
      time: "12:00 PM – 12:45 PM",
      interviewer: "HR Manager",
    },
  ];
};
