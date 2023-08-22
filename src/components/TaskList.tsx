
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { TaskDetails, UserRegistrationResponse } from './api/types'; // Import the API types

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskDetails[]>([]);

  useEffect(() => {
    // Fetch tasks from the backend API
    const fetchTasks = async () => {
      try {
        const response: UserRegistrationResponse = await fetchTasksFromAPI();
        if (response.success) {
          setTasks(response.tasks);
        } else {
          console.error(response.errorMessage);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const fetchTasksFromAPI = async (): Promise<UserRegistrationResponse> => {
    // Make an API call to retrieve tasks
    try {
      const response = await fetch('https://your-backend-api/tasks');
      const data: UserRegistrationResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tasks from API:', error);
      return { success: false, errorMessage: 'Failed to fetch tasks' };
    }
  };

  const renderTaskItem = ({ item }: { item: TaskDetails }) => (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      {/* Render other task details */}
    </View>
  );

  return (
    <View>
      <Text>Task List</Text>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TaskList;