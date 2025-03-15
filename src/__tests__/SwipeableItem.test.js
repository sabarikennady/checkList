import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SwipeableItem from '../components/SwipeableItem';

describe('SwipeableItem Component', () => {
  const mockDelete = jest.fn();
  const mockToggleCompletion = jest.fn();

  const sampleItem = {
    id: '1',
    name: 'Test Checklist Item',
    completed: false,
  };

  it('renders correctly', () => {
    const {getByText} = render(
      <SwipeableItem
        item={sampleItem}
        isEditing={true}
        onDelete={mockDelete}
        onToggleCompletion={mockToggleCompletion}
      />,
    );
    expect(getByText('Test Checklist Item')).toBeTruthy();
  });

  it('displays the correct text for an uncompleted item', () => {
    const {getByText} = render(
      <SwipeableItem
        item={{...sampleItem, completed: false}}
        isEditing={true}
        onDelete={mockDelete}
        onToggleCompletion={mockToggleCompletion}
      />,
    );
    expect(getByText('Test Checklist Item')).toBeTruthy();
  });

  it('displays the correct text for a completed item', () => {
    const {getByText} = render(
      <SwipeableItem
        item={{...sampleItem, completed: true}}
        isEditing={true}
        onDelete={mockDelete}
        onToggleCompletion={mockToggleCompletion}
      />,
    );
    expect(getByText('Test Checklist Item')).toHaveStyle({color: '#A0A0A0'});
  });

  it('calls onDelete when delete button is pressed', () => {
    const {getByText} = render(
      <SwipeableItem
        item={sampleItem}
        isEditing={true}
        onDelete={mockDelete}
        onToggleCompletion={mockToggleCompletion}
      />,
    );

    fireEvent.press(getByText('Delete'));
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith('1');
  });

  it('calls onToggleCompletion when done button is pressed', () => {
    const {getByText} = render(
      <SwipeableItem
        item={sampleItem}
        isEditing={true}
        onDelete={mockDelete}
        onToggleCompletion={mockToggleCompletion}
      />,
    );

    fireEvent.press(getByText('Done'));
    expect(mockToggleCompletion).toHaveBeenCalledTimes(1);
    expect(mockToggleCompletion).toHaveBeenCalledWith('1');
  });

  it('calls onToggleCompletion when uncheck button is pressed for completed item', () => {
    const {getByText} = render(
      <SwipeableItem
        item={{...sampleItem, completed: true}}
        isEditing={true}
        onDelete={mockDelete}
        onToggleCompletion={mockToggleCompletion}
      />,
    );

    fireEvent.press(getByText('Uncheck'));
    expect(mockToggleCompletion).toHaveBeenCalledTimes(1);
    expect(mockToggleCompletion).toHaveBeenCalledWith('1');
  });

  it('does not render swipe actions when isEditing is false', () => {
    const {queryByText} = render(
      <SwipeableItem
        item={sampleItem}
        isEditing={false}
        onDelete={mockDelete}
        onToggleCompletion={mockToggleCompletion}
      />,
    );

    expect(queryByText('Delete')).toBeNull();
    expect(queryByText('Done')).toBeNull();
  });

  it('renders the correct icon for the list item', () => {
    const {getByTestId} = render(
      <SwipeableItem
        item={sampleItem}
        isEditing={true}
        onDelete={mockDelete}
        onToggleCompletion={mockToggleCompletion}
      />,
    );

    expect(getByTestId('list-icon')).toBeTruthy();
  });

  it('renders a divider after the list item', () => {
    const {getByTestId} = render(
      <SwipeableItem
        item={sampleItem}
        isEditing={true}
        onDelete={mockDelete}
        onToggleCompletion={mockToggleCompletion}
      />,
    );

    expect(getByTestId('divider')).toBeTruthy();
  });
});
