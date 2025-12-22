import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Paper,
    IconButton,
    Typography,
    TextField,
    Avatar,
    Fab,
    Slide,
    InputAdornment,
    CircularProgress
} from '@mui/material';
import {
    Chat as ChatIcon,
    Close as CloseIcon,
    Send as SendIcon,
    Mic as MicIcon,
    SmartToy as BotIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MOCK_RESPONSES = {
    'hello': "Hello! I am your HR Assistant. How can I help you today?",
    'hi': "Hi there! Need help with Recruitment, Leave, or Payroll?",
    'recruitment': "Navigating to Recruitment module...",
    'employees': "Taking you to the Employee Directory...",
    'leave': "Opening Leave Management...",
    'default': "I'm still learning. Try asking about 'Recruitment', 'Leave', or say 'Hello'."
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { id: 1, sender: 'bot', text: "Hi! I'm your AI Assistant. Ask me anything or say 'navigate to recruitment' to jump pages." }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);
    const navigate = useNavigate();

    // Initialize Speech Recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onstart = () => setIsListening(true);
            recognitionRef.current.onend = () => setIsListening(false);
            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
            };
            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };
        }
    }, []);

    const toggleListening = () => {
        if (!recognitionRef.current) {
            // Fallback or alert if not supported
            console.warn("Speech recognition not supported");
            return;
        }
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isOpen]);

    const handleSend = () => {
        if (!message.trim()) return;

        // 1. Add User Message
        const userMsg = { id: Date.now(), sender: 'user', text: message };
        setChatHistory(prev => [...prev, userMsg]);
        setMessage('');
        setIsTyping(true);

        // 2. Process Command (Mock Logic)
        const lowerMsg = message.toLowerCase();
        let botResponse = MOCK_RESPONSES['default'];
        let action = null;

        if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) botResponse = MOCK_RESPONSES['hello'];
        if (lowerMsg.includes('recruitment') || lowerMsg.includes('job')) {
            if (lowerMsg.includes('post') || lowerMsg.includes('create') || lowerMsg.includes('new')) {
                botResponse = "Opening Create Job form...";
                action = () => navigate('/dashboard/recruitment', { state: { action: 'open_create_job' } });
            } else if (lowerMsg.includes('search') || lowerMsg.includes('find')) {
                botResponse = "Taking you to Job Search...";
                action = () => navigate('/dashboard/recruitment', { state: { action: 'focus_search' } });
            } else {
                botResponse = MOCK_RESPONSES['recruitment'];
                action = () => navigate('/dashboard/recruitment');
            }
        }
        if (lowerMsg.includes('employee') || lowerMsg.includes('staff')) {
            botResponse = MOCK_RESPONSES['employees'];
            action = () => navigate('/dashboard/employees');
        }

        // 3. Simulate AI Delay
        setTimeout(() => {
            const botMsg = { id: Date.now() + 1, sender: 'bot', text: botResponse };
            setChatHistory(prev => [...prev, botMsg]);
            setIsTyping(false);
            if (action) action();
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            {/* Floating Action Button */}
            {!isOpen && (
                <Fab
                    color="primary"
                    aria-label="chat"
                    sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1200 }}
                    onClick={() => setIsOpen(true)}
                >
                    <ChatIcon />
                </Fab>
            )}

            {/* Chat Window */}
            <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                <Paper sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    width: { xs: '90%', sm: 350 },
                    height: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1200,
                    boxShadow: 6,
                    borderRadius: 2,
                    overflow: 'hidden'
                }}>
                    {/* Header */}
                    <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ bgcolor: 'white', color: 'primary.main', width: 32, height: 32 }}>
                                <BotIcon fontSize="small" />
                            </Avatar>
                            <Typography variant="subtitle1" fontWeight="bold">AI Assistant</Typography>
                        </Box>
                        <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Chat Body */}
                    <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto', bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {chatHistory.map((msg) => (
                            <Box
                                key={msg.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    alignItems: 'flex-end',
                                    gap: 1
                                }}
                            >
                                {msg.sender === 'bot' && (
                                    <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main', mb: 0.5 }}>
                                        <BotIcon sx={{ fontSize: 16 }} />
                                    </Avatar>
                                )}
                                <Paper sx={{
                                    p: 1.5,
                                    maxWidth: '80%',
                                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'white',
                                    color: msg.sender === 'user' ? 'white' : 'text.primary',
                                    borderRadius: 2,
                                    borderBottomLeftRadius: msg.sender === 'bot' ? 0 : 2,
                                    borderBottomRightRadius: msg.sender === 'user' ? 0 : 2
                                }}>
                                    <Typography variant="body2">{msg.text}</Typography>
                                </Paper>
                            </Box>
                        ))}
                        {isTyping && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', ml: 4 }}>
                                <Paper sx={{ p: 1, px: 2, borderRadius: 2, bgcolor: 'white' }}>
                                    <CircularProgress size={12} />
                                </Paper>
                            </Box>
                        )}
                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Input Area */}
                    <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #eee' }}>
                        <TextField
                            fullWidth
                            placeholder={isListening ? "Listening..." : "Type a message..."}
                            variant="outlined"
                            size="small"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            color={isListening ? "error" : "default"}
                                            onClick={toggleListening}
                                        >
                                            <MicIcon />
                                        </IconButton>
                                        <IconButton size="small" color="primary" onClick={handleSend}>
                                            <SendIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                </Paper>
            </Slide>
        </>
    );
}
