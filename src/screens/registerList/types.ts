export interface FormValues {
  nameList?: string;
  futureDate?: Date;
  futureList?: boolean;
  actions?: {
    actionName: string;
    initialTime: Date;
    endTime: Date;
    storyPoints: number;
    fixedAction?: boolean;
    stayAction?: boolean;
  }[];
}
