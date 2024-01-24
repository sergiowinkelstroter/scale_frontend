"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Link from "next/link";
import { Calendar } from "./Calendar";
import { Scale } from "../types/ScaleType";

interface CalendarExportProps {
  scale: Scale;
}

export default function CalendarExport({ scale }: CalendarExportProps) {
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!calendarRef.current) {
      return;
    }

    const pdf = new jsPDF("p", "mm", "a4");

    const calendarElement = calendarRef.current;

    const canvas = await html2canvas(calendarElement);

    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 20, 190, 0);

    pdf.save("exported-calendar.pdf");
  };

  return (
    <div className="mx-auto max-w-screen-xl">
      <div ref={calendarRef}>
        <Calendar scale={scale} />
      </div>

      <div className="flex justify-center gap-6">
        <button
          onClick={handleExportPDF}
          className="p-2 bg-gray-900 text-white text-sm mt-2 rounded-lg hover:bg-gray-60"
        >
          Exportar para PDF
        </button>
        <Link
          href={"/"}
          className="p-2 bg-gray-900 text-white text-sm mt-2 rounded-lg"
        >
          Gerar uma nova escala
        </Link>
      </div>
    </div>
  );
}
