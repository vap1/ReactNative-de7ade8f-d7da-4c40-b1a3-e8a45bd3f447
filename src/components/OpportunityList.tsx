
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { OpportunityDetails } from 'com.example.api';

interface OpportunityListProps {
  // Add any necessary props here
}

const OpportunityList: React.FC<OpportunityListProps> = () => {
  const [opportunities, setOpportunities] = useState<OpportunityDetails[]>([]);

  useEffect(() => {
    // Fetch opportunities from the backend API
    const fetchOpportunities = async () => {
      try {
        const response = await fetch('https://api.example.com/opportunities');
        const data = await response.json();
        setOpportunities(data);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    };

    fetchOpportunities();
  }, []);

  const renderOpportunityItem = ({ item }: { item: OpportunityDetails }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.status}</Text>
      {/* Add more opportunity details here */}
    </View>
  );

  return (
    <View>
      <Text>Opportunity List</Text>
      <FlatList
        data={opportunities}
        renderItem={renderOpportunityItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default OpportunityList;