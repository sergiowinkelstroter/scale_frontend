"use server";

import CalendarExport from "@/app/components/CalendarExport";
import { api } from "@/app/service/axios";

export default async function Scale({ params }: { params: { slug: string } }) {
  const scale = await api.get(`/scale/${params.slug}`);

  return (
    <div>
      <CalendarExport scale={scale.data} />
    </div>
  );
}
