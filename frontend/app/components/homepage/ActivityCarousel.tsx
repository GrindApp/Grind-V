import React from 'react';
import { View, Text, Dimensions, ViewStyle, TextStyle } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { PieChart } from 'react-native-gifted-charts';
import { CheckBox } from 'react-native-elements';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

// Styled components
const StyledView = styled(View)<{ style?: ViewStyle }>`
  background-color: #1f1f23;
  border-radius: 12px;
  padding: 16px;
  margin-horizontal: 8px;
  margin-top: 16px;
  justify-content: center;
  align-items: center;
  height: 250px;
`;

const StyledText = styled(Text)<{ style?: TextStyle }>`
  color: white;
`;

const PieChartComponent = ({ data }: { data: any[] }) => (
  <PieChart
    data={data}
    donut
    showText
    textColor="white"
    radius={50}
    innerRadius={30}
    innerCircleColor={'#1f1f23'}
  />
);

const GoalComponent = () => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
    {["Hamstring", "Neck", "Back", "Waist", "Hand", "Shoulder"].map((goal, idx) => (
      <CheckBox
        key={idx}
        title={goal}
        checked={idx % 2 === 0}
        containerStyle={{
          backgroundColor: '#111111',
          borderWidth: 0,
          borderRadius: 10,
          padding: 0,
          margin: 0,
        }}
        textStyle={{ color: '#fff' }}
        checkedColor="#EF4444"
        uncheckedColor="#fff"
      />
    ))}
  </View>
);

const ActivitySlider: React.FC = () => {
  const pieData = [
    { value: 23000, color: '#EF4444' }, // Target Calories
    { value: 100000, color: '#FACC15' }, // Target Steps
    { value: 77000, color: '#22D3EE' }, // Remaining
  ];

  return (
    <Carousel
      loop
      width={width}
      height={250}
      autoPlay
      data={[1, 2, 3]}
      scrollAnimationDuration={800}
      renderItem={({ index }) => {
        if (index === 0) {
          return (
            <StyledView>
              <StyledText style={{ fontSize: 14, marginBottom: 4 }}>Total Steps</StyledText>
              <StyledText style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>23,000</StyledText>
              <PieChartComponent data={pieData} />
              <StyledText style={{ color: '#FACC15', marginTop: 8 }}>
                You have achieved 25% of your goal in 3 days
              </StyledText>
            </StyledView>
          );
        } else if (index === 1) {
          return (
            <StyledView>
              <StyledText style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Goals</StyledText>
              <StyledText style={{ color: '#A1A1AA', marginBottom: 16 }}>
                See all your this week goals here
              </StyledText>
              <GoalComponent />
              <StyledText style={{ color: '#A1A1AA', marginTop: 8 }}>
                6 days remaining from your next goal
              </StyledText>
            </StyledView>
          );
        } else {
          return (
            <StyledView>
              <StyledText style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
                Track Progression
              </StyledText>
              <StyledText style={{ color: '#EF4444', fontSize: 20, fontWeight: 'bold' }}>25%</StyledText>
              <StyledText style={{ color: 'white' }}>5 of 12 exercise tasks</StyledText>
              <StyledText style={{ color: '#A1A1AA', marginBottom: 8 }}>completed successfully</StyledText>
              <StyledText style={{ color: 'white', marginBottom: 8 }}>Daily Progression</StyledText>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                {[...Array(8)].map((_, idx) => (
                  <View
                    key={idx}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                      backgroundColor: idx < 5 ? '#EF4444' : '#374151',
                    }}
                  />
                ))}
              </View>
              <StyledText style={{ color: '#A1A1AA', marginTop: 8 }}>4/8 Days</StyledText>
            </StyledView>
          );
        }
      }}
    />
  );
};

export default ActivitySlider;
