import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import {
  Animated,
  View,
  Text,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import {ProgressBar, Divider} from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Icon from 'react-native-vector-icons/Ionicons';
import {ChecklistContext} from '../context/ChecklistContext';

const {height, width} = Dimensions.get('window');

const PreDepartureChecklistScreen = ({route}) => {
  const {preDepartureDocs, updatePreDepartureStatus} =
    useContext(ChecklistContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const rotateAnim = useRef(new Animated.Value(-90)).current;

  useEffect(() => {
    route?.params?.onChecklistUpdate?.();
  }, [preDepartureDocs]);

  const handleSubmit = useCallback(
    id => {
      setSubmitted(true);
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        updatePreDepartureStatus(id, 'inProgress');
        setTimeout(() => {
          setModalVisible(false);
          setSubmitted(false);
        }, 500);
      });
    },
    [updatePreDepartureStatus],
  );

  const progress = useMemo(() => {
    const completedTasks = preDepartureDocs.filter(
      doc => doc.status !== 'Pending',
    ).length;
    return preDepartureDocs.length > 0
      ? completedTasks / preDepartureDocs.length
      : 0;
  }, [preDepartureDocs]);

  const sections = useMemo(() => {
    const pending = [],
      completed = [];
    preDepartureDocs.forEach(doc => {
      if (doc.status === 'Pending' || doc.status === 'inProgress')
        pending.push(doc);
      else completed.push(doc);
    });
    return [
      {title: 'Pending', data: pending},
      {title: 'Completed', data: completed},
    ];
  }, [preDepartureDocs]);

  const getStatusIcon = useCallback(item => {
    if (item.status === 'Done') return 'checkmark-outline';
    if (item.status === 'Skipped') return 'remove-outline';
    if (item.status === 'inProgress') return 'time-outline';
    return item.isMandatory ? 'alert-circle-outline' : 'document-text-outline';
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [-90, 0],
    outputRange: ['-90deg', '0deg'],
  });

  const renderRightActions = useCallback(
    (item, sectionTitle) => {
      if (sectionTitle === 'Completed') {
        return (
          <TouchableOpacity
            style={styles.uncheckButton}
            onPress={() => updatePreDepartureStatus(item.id, 'Pending')}>
            <Icon name="ellipse-outline" size={40} color="white" />
            <Text style={styles.buttonText}>Uncheck</Text>
          </TouchableOpacity>
        );
      }
      return item.isMandatory === true ? (
        <TouchableOpacity
          style={styles.submittedButton}
          onPress={() => setModalVisible(true)}>
          <Icon name="checkmark-circle-outline" size={40} color="white" />
          <Text style={styles.buttonText}>Submitted</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.swipeButtonsContainer}>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => updatePreDepartureStatus(item.id, 'Done')}>
            <Icon name="checkmark-circle-outline" size={40} color="white" />
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submittedButton}
            onPress={() => updatePreDepartureStatus(item.id, 'Skipped')}>
            <Icon name="remove-circle-outline" size={40} color="white" />
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      );
    },
    [updatePreDepartureStatus],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pre-Departure Documents List</Text>
      <Text style={styles.progressText}>
        {Math.round(progress * 100)}% Completed
      </Text>
      <ProgressBar
        progress={progress}
        color="#007bff"
        style={styles.progressBar}
      />
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({item, section}) => (
          <Swipeable
            renderRightActions={() => renderRightActions(item, section.title)}>
            <View
              style={[
                styles.documentItem,
                section.title === 'Completed' ||
                  (item.status === 'inProgress' && styles.completedItem),
              ]}>
              <View
                style={[
                  styles.iconContainer,
                  item.isMandatory &&
                    item.status !== 'inProgress' && {backgroundColor: 'white'},
                ]}>
                <Icon
                  name={getStatusIcon(item)}
                  size={
                    item.isMandatory && item.status !== 'inProgress' ? 24 : 20
                  }
                  color={
                    item.isMandatory && item.status !== 'inProgress'
                      ? '#9E1A1A'
                      : '#FFF'
                  }
                />
              </View>
              <View style={{flex: 1, marginLeft: 10}}>
                <View style={styles.rowBetween}>
                  <Text
                    style={[
                      styles.itemTitle,
                      section.title === 'Completed' ||
                        (item.status === 'inProgress' && styles.completedText),
                    ]}>
                    {item.name}
                  </Text>
                  {item.isOptional && (
                    <Text style={styles.greyText}>(Optional)</Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.itemDetails,
                    section.title === 'Completed' && styles.completedText,
                  ]}>
                  {item.certNumber}
                </Text>
                <View style={styles.rowBetween}>
                  <Text
                    style={[
                      styles.greyText,
                      section.title === 'Completed' && styles.completedText,
                    ]}>
                    Issue: {item.issueDate}
                  </Text>
                  <Text
                    style={[
                      styles.greyText,
                      section.title === 'Completed' && styles.completedText,
                    ]}>
                    Expiry: {item.expiryDate}
                  </Text>
                </View>
              </View>
            </View>
          </Swipeable>
        )}
      />
      <View style={styles.modalOverlay}>
        <Modal
          visible={modalVisible}
          backdropColor={'#002646'}
          animationType="fade">
          {submitted ? (
            <View style={styles.animatedIconContainer}>
              <Animated.View
                style={[
                  styles.animatedIcon,
                  {transform: [{rotate: rotateInterpolate}]},
                ]}>
                <Icon name="checkmark-circle" size={160} color="white" />
              </Animated.View>
            </View>
          ) : (
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Have you informed the manning agency that this document is
                ready?
              </Text>
              <Divider />
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonDivier]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonTextDark}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => handleSubmit(preDepartureDocs[0].id)}>
                  <Text style={styles.buttonTextDark}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  header: {fontSize: 22, fontWeight: 'bold', marginBottom: 5},
  progressText: {fontSize: 16, marginBottom: 5, fontWeight: 'bold'},
  progressBar: {height: 10, borderRadius: 5, marginBottom: 15},
  sectionHeader: {fontSize: 18, fontWeight: 'bold', marginVertical: 10},
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  completedItem: {backgroundColor: '#E0E0E0'},
  iconContainer: {
    width: 26,
    height: 26,
    backgroundColor: '#005CA2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  animatedIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBetween: {flexDirection: 'row', justifyContent: 'space-between'},
  itemTitle: {fontSize: 16, fontWeight: 'bold', color: 'black'},
  itemDetails: {fontSize: 14, color: 'black'},
  expiryText: {fontSize: 13, color: 'gray'},
  greyText: {color: 'gray'},
  completedText: {color: 'gray'},
  swipeButtonsContainer: {flexDirection: 'row'},
  doneButton: {
    backgroundColor: '#4F9B90',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submittedButton: {
    backgroundColor: '#002646',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uncheckButton: {
    backgroundColor: '#4F9B90',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontWeight: 'bold'},
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 40,
    paddingBottom: 10,
    borderRadius: 15,
    width: width * 0.7,
    marginTop: height * 0.3,
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonDivier: {
    borderRightWidth: 0.5,
    borderColor: '#D6D6D6',
  },
});

export default PreDepartureChecklistScreen;
