import { useState } from "react";
import { type Workout } from "../types";

interface Props {
  workout: Workout;
  onDeleteWorkout: (id: number) => void
  onAddSet: (workoutId: number, meters: number, seconds: number) => void
  onDeleteSet: (workoutId: number, setId: number) => void
  onUpdateName: (id: number, newName: string) => void;
}

export default function WorkoutCard({ workout, onDeleteWorkout, onAddSet, onDeleteSet, onUpdateName }: Props) {

  const [meters, setMeters] = useState("");
  const [seconds, setSeconds] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(workout.name); // Estado para el texto del input

  const handleAddSet = () => {
    if (!meters || !seconds) return;
    onAddSet(workout.id, Number(meters), Number(seconds));
    setMeters("");
    setSeconds("");
  };    

  return (
    // 1. LA TARJETA: Fondo Slate-800 (Gris azulado sólido) sobre el fondo negro de la web.
    // Esto garantiza contraste instantáneo.
    <div className="flex flex-col h-full bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
      
      {/* 2. CABECERA: Simple y limpia */}
    <div className="p-5 flex justify-between items-start">
      <div>
        <div>
          {isEditing ? (
            <input
              autoFocus
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              
              // EL TRUCO ESTÁ AQUÍ: Cuando el foco sale del input, guarda y cierra
              onBlur={() => {
                if (tempName.trim() !== "" && tempName !== workout.name) {
                  onUpdateName(workout.id, tempName);
                }
                setIsEditing(false);
              }}
              
              // Bonus: Guardar también al pulsar Enter
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur(); // El blur de arriba hará el resto
                if (e.key === "Escape") {
                    setTempName(workout.name);
                    setIsEditing(false);
                }
              }}
              className="bg-slate-950 border border-orange-500 rounded-lg px-2 py-1 text-2xl font-bold text-white outline-none w-full"
            />
          ) : (
            <h3 className="font-bold text-2xl text-white tracking-tight">
              {workout.name}
            </h3>
          )}
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">
            {workout.date} • {workout.sets.length} SETS
          </p>
        </div>
      </div>
      
      {/* GRUPO DE ACCIONES: Editar y Borrar */}
      <div className="flex gap-2">
        {/* Botón Editar */}
        <button 
          className="text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 p-2 rounded-lg transition-colors"
          title="Edit Name"
          onClick={()=>setIsEditing(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
          </svg>
        </button>

        {/* Botón Borrar (Papelera) - El que ya tenías */}
        <button 
          onClick={() => onDeleteWorkout(workout.id)}
          className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
          title="Delete Workout"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
        </button>
      </div>
    </div>

      {/* 3. CUERPO */}
      <div className="p-5 pt-0 flex-grow flex flex-col gap-4">
        
        {/* INPUTS: Fondo negro (Slate-950) para que contraste dentro de la tarjeta gris */}
        <div className="flex gap-3">
          <input 
            type="number" 
            placeholder="Meters" 
            value={meters}
            onChange={(e) => setMeters(e.target.value)}
            className="w-1/3 bg-slate-950 border border-slate-700 rounded-lg p-3 text-center text-white font-bold placeholder-slate-600 focus:border-orange-500 focus:outline-none transition-colors"
          />
          <input 
            type="number" 
            placeholder="Seconds" 
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            className="w-1/3 bg-slate-950 border border-slate-700 rounded-lg p-3 text-center text-white font-bold placeholder-slate-600 focus:border-orange-500 focus:outline-none transition-colors"
          />
          <button 
            onClick={handleAddSet}
            className="w-1/3 bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase text-xs rounded-lg transition-colors shadow-md shadow-orange-900/20"
          >
            Add
          </button>
        </div>

        {/* LISTA: Líneas simples separadas por bordes finos */}
        <div className="flex flex-col bg-slate-900/50 rounded-lg border border-slate-700/50 overflow-hidden">
          {workout.sets.length > 0 ? (
            <div className="max-h-[250px] overflow-y-auto">
              {workout.sets.map((s) => (
                <div key={s.id} className="flex justify-between items-center p-3 border-b border-slate-700/50 last:border-0 hover:bg-slate-700/30 transition-colors group/item">
                  <div className="flex gap-4">
                    <div className="text-right w-16">
                        <span className="block font-bold text-white text-lg leading-none">{s.meters}</span>
                        <span className="text-[10px] text-slate-500 uppercase font-bold">Meters</span>
                    </div>
                    <div className="text-right w-16">
                        <span className="block font-bold text-white text-lg leading-none">{s.seconds}</span>
                        <span className="text-[10px] text-slate-500 uppercase font-bold">Seconds</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                        <span className="block font-mono text-orange-400 text-base font-bold">
                        {(3600 / (s.seconds / s.meters * 1000)).toFixed(1)} <span className="text-xs">km/h</span>
                        </span>
                    </div>
                    
                    <button 
                      className="text-slate-600 hover:text-red-400 transition-colors p-1"
                      onClick={() => onDeleteSet(workout.id, s.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-slate-500 text-sm font-medium">No sets added yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}