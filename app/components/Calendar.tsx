import { Scale } from "../types/ScaleType";

interface CalendarDay {
  date: Date;
  names: string[];
  disabled: boolean;
}

interface CalendarWeek {
  week: number;
  days: CalendarDay[];
}

const generateCalendar = (scale: Scale): CalendarWeek[] => {
  const { scaleNames, month, year } = scale;

  const dateNameMap: Record<string, string[]> = {};
  scaleNames.forEach((scaleName) => {
    const { data, names } = scaleName;
    dateNameMap[data] = names;
  });

  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);

  const calendarDays: CalendarDay[] = [];
  let currentDate = new Date(firstDayOfMonth);

  while (currentDate.getDay() !== 0) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  while (currentDate <= lastDayOfMonth) {
    const dateKey = currentDate.toISOString().split("T")[0];
    const names = dateNameMap[dateKey] || [];

    calendarDays.push({
      date: new Date(currentDate),
      names,
      disabled: currentDate < new Date() || names.length === 0,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  while (currentDate.getDay() !== 0) {
    const dateKey = currentDate.toISOString().split("T")[0];
    const names = dateNameMap[dateKey] || [];

    calendarDays.push({
      date: new Date(currentDate),
      names,
      disabled: currentDate < new Date() || names.length === 0,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  const calendarWeeks: CalendarWeek[] = [];
  let currentWeek: CalendarWeek | null = null;

  calendarDays.forEach((day) => {
    if (!currentWeek || day.date.getDay() === 0) {
      currentWeek = { week: calendarWeeks.length + 1, days: [] };
      calendarWeeks.push(currentWeek);
    }

    currentWeek.days.push(day);
  });

  return calendarWeeks;
};

export const Calendar: React.FC<{ scale: Scale }> = ({ scale }) => {
  const calendarMonth = generateCalendar(scale);

  return (
    <div className="w-full max-w-screen-lg rounded-lg mx-auto mt-10 text-white bg-gray-900 ">
      <h3 className="text-lg text-center mb-2 pt-2">{scale.title}</h3>

      <div className="mb-4 flex justify-center">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
          <div key={day} className="flex-1 p-2 text-center text-white">
            {day}
          </div>
        ))}
      </div>

      {calendarMonth.map((week: CalendarWeek) => (
        <div key={week.week} className="flex rounded-lg">
          {week.days.map((day) => (
            <div
              key={day.date.toISOString()}
              className={`flex-1 p-2 flex flex-col border border-gray-600 bg-gray-900 ${
                day.disabled ? "text-gray-600" : "text-gray-200"
              } ${day.names.length > 0 ? "bg-gray-800" : ""}`}
            >
              <div className="font-bold">{day.date.getDate()}</div>
              {day.names.map((name, index) => (
                <div key={index} className="text-sm">
                  {name}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
