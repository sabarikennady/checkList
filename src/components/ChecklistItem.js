import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

const ChecklistItem = ({item, onUpdateStatus}) => {
  const handleSwipeAction = status => {
    onUpdateStatus(item.id, status);
  };

  const renderRightActions = progress => {
    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(progress.value, [0, 1], [0.8, 1]);
      return {transform: [{scale}]};
    });

    return (
      <Animated.View style={[styles.actionButton, animatedStyle]}>
        <TouchableOpacity onPress={() => handleSwipeAction('Done')}>
          <Text style={styles.actionText}>Done</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.listItem}>
          <Text>
            {item.name} - {item.status}
          </Text>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  listItem: {padding: 15, backgroundColor: '#f9f9f9', marginBottom: 10},
  actionButton: {
    backgroundColor: 'green',
    padding: 10,
    justifyContent: 'center',
  },
  actionText: {color: 'white', fontWeight: 'bold'},
});

export default ChecklistItem;
