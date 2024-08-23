'use client';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function MainPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/chat'); 
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: 'linear-gradient(135deg, #FFC0CB 30%, #00BFFF 90%)',
        padding: '20px',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          bgcolor: "white",
          borderRadius: 4,
          boxShadow: 4,
          padding: 4,
          border: '1px solid #E0E0E0',
        }}
      >
        <SignedIn>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <UserButton />
          </Box>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              background: 'linear-gradient(135deg, #FF69B4 30%, #FF1493 90%)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Welcome to Rate My Professor Assistant
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            gutterBottom
          >
            You&apos;re all set! Click the &apos;Get Started&apos; button below to begin using our chat features.
          </Typography>

          <Box mt={3} display="flex" justifyContent="center" mb={4}>
            <Button
              variant="contained"
              onClick={handleGetStarted}
              sx={{
                background: 'linear-gradient(135deg, #FF69B4 30%, #FF1493 90%)',
                color: 'white',
                borderRadius: '16px',
                textTransform: 'none',
                px: 3,
                mx: 1,
                '&:hover': {
                  background: 'linear-gradient(135deg, #FF1493 30%, #FF69B4 90%)',
                },
              }}
            >
              Get Started
            </Button>
          </Box>
        </SignedIn>

        <SignedOut>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              background: 'linear-gradient(135deg, #FF69B4 30%, #FF1493 90%)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Welcome to Rate My Professor Assistant
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            gutterBottom
          >
            Please sign in or create an account to get started.
          </Typography>

          <Box mt={3} display="flex" justifyContent="center" mb={4}>
            <SignInButton mode="modal">
              <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #FF69B4 30%, #FF1493 90%)',
                  color: 'white',
                  borderRadius: '16px',
                  textTransform: 'none',
                  px: 3,
                  mx: 1,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FF1493 30%, #FF69B4 90%)',
                  },
                }}
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#FF69B4',
                  color: '#FF69B4',
                  borderRadius: '16px',
                  textTransform: 'none',
                  px: 3,
                  mx: 1,
                  '&:hover': {
                    borderColor: '#FF69B4',
                    backgroundColor: 'rgba(255, 105, 180, 0.1)',
                  },
                }}
              >
                Sign Up
              </Button>
            </SignUpButton>
          </Box>
        </SignedOut>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box
              p={3}
              borderRadius={4}
              sx={{
                bgcolor: '#FFC0CB',
                textAlign: 'center',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  bgcolor: '#FF69B4',
                },
              }}
            >
              <Typography variant="h6" gutterBottom>
                Smart Guidance
              </Typography>
              <Typography variant="body2">
                Receive instant, insightful guidance on your academic questions and concerns.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              p={3}
              borderRadius={4}
              sx={{
                bgcolor: '#FFC0CB',
                textAlign: 'center',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  bgcolor: '#FF69B4',
                },
              }}
            >
              <Typography variant="h6" gutterBottom>
                Tailored Assistance
              </Typography>
              <Typography variant="body2">
                Get personalized help and recommendations to streamline your academic journey.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              p={3}
              borderRadius={4}
              sx={{
                bgcolor: '#FFC0CB',
                textAlign: 'center',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  bgcolor: '#FF69B4',
                },
              }}
            >
              <Typography variant="h6" gutterBottom>
                Insightful Tips
              </Typography>
              <Typography variant="body2">
                Receive helpful tips and advice based on your preferences and needs.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'transparent',
          color: 'white',
          py: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '& button': {
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            mx: 1,
            textTransform: 'none',
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
            '& svg': {
              color: '#FF69B4',
            },
          },
        }}
      >
        <Box sx={{ mr: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textDecoration: 'underline',
              color: '#FF69B4', 
            }}
          >
            Contact us
          </Typography>
          <Box>
            <Button
              href="mailto:tayyar3002m@gmail.com"
              startIcon={<EmailIcon />}
            >
              Email us
            </Button>
            <Button
              href="tel:+19083070966"
              startIcon={<PhoneIcon />}
            >
              Call us
            </Button>
          </Box>
        </Box>

        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textDecoration: 'underline',
              color: '#FF69B4', 
              mr: 2,
            }}
          >
            Connect with us
          </Typography>
          <Box>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/tayyarmustamir/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://github.com/Tayyarm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.facebook.com/tayyar.mustamir"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}










