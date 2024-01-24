import { useState } from "react";
import { DaysOfWeek } from "./DaysOfWeek";
import { NamesScale, ScaleNameData } from "./NamesScale";
import { api } from "../service/axios";
import { Scale } from "../types/ScaleType";
import { useRouter } from "next/navigation";
import { Loading } from "./Loading";

export const CreateScaleForm = () => {
  const [daysOfWeek, setDaysOfWeek] = useState<String[]>();
  const [scaleNames, setScaleNames] = useState<String[]>();
  const [title, setTitle] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const monthNumber: number = parseInt(month);
  const yearNumber: number = parseInt(year);

  function handleSaveDaysOfWeek(days: String[]) {
    setDaysOfWeek(days);
  }

  function handleSaveScaleNames(names: ScaleNameData[]) {
    const namesList = names.map((name) => name.name);
    setScaleNames(namesList);
  }

  async function createNewScale() {
    setLoading(true);
    try {
      console.log({
        title,
        names: scaleNames,
        month: monthNumber,
        year: yearNumber,
        type,
        daysOfWeek,
      });
      const res = await api.post("/scale", {
        title,
        names: scaleNames,
        month: monthNumber,
        year: yearNumber,
        type,
        daysOfWeek,
      });

      router.push(`/scale/${res.data.id}`);
      setLoading(false);
    } catch (error) {}
    setLoading(false);
  }

  return (
    <div className="space-y-4 my-10">
      <div>
        <label className="sr-only ">Titulo</label>
        <input
          className="w-full rounded-lg  p-3 text-sm "
          placeholder="Titulo"
          type="text"
          id="titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 text-gray-600">
        <div>
          <label className="sr-only">Tipo:</label>
          <select
            id="tipo"
            className="w-full rounded-lg  p-3 text-sm"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="solo">Solo</option>
            <option value="dupla">Dupla</option>
            <option value="trio">Trio</option>
          </select>
        </div>

        <div>
          <label className="sr-only">Mes:</label>
          <select
            id="meses"
            className="w-full rounded-lg  p-3 text-sm "
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>
        </div>

        <div>
          <select
            id="year"
            className="w-full rounded-lg  p-3 text-sm "
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>
      </div>

      <DaysOfWeek onSaveDaysOfWeek={handleSaveDaysOfWeek} />

      <NamesScale onSaveScaleNames={handleSaveScaleNames} />

      <button
        onClick={createNewScale}
        className="inline-block w-full rounded-lg bg-gray-700 px-5 py-3 font-medium text-white  mt-4"
      >
        {loading ? <Loading /> : <span>Gerar</span>}
      </button>
    </div>
  );
};
