'use client';
import { Box, Stack, Button, TextField, Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import HomeIcon from '@mui/icons-material/Home';

export default function Home() {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isProcessingId, setIsProcessingId] = useState(null);
  const endRef = useRef(null);
  const router = useRouter();

  const getGreetingName = () => {
    if (user && user.firstName) {
      return user.firstName;
    } else if (user && user.primaryEmailAddress && user.primaryEmailAddress.emailAddress) {
      return user.primaryEmailAddress.emailAddress.split('@')[0];
    } else {
      return '';
    }
  };

  useEffect(() => {
    if (user) {
      const initialMessage = {
        id: Date.now(),
        role: "assistant",
        content: `Hi ${getGreetingName()}! I'm the Rate My Professor support assistant. How can I help you today?`
      };
      setMessages([initialMessage]);
    }
  }, [user]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    const newMessageId = Date.now();
    setMessages((messages) => [
      ...messages,
      { id: newMessageId, role: "user", content: message },
      { id: newMessageId + 1, role: "assistant", content: '' }
    ]);
    setMessage('');
    setIsProcessingId(newMessageId + 1);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value || new Uint8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text }
          ];
        });
      }
    } finally {
      setIsProcessingId(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const getMessageStyle = (role) => {
    return {
      background: role === "assistant" ? 
        'linear-gradient(135deg, #FF69B4 30%, #FF1493 90%)' :
        'linear-gradient(135deg, #00BFFF 30%, #1E90FF 90%)',
      color: 'white',
      borderRadius: '16px',
      padding: '8px',
      maxWidth: '70%',
      alignSelf: role === "assistant" ? 'flex-start' : 'flex-end',
    };
  };

  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex" 
      flexDirection="column"
      sx={{
        background: 'linear-gradient(135deg, #FFC0CB 30%, #00BFFF 90%)',
        padding: 2,
      }}
    >
      <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="home" onClick={() => router.push('/')}>
            <HomeIcon />
          </IconButton>
          <Box flexGrow={1} />
          <UserButton />
        </Toolbar>
      </AppBar>

      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        flexGrow={1}
      >
        <Stack 
          direction="column" 
          width="40vw" 
          height="80vh" 
          bgcolor="white"
          borderRadius={4}
          boxShadow={4}
          p={3}
          spacing={3}
          sx={{
            border: '1px solid #E0E0E0',
            overflow: 'hidden',
          }}
        >
          <Typography variant="h6" align="center" color="primary">
            Rate My Professor Assistant
          </Typography>
          <Stack 
            direction="column" 
            spacing={2} 
            flexGrow={1} 
            overflow="auto"
          >
            {messages.map((msg) => (
              <Box 
                key={msg.id} 
                display="flex" 
                justifyContent={msg.role === "assistant" ? "flex-start" : "flex-end"}
              >
                <Box 
                  sx={getMessageStyle(msg.role)}
                >
                  {msg.content}
                  {msg.role === "assistant" && msg.id === isProcessingId && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Box sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        backgroundColor: 'white', 
                        animation: 'pulsing 1s infinite'
                      }} />
                      <Box sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        backgroundColor: 'white', 
                        animation: 'pulsing 1s 0.2s infinite'
                      }} />
                      <Box sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        backgroundColor: 'white', 
                        animation: 'pulsing 1s 0.4s infinite'
                      }} />
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
            <div ref={endRef} />
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="Type your message..."
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                },
              }}
            />
            <Button 
              variant="contained" 
              onClick={sendMessage}
              sx={{
                background: 'linear-gradient(135deg, #FF69B4 30%, #FF1493 90%)',
                color: 'white',
                borderRadius: '16px',
                textTransform: 'none',
                px: 3,
                '&:hover': {
                  background: 'linear-gradient(135deg, #FF1493 30%, #FF69B4 90%)',
                },
              }}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Box>

      <style jsx global>{`
        @keyframes pulsing {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </Box>
  );
}




