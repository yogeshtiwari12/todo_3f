import React, { useState } from 'react';
import { PlusCircle, Calendar, Clock } from 'lucide-react';
import axios from 'axios';
import { mainurl } from './commonfile';
import { 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Box,
  Card,
  CardContent,
  Stack,
  Alert,
  Snackbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme as useAppTheme } from "../themeprovider";

// Styled MUI components
const StyledCard = styled(Card)(({ theme, isdark }) => ({
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  borderRadius: '0.5rem',
  backgroundColor: isdark === 'true' ? '#1F2937' : '#FFFFFF',
  transition: 'all 0.3s ease',
}));

const StyledTextField = styled(TextField)(({ theme, isdark }) => ({
  marginBottom: '1rem',
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '0.375rem',
    backgroundColor: isdark === 'true' ? '#374151' : '#FFFFFF',
    color: isdark === 'true' ? '#FFFFFF' : 'inherit',
    '& fieldset': {
      borderColor: isdark === 'true' ? '#4B5563' : '#93C5FD',
    },
    '&:hover fieldset': {
      borderColor: isdark === 'true' ? '#6B7280' : '#60A5FA',
    },
    '&.Mui-focused fieldset': {
      borderColor: isdark === 'true' ? '#60A5FA' : '#2563EB',
    },
  },
  '& .MuiInputLabel-root': {
    color: isdark === 'true' ? '#D1D5DB' : '#1E40AF',
  },
  '& .MuiInputBase-input': {
    color: isdark === 'true' ? '#FFFFFF' : 'inherit',
    '&::placeholder': {
      color: isdark === 'true' ? '#9CA3AF' : 'inherit',
      opacity: 1,
    },
  },
}));

const StyledButton = styled(Button)(({ theme, isdark, variant }) => ({
  padding: '0.75rem 1.5rem',
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: '0.5rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.2s ease',
  ...(variant === 'contained' ? {
    backgroundColor: isdark === 'true' ? '#2563EB' : '#2563EB',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: isdark === 'true' ? '#1D4ED8' : '#1D4ED8',
      transform: 'translateY(-1px)',
    },
  } : {
    color: isdark === 'true' ? '#FFFFFF' : '#2563EB',
    borderColor: isdark === 'true' ? '#4B5563' : '#93C5FD',
    '&:hover': {
      backgroundColor: isdark === 'true' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(37, 99, 235, 0.05)',
      borderColor: isdark === 'true' ? '#6B7280' : '#60A5FA',
      transform: 'translateY(-1px)',
    },
  }),
}));

const FormLabel = styled(Typography)(({ theme, isdark }) => ({
  fontSize: '0.875rem',
  fontWeight: 600,
  marginBottom: '0.5rem',
  color: isdark === 'true' ? '#FFFFFF' : '#1E3A8A',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}));

const Todo = () => {
  const { theme } = useAppTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [dueDate, setDueDate] = useState(() => {
    const today = new Date();
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);
    return twoDaysLater.toISOString().split('T')[0];
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const addTodo = async () => {
    if (!title || !description || !dueDate || !time) {
      setSnackbar({
        open: true,
        message: 'Please fill all the fields',
        severity: 'error'
      });
      return;
    }

    const [hours, minutes] = time.split(':');
    const dueDateObj = new Date(dueDate);
    dueDateObj.setHours(parseInt(hours), parseInt(minutes), 0);

    const newTodo = {
      title,
      description,
      dueDays: dueDateObj,
      time,
    };

    try {
      const response = await axios.post(
        `${mainurl}/todosroute/addtodo`, 
        newTodo, 
        { withCredentials: true }
      );
      
      if (response.status === 200 || response.status === 201) {
        setSnackbar({
          open: true,
          message: 'Todo added successfully!',
          severity: 'success'
        });
        resetForm();
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to add todo',
        severity: 'error'
      });
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    const today = new Date();
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);
    setDueDate(twoDaysLater.toISOString().split('T')[0]);
    setTime('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: theme === 'dark' ? '#111827' : '#EFF6FF',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Container maxWidth="md">
        <StyledCard isdark={theme === 'dark' ? 'true' : 'false'}>
          <CardContent sx={{ padding: '2rem' }}>
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                marginBottom: '2rem',
                color: theme === 'dark' ? '#60A5FA' : '#1E40AF',
              }}
            >
              Create Todo
            </Typography>

            <Stack spacing={3}>
              {/* Title Input */}
              <Box>
                <FormLabel isdark={theme === 'dark' ? 'true' : 'false'}>
                  Title
                </FormLabel>
                <StyledTextField
                  fullWidth
                  placeholder="Enter todo title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  isdark={theme === 'dark' ? 'true' : 'false'}
                />
              </Box>

              {/* Description Input */}
              <Box>
                <FormLabel isdark={theme === 'dark' ? 'true' : 'false'}>
                  Description
                </FormLabel>
                <StyledTextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Enter todo description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  isdark={theme === 'dark' ? 'true' : 'false'}
                />
              </Box>

              {/* Due Date Input */}
              <Box>
                <FormLabel isdark={theme === 'dark' ? 'true' : 'false'}>
                  <Calendar size={18} color={theme === 'dark' ? '#60A5FA' : '#2563EB'} />
                  Due Date (Default: 2 days from today)
                </FormLabel>
                <StyledTextField
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  inputProps={{
                    min: new Date().toISOString().split('T')[0],
                  }}
                  isdark={theme === 'dark' ? 'true' : 'false'}
                />
              </Box>

              {/* Time Input */}
              <Box>
                <FormLabel isdark={theme === 'dark' ? 'true' : 'false'}>
                  <Clock size={18} color={theme === 'dark' ? '#60A5FA' : '#2563EB'} />
                  Time
                </FormLabel>
                <StyledTextField
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  isdark={theme === 'dark' ? 'true' : 'false'}
                />
              </Box>

              {/* Buttons */}
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <StyledButton
                  variant="contained"
                  onClick={addTodo}
                  isdark={theme === 'dark' ? 'true' : 'false'}
                  startIcon={<PlusCircle size={18} />}
                >
                  Add Todo
                </StyledButton>
                
                <StyledButton
                  variant="outlined"
                  onClick={resetForm}
                  isdark={theme === 'dark' ? 'true' : 'false'}
                >
                  Reset
                </StyledButton>
              </Stack>
            </Stack>
          </CardContent>
        </StyledCard>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Todo;