import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useAuth } from "./context";
import { mainurl } from "./commonfile";
import { toast } from "react-toastify";


import { 
  Box, 
  Typography, 
  Paper, 
  IconButton, 
  TextField, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Container,
  Chip,
  
} from "@mui/material";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


import { Edit, Trash2, Clock, Calendar, X, CheckCircle } from "lucide-react";

const TodoCard = styled(Card)`
  transition: transform 0.2s, box-shadow 0.2s;
  border-left: 4px solid #3b82f6;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const TodoContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const HeaderSection = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const TodoMetadata = styled(Box)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const ActionButton = styled(IconButton)`
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
`;

function Showtodo() {
  const { todos } = useAuth();
  const [localTodos, setLocalTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");
  const [updatedDueDate, setUpdatedDueDate] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  useEffect(() => {
    if (todos) setLocalTodos(todos);
  }, [todos]);

  const handleUpdate = async (id) => {
    if (!updatedTitle || !updatedTime || !updatedDueDate) {
      toast.error("Title, Time, and Due Date are required!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    try {
      const response = await axios.put(
        `${mainurl}/todosroute/updatetodo/${id}`,
        {
          title: updatedTitle,
          description: updatedDescription,
          time: updatedTime,
          dueDays: updatedDueDate,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const updatedTodos = localTodos.map((todo) =>
          todo._id === id
            ? {
                ...todo,
                title: updatedTitle,
                description: updatedDescription,
                time: updatedTime,
                dueDate: updatedDueDate,
              }
            : todo
        );
        setLocalTodos(updatedTodos);
        closeEditModal();
        toast.success("Todo updated successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating todo:", error.message);
      toast.error("Failed to update todo", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${mainurl}/todosroute/deletetodo/${id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setLocalTodos(localTodos.filter((todo) => todo._id !== id));
        toast.success("Todo deleted successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error deleting todo:", error.message);
      toast.error("Failed to delete todo", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo._id);
    setUpdatedTitle(todo.title);
    setUpdatedDescription(todo.description || "");
    setUpdatedTime(todo.time);
    setUpdatedDueDate(todo.dueDays);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTodo(null);
    setUpdatedTitle("");
    setUpdatedDescription("");
    setUpdatedTime("");
    setUpdatedDueDate("");
  };

  return (
    <Box className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-white">
      <TodoContainer maxWidth="md">
        <HeaderSection>
          <Typography 
            variant="h3" 
            component="h1" 
            className="text-blue-700 dark:text-blue-300 font-bold flex items-center"
          >
          
            My Todos
          </Typography>
        </HeaderSection>

        <Box className="space-y-4">
          {localTodos.length === 0 ? (
            <Card className="p-8 text-center">
              <Typography variant="body1" color="textSecondary">
                No todos yet. Add some tasks to get started!
              </Typography>
            </Card>
          ) : (
            localTodos.map((todo) => (
              <TodoCard key={todo._id} className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <Box className="flex-grow">
                      <Typography 
                        variant="h6" 
                        className="text-blue-800 dark:text-blue-300 font-semibold mb-2"
                      >
                        {todo.title}
                      </Typography>
                      
                      {todo.description && (
                        <Typography 
                          variant="body2" 
                          className="text-gray-600 dark:text-gray-300 mb-3"
                        >
                          {todo.description}
                        </Typography>
                      )}
                      
                      <TodoMetadata>
                        <Chip 
                          icon={<Clock className="h-4 w-4" />} 
                          label={todo.time}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip 
                          icon={<Calendar className="h-4 w-4" />} 
                          label={formatDate(todo.dueDays)}
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                      </TodoMetadata>
                    </Box>

                    <Box className="flex mt-4 sm:mt-0">
                      <ActionButton 
                        aria-label="edit"
                        onClick={() => openEditModal(todo)}
                        color="primary"
                      >
                        <Edit size={20} />
                      </ActionButton>
                      <ActionButton 
                        aria-label="delete"
                        onClick={() => handleDelete(todo._id)}
                        color="error"
                      >
                        <Trash2 size={20} />
                      </ActionButton>
                    </Box>
                  </Box>
                </CardContent>
              </TodoCard>
            ))
          )}
        </Box>

        {/* Edit Todo Dialog */}
        <Dialog 
          open={isEditModalOpen} 
          onClose={closeEditModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle className="bg-blue-50 dark:bg-gray-800 dark:text-white">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Edit Todo</Typography>
              <IconButton onClick={closeEditModal} size="small">
                <X size={20} />
              </IconButton>
            </Box>
          </DialogTitle>
          
          <DialogContent className="dark:bg-gray-800">
            <Box component="form" className="space-y-4 pt-4">
              <TextField
                label="Title"
                fullWidth
                variant="outlined"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                required
                className="dark:bg-gray-700 dark:text-white"
              />
              
              <TextField
                label="Description"
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                className="dark:bg-gray-700 dark:text-white"
              />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Time"
                    type="time"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={updatedTime}
                    onChange={(e) => setUpdatedTime(e.target.value)}
                    required
                    className="dark:bg-gray-700 dark:text-white"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Due Date"
                    type="date"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={updatedDueDate}
                    onChange={(e) => setUpdatedDueDate(e.target.value)}
                    required
                    className="dark:bg-gray-700 dark:text-white"
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          
          <DialogActions className="dark:bg-gray-800 p-4">
            <Button 
              onClick={closeEditModal} 
              variant="outlined"
              color="inherit"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => handleUpdate(editingTodo)} 
              variant="contained"
              color="primary"
              disableElevation
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </TodoContainer>
    </Box>
  );
}

export default Showtodo;