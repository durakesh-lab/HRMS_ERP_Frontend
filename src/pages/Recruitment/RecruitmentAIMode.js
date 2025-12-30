import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Stack,
  Button,
  Chip,
  Card,
  CardContent
} from "@mui/material";
import { Send, Mic } from "@mui/icons-material";

import {
  parseJobFromText,
  rankCandidates,
  suggestInterviewSlots
} from "./mockAIRecruitment";

const mockCandidates = [
  { id: 1, name: "John Doe", skills: "React, Redux", experience: "5 Years" },
  { id: 2, name: "Alice Williams", skills: "UI/UX, Figma", experience: "3 Years" },
  { id: 3, name: "Mike Johnson", skills: "Node, Java", experience: "4 Years" }
];

export default function RecruitmentAIMode() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I can help you create jobs, shortlist candidates, and schedule interviews." }
  ]);
  const [input, setInput] = useState("");
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [slots, setSlots] = useState([]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    // JOB CREATION
    if (input.toLowerCase().includes("create")) {
      const jobData = parseJobFromText(input);
      setJob(jobData);

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "I created this job posting. Please review:" }
      ]);
    }

    // SHORTLISTING
    if (input.toLowerCase().includes("shortlist")) {
      const ranked = rankCandidates(mockCandidates);
      setCandidates(ranked);

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "I shortlisted candidates based on relevance." }
      ]);
    }

    // INTERVIEW SCHEDULING
    if (input.toLowerCase().includes("schedule")) {
      const suggested = suggestInterviewSlots();
      setSlots(suggested);

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Here are the suggested interview slots." }
      ]);
    }

    setInput("");
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={700}>
          🤖 Recruitment AI Assistant
        </Typography>

        {/* CHAT MESSAGES */}
        <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
          <Stack spacing={1.5}>
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  bgcolor: msg.sender === "user" ? "primary.main" : "grey.100",
                  color: msg.sender === "user" ? "white" : "text.primary",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: "75%"
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* JOB RESULT */}
        {job && (
          <Card variant="outlined">
            <CardContent>
              <Typography fontWeight={700}>{job.title}</Typography>
              <Typography variant="body2">{job.location}</Typography>
              <Typography variant="body2">{job.qualifications}</Typography>
              <Stack direction="row" spacing={1} mt={1}>
                <Button size="small" variant="contained">Approve</Button>
                <Button size="small" variant="outlined">Edit</Button>
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* SHORTLISTED CANDIDATES */}
        {candidates.map((c) => (
          <Card key={c.id} variant="outlined">
            <CardContent>
              <Typography fontWeight={600}>{c.name}</Typography>
              <Chip label={`${c.score}/100`} size="small" />
              {c.status === "Needs Review" && (
                <Stack direction="row" spacing={1} mt={1}>
                  <Button size="small" variant="contained">Approve</Button>
                  <Button size="small" variant="outlined">Reject</Button>
                </Stack>
              )}
            </CardContent>
          </Card>
        ))}

        {/* INTERVIEW SLOTS */}
        {slots.map((s, i) => (
          <Card key={i} variant="outlined">
            <CardContent>
              <Typography fontWeight={600}>
                {s.date} — {s.time}
              </Typography>
              <Typography variant="body2">{s.interviewer}</Typography>
              <Button size="small" variant="contained" sx={{ mt: 1 }}>
                Approve Schedule
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* INPUT */}
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            placeholder="Type or speak your request..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <IconButton color="primary">
            <Mic />
          </IconButton>
          <IconButton color="primary" onClick={sendMessage}>
            <Send />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
}
