"use client";

import { useState } from "react";
import { CreateScaleForm } from "./components/CreateScaleForm";

export default function Home() {
  return (
    <section className="mx-auto max-w-screen-xl  px-4 pb-16 sm:px-6 lg:px-8">
      <h1 className="text-xl md:text-2xl text-white text-center  mt-6 font-bold">
        Gerador de Escalas
      </h1>

      <div className="flex justify-center items-center rounded-lg bg-slate-900 text-slate-700 py-6 mt-6">
        <CreateScaleForm />
      </div>
    </section>
  );
}
