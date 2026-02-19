import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { type Workout } from '../types';
import { useState } from 'react';

interface Props {
  workouts: Workout[];
}

export default function StatsChart({ workouts }: Props) {
  // Transformamos los datos: sumamos los metros de cada entreno
  const [pestaña, setPestaña] = useState("volumen")
  const data = [...workouts]
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .map(w => ({
    date: w.date,
    volumen: w.sets.reduce((acc, set) => acc + set.meters, 0)
  }));
  return (
      
   
    <div className="bg-slate-900 border border-slate-900 p-6 rounded-3xl mb-10 shadow-2xl">


      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setPestaña("volumen")}
          className="text-slate-300 hover:text-orange-500 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <span className="text-slate-400 text-xs font-black uppercase tracking-widest">
          {pestaña === "volumen" ? "Training Volume" : "Avg Pace"}
        </span>

        <button
          onClick={() => setPestaña("ritmo")}
          className="text-slate-300 hover:text-orange-500 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>      

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#64748b" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `${value}m`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
              itemStyle={{ color: '#f97316', fontWeight: 'bold' }}
            />
            <Line 
              type="monotone" 
              dataKey="volumen" 
              stroke="#f97316" 
              strokeWidth={4} 
              dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 8, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}