import { useEffect, useState } from "react";

interface DaysOfWeekProps {
  onSaveDaysOfWeek: (days: string[]) => void;
}

const daysOfWeek = [
  { portugues: "Domingo", ingles: "Sunday" },
  { portugues: "Segunda-feira", ingles: "Monday" },
  { portugues: "Terça-feira", ingles: "Tuesday" },
  { portugues: "Quarta-feira", ingles: "Wednesday" },
  { portugues: "Quinta-feira", ingles: "Thursday" },
  { portugues: "Sexta-feira", ingles: "Friday" },
  { portugues: "Sábado", ingles: "Saturday" },
];

export const DaysOfWeek = ({ onSaveDaysOfWeek }: DaysOfWeekProps) => {
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);

  const toggleDia = (dia: string) => {
    const diaInfo = daysOfWeek.find((d) => d.portugues === dia);

    if (diaInfo) {
      if (diasSelecionados.includes(diaInfo.ingles)) {
        setDiasSelecionados(
          diasSelecionados.filter((d) => d !== diaInfo.ingles)
        );
      } else {
        setDiasSelecionados([...diasSelecionados, diaInfo.ingles]);
      }
    }
  };

  useEffect(() => {
    onSaveDaysOfWeek(diasSelecionados);
  }, [diasSelecionados]);

  return (
    <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
      {daysOfWeek.map((diaInfo) => (
        <button
          key={diaInfo.portugues}
          onClick={() => toggleDia(diaInfo.portugues)}
          className={`rounded-lg text-white  p-2 ${
            diasSelecionados.includes(diaInfo.ingles)
              ? "bg-slate-500 "
              : "bg-gray-700"
          }`}
        >
          {diaInfo.portugues}
        </button>
      ))}
    </div>
  );
};
