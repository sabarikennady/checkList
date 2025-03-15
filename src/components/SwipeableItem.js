import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SwipeableItem = ({item, isEditing, onDelete, onToggleCompletion}) => {
  const renderRightActions = () => {
    if (item.completed) {
      return (
        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => onToggleCompletion(item.id)}>
          <Icon name="ellipse-outline" size={40} color="white" />
          <Text style={styles.buttonText}>Uncheck</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.swipeActions}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item.id)}>
          <MCIcon name="delete" size={24} color="white" />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => onToggleCompletion(item.id)}>
          <Icon name="checkmark-circle-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ListIcon = () => (
    <View style={styles.iconContainer}>
      <Icon name="document-text-outline" size={16} color="white" />
    </View>
  );

  const Divider = () => <View style={styles.divider} />;

  return isEditing ? (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.listItem}>
        <ListIcon />
        <Text
          style={[styles.listItemText, item.completed && styles.completedText]}>
          {item.name}
        </Text>
      </View>
      <Divider />
    </Swipeable>
  ) : (
    <>
      <View style={styles.listItem}>
        <ListIcon />
        <Text
          style={[styles.listItemText, item.completed && styles.completedText]}>
          {item.name}
        </Text>
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECEEF0',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  listItemText: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#005AA5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedText: {
    color: '#A0A0A0',
  },
  swipeActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    backgroundColor: '#E6767F',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenButton: {
    backgroundColor: '#4F9B90',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SwipeableItem;
