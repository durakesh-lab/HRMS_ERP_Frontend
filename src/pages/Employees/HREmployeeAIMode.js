import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Stack,
  Button,
  Card,
  CardContent,
  Divider
} from "@mui/material";
import { Send, Mic } from "@mui/icons-material";

import {
  findEmployeeByName,
  proposeEmployeeUpdate,
  mockDocumentUpdate
} from "./mockAIHREmp";

export default function HREmployeesAIMode() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "Hi! I can help you retrieve employee info, propose updates, manage documents, and trigger workflows."
    }
  ]);

  const [input, setInput] = useState("");
  const [preview, setPreview] = useState(null);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    // ✅ PASS FULL INPUT (NO EXTRACTION)
    const employee = findEmployeeByName(input);

    // SHOW PROFILE
    if (employee && input.toLowerCase().includes("show")) {
      setPreview({ type: "PROFILE", employee });
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Here is the employee profile." }
      ]);
    }

    // PROPOSE UPDATE
    const update = proposeEmployeeUpdate(input, employee);
    if (update) {
      setPreview(update);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "This change requires HR approval. Please review."
        }
      ]);
    }

    // DOCUMENT UPDATE
    if (input.toLowerCase().includes("document")) {
      setPreview(mockDocumentUpdate(employee));
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Document update prepared for approval." }
      ]);
    }

    // ❗ Optional fallback if employee not found
    if (!employee) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I couldn’t find that employee. Please check the name."
        }
      ]);
    }

    setInput("");
  };

  return (
    <Paper
      sx={{
        height: "calc(100vh - 220px)",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3
      }}
    >
      {/* CHAT AREA */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
        <Stack spacing={1.5}>
          {messages.map((msg, i) => (
            <Box
              key={i}
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

        {/* PREVIEW */}
        {preview && (
          <Card variant="outlined" sx={{ mt: 3 }}>
            <CardContent>
              {preview.type === "PROFILE" && (
                <>
                  <Typography fontWeight={700}>
                    {preview.employee.name}
                  </Typography>
                  <Typography variant="body2">
                    {preview.employee.role} — {preview.employee.department}
                  </Typography>
                  <Typography variant="body2">
                    📧 {preview.employee.email}
                  </Typography>
                  <Typography variant="body2">
                    📞 {preview.employee.phone}
                  </Typography>
                </>
              )}

              {preview.type === "UPDATE" && (
                <>
                  <Typography fontWeight={700}>Proposed Update</Typography>
                  <Typography variant="body2">
                    {preview.employee.name} — {preview.field}
                  </Typography>
                  <Typography variant="body2">
                    {preview.oldValue} → {preview.newValue}
                  </Typography>
                  <Stack direction="row" spacing={1} mt={2}>
                    <Button variant="contained" size="small">
                      Approve
                    </Button>
                    <Button variant="outlined" size="small">
                      Reject
                    </Button>
                  </Stack>
                </>
              )}

              {preview.type === "WORKFLOW" && (
                <>
                  <Typography fontWeight={700}>Workflow Triggered</Typography>
                  <Typography variant="body2">
                    Promotion: {preview.oldRole} → {preview.newRole}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption">
                    This will trigger salary & training workflows
                  </Typography>
                  <Stack direction="row" spacing={1} mt={2}>
                    <Button variant="contained" size="small">
                      Approve Promotion
                    </Button>
                    <Button variant="outlined" size="small">
                      Reject
                    </Button>
                  </Stack>
                </>
              )}

              {preview.type === "DOCUMENT" && (
                <>
                  <Typography fontWeight={700}>Document Update</Typography>
                  <Typography variant="body2">
                    {preview.document} — {preview.employee?.name}
                  </Typography>
                  <Stack direction="row" spacing={1} mt={2}>
                    <Button variant="contained" size="small">
                      Approve
                    </Button>
                    <Button variant="outlined" size="small">
                      Reject
                    </Button>
                  </Stack>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </Box>

      {/* INPUT */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #eee",
          display: "flex",
          gap: 1,
          alignItems: "center"
        }}
      >
        <TextField
          fullWidth
          placeholder="Ask about employees or request updates..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <IconButton>
          <Mic />
        </IconButton>
        <IconButton onClick={handleSend} color="primary">
          <Send />
        </IconButton>
      </Box>
    </Paper>
  );
}
