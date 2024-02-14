export interface CardSwipeProps {
  title: string;
  status: 'on' | 'off' | 'pending' | string;
  onPress: () => void;
}
