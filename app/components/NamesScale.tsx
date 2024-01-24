import { SendHorizontal, Trash, X } from "lucide-react";
import { KeyboardEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface ScaleNameData {
  id: string;
  name: string;
}

interface ScaleNameProps {
  onSaveScaleNames: (names: ScaleNameData[]) => void;
}

export const NamesScale = ({ onSaveScaleNames }: ScaleNameProps) => {
  const [inputText, setInputText] = useState("");
  const [scaleNamesList, setScaleNamesList] = useState<ScaleNameData[]>([]);

  function handleAddNameToScaleWithEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter" && inputText !== "") {
      const newList = [...scaleNamesList];
      newList.push({
        id: uuidv4(),
        name: inputText,
      });
      setScaleNamesList(newList);
      onSaveScaleNames(scaleNamesList);
      setInputText("");
    }
  }

  function handleAddNameToScale() {
    if (inputText !== "") {
      const newList = [...scaleNamesList];
      newList.push({
        id: uuidv4(),
        name: inputText,
      });
      setScaleNamesList(newList);
      setInputText("");
    }
  }

  function handleDeleteScaleName(id: string) {
    const newList = scaleNamesList.filter((name) => name.id !== id);

    setScaleNamesList(newList);
  }

  useEffect(() => {
    onSaveScaleNames(scaleNamesList);
  }, [scaleNamesList]);

  return (
    <section>
      <div className="flex items-center relative">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyUp={handleAddNameToScaleWithEnter}
          className="w-full rounded-lg  p-3 text-sm"
          placeholder="Adicione os nomes da sua escala"
        />
        <button className="absolute right-3" onClick={handleAddNameToScale}>
          <SendHorizontal size={18} color="black" />
        </button>
      </div>
      <div className="mt-4">
        <ul className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4 text-white">
          {scaleNamesList.map((scaleName) => (
            <li
              key={scaleName.id}
              className="rounded-lg  p-2 bg-slate-700 flex justify-between"
            >
              <span>{scaleName.name}</span>
              <button onClick={() => handleDeleteScaleName(scaleName.id)}>
                <Trash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
