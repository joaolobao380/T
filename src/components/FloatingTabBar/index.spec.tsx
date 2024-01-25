import { render, fireEvent } from '@testing-library/react-native';
import { navBottomName } from '@utils/enums';
import React from 'react';

import FloatingTabBar from '.';

jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }: any) => children,
}));

jest.mock('lucide-react-native', () => ({
  Home: 'HomeIcon',
  BarChartHorizontalBig: 'BarChartIcon',
  Menu: 'MenuIcon',
}));

describe('FloatingTabBar', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    emit: jest.fn(() => ({ defaultPrevented: false })),
  } as any;

  const mockState = {
    index: 0,
    routes: [
      { key: navBottomName.HOME, name: navBottomName.HOME },
      { key: navBottomName.REPORT, name: navBottomName.REPORT },
      { key: navBottomName.MENU, name: navBottomName.MENU },
    ],
  } as any;

  const mockDescriptors = {
    Home: { options: { tabBarTestID: 'Home-icon' } },
    Report: { options: { tabBarTestID: 'Report-icon' } },
    Menu: { options: { tabBarTestID: 'Menu-icon' } },
  } as any;

  it('renders all icons', () => {
    const { getByTestId } = render(
      <FloatingTabBar state={mockState} descriptors={mockDescriptors} navigation={mockNavigation} />
    );

    expect(getByTestId('Home-icon')).toBeTruthy();
    expect(getByTestId('Report-icon')).toBeTruthy();
    expect(getByTestId('Menu-icon')).toBeTruthy();
  });

  it('navigates to the correct screen when an icon is pressed', () => {
    const { getByTestId } = render(
      <FloatingTabBar state={mockState} descriptors={mockDescriptors} navigation={mockNavigation} />
    );

    fireEvent.press(getByTestId('Report-icon'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith(navBottomName.REPORT);
  });

  it('renders correctly', () => {
    const { toJSON } = render(
      <FloatingTabBar state={mockState} descriptors={mockDescriptors} navigation={mockNavigation} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
