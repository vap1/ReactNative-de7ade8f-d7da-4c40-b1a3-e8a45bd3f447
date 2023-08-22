
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { EmployeeDetails } from '../api/types';
import { getEmployees } from '../api/employees';

const EmployeeManagementScreen: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeDetails[]>([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const renderEmployeeItem = ({ item }: { item: EmployeeDetails }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.role}</Text>
      {/* Render other employee details */}
    </View>
  );

  return (
    <View>
      <Text>Employee Management</Text>
      <FlatList
        data={employees}
        renderItem={renderEmployeeItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default EmployeeManagementScreen;