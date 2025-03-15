import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import {FAB} from 'react-native-paper';
import {Circle} from 'react-native-progress';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ChecklistContext} from '../context/ChecklistContext';

const {width} = Dimensions.get('window');

const ChecklistScreen = ({navigation}) => {
  const {personalChecklists, deletePersonalChecklist, progress} =
    useContext(ChecklistContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [newChecklistName, setNewChecklistName] = useState('');

  const renderItem = ({item}) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deletePersonalChecklist(item.id)}>
          <MaterialCommunityIcons name="delete" size={24} color="white" />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}>
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemStatus}>Date created: {item.date}</Text>
          <Text style={styles.itemStatus}>
            Last item added: {item.lastItem}
          </Text>
        </View>
        <Icon name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>
    </Swipeable>
  );

  const handleProceed = () => {
    if (typeof newChecklistName !== 'string' || !newChecklistName.trim())
      return;

    navigation.navigate('ChecklistItemsScreen', {
      title: newChecklistName.trim(),
    });

    setNewChecklistName('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pre-Departure Documents List</Text>
      <Text style={styles.subHeader}>
        List of all required documents for your upcoming assignment
      </Text>

      <TouchableOpacity
        style={styles.progressContainer}
        onPress={() =>
          navigation.navigate('PreDepartureChecklistScreen', {
            personalChecklists,
          })
        }>
        <Circle
          size={60}
          progress={progress}
          showsText
          thickness={5}
          color="#005CA2"
          textStyle={styles.progressText}
          formatText={() => `${Math.round(progress * 100) || 0}%`}
        />

        <View style={styles.reviewTextContainer}>
          <Text style={styles.reviewText}>Review List</Text>
        </View>

        <Icon name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>My Checklists</Text>
      <Text style={styles.sectionSubHeader}>
        Create your own personal checklist
      </Text>

      <FlatList
        data={[...personalChecklists]}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      <FAB
        style={styles.fab}
        color="#fff"
        icon="plus"
        onPress={() => setModalVisible(true)}
      />

      <View style={styles.modalOverlay} pointerEvents="auto">
        <Modal
          visible={modalVisible}
          backdropColor={'#002646'}
          animationType="slide">
          <View style={[styles.modalContainer, {width: width * 0.9}]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setModalVisible(false)}>
                <Icon name="chevron-back-outline" size={24} color="#002646" />
              </TouchableOpacity>
              {newChecklistName.trim().length > 0 && (
                <TouchableOpacity
                  style={styles.modalDoneButton}
                  onPress={handleProceed}>
                  <Text style={styles.modalDoneButtonText}>Done</Text>
                </TouchableOpacity>
              )}
            </View>
            <TextInput
              style={styles.modalInput}
              placeholder="Checklist Name"
              placeholderTextColor="#aaa"
              value={newChecklistName}
              onChangeText={setNewChecklistName}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  reviewTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  sectionSubHeader: {
    fontSize: 14,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 5,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemStatus: {
    fontSize: 14,
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: '#E6767F',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  backButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 10,
    borderColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  modalInput: {
    width: '100%',
    height: 60,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: 'black',
    fontSize: 16,
  },
  modalDoneButton: {
    backgroundColor: '#0093BB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalDoneButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#005CA2',
    borderRadius: 50,
    borderWidth: 10,
    borderColor: '#AFCBE3',
  },
});

export default ChecklistScreen;
