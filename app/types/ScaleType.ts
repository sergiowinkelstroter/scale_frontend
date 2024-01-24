export interface Scale {
  id: string;
  title: string;
  scaleNames: ScaleName[];
  daysOfWeek: String[];
  month: number;
  year: number;
  type: string;
  createdAt: string;
}

export interface ScaleName {
  id: string;
  data: string;
  names: string[];
}
