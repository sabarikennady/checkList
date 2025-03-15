import React, {useState, useContext, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  SectionList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {ChecklistContext} from '../context/ChecklistContext';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SwipeableItem from '../components/SwipeableItem';

const ChecklistItemsScreen = ({route}) => {
  const {title} = route.params;
  const {addPersonalChecklist} = useContext(ChecklistContext);
  const [items, setItems] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const navigation = useNavigation();

  const addItem = useCallback(() => {
    if (inputText.trim()) {
      setItems(prevItems => [
        {id: Date.now().toString(), name: inputText, completed: false},
        ...prevItems,
      ]);
      setInputText('');
    }
  }, [inputText]);

  const saveChecklist = useCallback(() => {
    if (!items.length) return;

    addPersonalChecklist({
      id: Date.now().toString(),
      title,
      items,
      date: new Date().toLocaleDateString(),
      lastItem: items[0]?.name || '',
    });

    setIsSaved(true);
    setIsEditing(false);
  }, [items, title, addPersonalChecklist]);

  const deleteItem = useCallback(
    id => {
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    },
    [setItems],
  );

  const toggleCompletion = useCallback(
    id => {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? {...item, completed: !item.completed} : item,
        ),
      );
    },
    [setItems],
  );

  const toggleEditMode = () => {
    if (isEditing) {
      saveChecklist();
      navigation.goBack();
    } else {
      setIsEditing(true);
    }
  };

  const sections = [
    {title: 'To-Do', data: items.filter(item => !item.completed)},
    {title: 'Completed Tasks', data: items.filter(item => item.completed)},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={navigation.goBack}>
          <Icon name="chevron-back-outline" size={24} color="#002646" />
          <Text style={styles.headerButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={isSaved ? toggleEditMode : saveChecklist}>
          <Text style={styles.saveButtonText}>
            {isSaved ? (isEditing ? 'Done' : 'Edit List') : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titleText}>{title}</Text>

      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SwipeableItem
            item={item}
            isEditing={isEditing}
            onDelete={deleteItem}
            onToggleCompletion={toggleCompletion}
          />
        )}
        renderSectionHeader={({section: {title}}) =>
          isEditing &&
          isSaved &&
          (title !== 'Completed Tasks' || sections[1].data.length > 0) ? (
            <>
              <Text style={styles.sectionHeader}>{title}</Text>
              <Divider />
            </>
          ) : null
        }
        ListFooterComponent={
          !isSaved ? (
            <>
              <View style={styles.inputContainer}>
                <ListIcon />
                <TextInput
                  style={styles.input}
                  placeholder="Add item"
                  value={inputText}
                  onChangeText={setInputText}
                  onSubmitEditing={addItem}
                  returnKeyType="done"
                  autoFocus
                />
              </View>
              <Divider />
            </>
          ) : null
        }
      />

      {items.length === 0 && (
        <Text style={styles.emptyMessage}>
          Start by adding items to your checklist.
        </Text>
      )}
    </View>
  );
};

const Divider = () => <View style={styles.divider} />;

const ListIcon = () => (
  <View style={styles.iconContainer}>
    <Icon name="document-text-outline" size={16} color="white" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ECEEF0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 16,
    color: '#002646',
    marginLeft: 5,
  },
  saveButton: {
    backgroundColor: '#0093BB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECEEF0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#005AA5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECEEF0',
    padding: 10,
    borderRadius: 5,
  },
  listItemText: {
    fontSize: 16,
    marginLeft: 10,
    paddingVertical: 10,
  },
  emptyMessage: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ChecklistItemsScreen;
