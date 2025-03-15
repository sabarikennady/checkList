export const fetchPreDepartureData = async () => {
  return [
    { id: '1', name: 'Passport', category: 'Mandatory', status: 'Pending' },
    { id: '2', name: 'Visa', category: 'Attention Required', status: 'Submitted' },
    { id: '3', name: 'Medical Certificate', category: 'Optional', status: 'Not Checked' },
  ];
};
