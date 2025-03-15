import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ChecklistItem from '../ChecklistItem';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

describe('ChecklistItem Component', () => {
  const mockOnUpdateStatus = jest.fn();
  const mockItem = {id: '1', name: 'Buy groceries', status: 'Pending'};

  test('renders item name and status correctly', () => {
    const {getByText} = render(
      <GestureHandlerRootView>
        <ChecklistItem item={mockItem} onUpdateStatus={mockOnUpdateStatus} />
      </GestureHandlerRootView>,
    );

    expect(getByText('Buy groceries - Pending')).toBeTruthy();
  });

  test('calls onUpdateStatus when swiped', () => {
    const {getByText} = render(
      <GestureHandlerRootView>
        <ChecklistItem item={mockItem} onUpdateStatus={mockOnUpdateStatus} />
      </GestureHandlerRootView>,
    );

    fireEvent.press(getByText('Done'));

    expect(mockOnUpdateStatus).toHaveBeenCalledTimes(1);
    expect(mockOnUpdateStatus).toHaveBeenCalledWith('1', 'Done');
  });

  test('renders the right swipe action button', () => {
    const {getByText} = render(
      <GestureHandlerRootView>
        <ChecklistItem item={mockItem} onUpdateStatus={mockOnUpdateStatus} />
      </GestureHandlerRootView>,
    );

    expect(getByText('Done')).toBeTruthy();
  });
});
