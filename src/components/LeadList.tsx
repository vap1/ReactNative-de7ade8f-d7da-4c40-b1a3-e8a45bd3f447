
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { LeadDetails } from '../api/types';
import { getLeads } from '../api/api';

const LeadList: React.FC = () => {
  const [leads, setLeads] = useState<LeadDetails[]>([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await getLeads();
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  const renderLeadItem = ({ item }: { item: LeadDetails }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
      {/* Render other lead details */}
    </View>
  );

  return (
    <View>
      <Text>Lead List</Text>
      <FlatList
        data={leads}
        renderItem={renderLeadItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default LeadList;