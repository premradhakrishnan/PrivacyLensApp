// components/ChatWindow.jsx
import React from 'react';
import { Box, Fab, Card, CardHeader, CardContent, IconButton, TextField, Button, Typography } from '@mui/material';
import { Chat, Remove, Send } from '@mui/icons-material';

const ChatWindow = ({ isChatOpen, setIsChatOpen, chatMessages, messageInput, setMessageInput, sendMessage }) => (
  <Box
    sx={{
      position: 'fixed',
      bottom: 32,
      right: 32,
      transition: 'all 0.3s',
      width: isChatOpen ? 320 : 'auto'
    }}
  >
    {!isChatOpen ? (
      <Fab color="primary" onClick={() => setIsChatOpen(true)}>
        <Chat />
      </Fab>
    ) : (
      <Card>
        <CardHeader
          title="Need Help?"
          action={
            <IconButton onClick={() => setIsChatOpen(false)}>
              <Remove />
            </IconButton>
          }
          sx={{ py: 2 }}
        />
        <CardContent>
          <Box sx={{ height: 300, overflowY: 'auto', mb: 2 }}>
            {chatMessages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  p: 1,
                  mb: 1,
                  borderRadius: 1,
                  bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.100',
                  ml: msg.sender === 'user' ? 4 : 0,
                  mr: msg.sender === 'bot' ? 4 : 0
                }}
              >
                <Typography>{msg.text}</Typography>
              </Box>
            ))}
          </Box>
          <Box component="form" onSubmit={sendMessage} sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              fullWidth
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your question..."
            />
            <Button type="submit" variant="contained" endIcon={<Send />}>
              Send
            </Button>
          </Box>
        </CardContent>
      </Card>
    )}
  </Box>
);

export default ChatWindow;