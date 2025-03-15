import React, {createContext, useState} from 'react';

export const ChecklistContext = createContext();

export const ChecklistProvider = ({children}) => {
  const [preDepartureDocs, setPreDepartureDocs] = useState([
    {
      id: '1',
      name: 'Autom. Radar Plotting Aids (ARPA) CERT',
      certNumber: '',
      issueDate: '2024-02-20',
      expiryDate: '2025-02-20',
      isMandatory: true,
      status: 'Pending',
    },
    {
      id: '2',
      name: 'Passport',
      certNumber: 'A1234567',
      issueDate: '2023-01-15',
      expiryDate: '2033-01-15',
      status: 'Pending',
    },
    {
      id: '3',
      name: 'Visa',
      certNumber: 'VISA9876',
      issueDate: '2023-06-20',
      expiryDate: '2025-06-20',
      status: 'Pending',
      isOptional: true,
    },
    {
      id: '4',
      name: 'Medical Certificate',
      certNumber: 'MC56789',
      issueDate: '2024-02-10',
      expiryDate: '2025-02-10',
      status: 'Pending',
    },
  ]);

  const [personalChecklists, setPersonalChecklists] = useState([
    {
      id: '1',
      title: 'Restaurants to visit in France',
      date: '12.04.22',
      lastItem: 'La Parfait',
      status: 'pending',
      mandatory: true,
    },
    {
      id: '2',
      title: 'Things to do in Germany',
      date: '06.09.21',
      lastItem: 'Visit the park',
      status: 'completed',
      mandatory: false,
    },
  ]);

  const updatePreDepartureStatus = (id, newStatus) => {
    setPreDepartureDocs(prevDocs =>
      prevDocs.map(doc => (doc.id === id ? {...doc, status: newStatus} : doc)),
    );
  };

  const addPersonalChecklist = newChecklist => {
    setPersonalChecklists(prevChecklists => {
      const updatedChecklists = [...prevChecklists, newChecklist];
      return updatedChecklists;
    });
  };

  const deletePersonalChecklist = id => {
    setPersonalChecklists(prevChecklists =>
      prevChecklists.filter(list => list.id !== id),
    );
  };

  const updateChecklistStatus = (id, newStatus) => {
    setPersonalChecklists(prevChecklists =>
      prevChecklists.map(list =>
        list.id === id ? {...list, status: newStatus} : list,
      ),
    );
  };

  const completedCount = personalChecklists.filter(
    item => item.status !== 'pending',
  ).length;

  const progress =
    personalChecklists.length > 0
      ? completedCount / personalChecklists.length
      : 0;

  return (
    <ChecklistContext.Provider
      value={{
        preDepartureDocs,
        updatePreDepartureStatus,
        personalChecklists,
        addPersonalChecklist,
        deletePersonalChecklist,
        updateChecklistStatus,
        completedCount,
        progress,
      }}>
      {children}
    </ChecklistContext.Provider>
  );
};
