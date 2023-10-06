import React, { useState, memo, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';
import { Wrapper } from '../styles/StyledComponent';
import { INITIAL_LIST as list } from '../utils/constant';

const Challenge7 = memo(() => {
  const [loading, setLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState([]); // Initialize with an empty array
  const [unCompletedTasks, setUnCompletedTasks] = useState([]);

  useEffect(() => {
    // Initialize unCompletedTasks with the initial data structure
    const initialUncompletedTasks = Object.entries(list).map(([task, subtasks]) => ({
      task,
      subtasks,
    }));
    setUnCompletedTasks(initialUncompletedTasks);
  }, []);

  useEffect(() => {
    const createTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(createTimer);
    };
  }, []);

  const handleCheckUnCompletedTask = (taskIndex, subtaskIndex) => {
    console.log(taskIndex, subtaskIndex);
    if (!unCompletedTasks[taskIndex] || !unCompletedTasks[taskIndex].subtasks) {
      return; // Check if the task or subtasks are undefined
    }
    const taskToMove = unCompletedTasks[taskIndex].subtasks[subtaskIndex];
    setUnCompletedTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[taskIndex].subtasks.splice(subtaskIndex, 1);
      if (updatedTasks[taskIndex].subtasks.length === 0) {
        updatedTasks.splice(taskIndex, 1);
      }
      return updatedTasks;
    });
    // Update completedTasks by adding the completed subtask to the corresponding task
    setCompletedTasks((prev) => {
      const updatedTasks = [...prev];
      updatedTasks[taskIndex].subtasks.push(taskToMove);
      return updatedTasks;
    });
    console.log(taskToMove);
  };

  const handleCheckCompletedTask = (taskIndex, subtaskIndex) => {
    console.log(taskIndex, subtaskIndex);
    if (!completedTasks[taskIndex] || !completedTasks[taskIndex].subtasks) {
      return; // Check if the task or subtasks are undefined
    }
    const taskToMove = completedTasks[taskIndex].subtasks[subtaskIndex];
    setCompletedTasks((prev) => {
      const updatedTasks = [...prev];
      updatedTasks[taskIndex].subtasks.splice(subtaskIndex, 1);
      if (updatedTasks[taskIndex].subtasks.length === 0) {
        updatedTasks.splice(taskIndex, 1);
      }
      return updatedTasks;
    });
    // Update unCompletedTasks by adding the uncompleted subtask to the corresponding task
    setUnCompletedTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[taskIndex].subtasks.push(taskToMove);
      return updatedTasks;
    });
    console.log(taskToMove);
  };

  return (
    <Wrapper>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} xs={12}>
              <Typography variant="h3" fontWeight={500} align="center" paddingBottom={2}>
                Not Completed
              </Typography>
              {unCompletedTasks.map((task, taskIndex) => {
                console.log(task);
                return (
                  <div key={taskIndex}>
                    <Typography variant="h4" align="center" paddingBottom={3}>
                      {task.task}
                    </Typography>
                    {task.subtasks && task.subtasks.map((subtask, subtaskIndex) => {
                      const subtaskText = Object.keys(subtask)[0];
                      return (
                        <Box
                          key={subtaskIndex}
                          onClick={() => handleCheckUnCompletedTask(taskIndex, subtaskIndex)}
                          sx={{ cursor: 'pointer' }}
                        >
                          <Typography variant="h6" align="center" paddingBottom={3}>
                            {subtaskText}
                          </Typography>
                        </Box>
                      );
                    })}
                  </div>
                );
              })}
            </Grid>

            <Grid item lg={6} md={6} xs={12}>
              <Typography variant="h3" fontWeight={500} align="center" paddingBottom={2}>
                Completed
              </Typography>
              {completedTasks.map((task, taskIndex) => {
                console.log(task);
                return (
                  <div key={taskIndex}>
                    <Typography variant="h4" align="center" paddingBottom={3}>
                      {task.task}
                    </Typography>
                    {task.subtasks && task.subtasks.map((subtask, subtaskIndex) => {
                      const subtaskText = Object.keys(subtask)[0];
                      return (
                        <Box
                          key={subtaskIndex}
                          onClick={() => handleCheckCompletedTask(taskIndex, subtaskIndex)}
                          sx={{ cursor: 'pointer' }}
                        >
                          <Typography variant="h6" align="center" paddingBottom={3}>
                            {subtaskText}
                          </Typography>
                        </Box>
                      );
                    })}
                  </div>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      )}
    </Wrapper>
  );
});

export default Challenge7;
