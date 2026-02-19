import { useState, useEffect } from "react";
import { type Workout } from "./types";
import WorkoutCard from "./components/WorkoutCard";
import NewWorkoutModal from "./components/NewWorkoutModal";
import StatsChart from "./components/StatsChart";

export default function App() {

  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    const saved = localStorage.getItem("workouts");
    if (saved) {
      return JSON.parse(saved); // Si hay datos, los convertimos de texto a objetos
    }
    return []; // Si no hay nada, empezamos vacíos
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Cada vez que 'workouts' cambie, lo convertimos a texto y lo guardamos
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  const addWorkout = (name: string, date: string) => {
    const newWorkout: Workout = {
      id: Date.now(),
      name,
      date,
      sets: []


    }
    setWorkouts([newWorkout, ... workouts])
    setIsModalOpen(false)
  }

  const deleteWorkout = (id: number) => {
    setWorkouts(workouts.filter(w => w.id !== id))
  }

  const addSet = (workoutId: number ,meters: number, seconds: number) => {
    setWorkouts(workouts.map(workout => {
    if (workout.id === workoutId) {
      return {
        ...workout,
        sets: [
          ...workout.sets,
          { id: Date.now(), meters, seconds }
        ]
      };
    }
    return workout;
  }));

  }

  const deleteSet = (workoutId: number, setId: number) => {
    setWorkouts(workouts.map(workout => {
      if (workout.id === workoutId) {
        return {
          ...workout,
          sets: workout.sets.filter(s => s.id !== setId) 
        };
      }
      return workout;
    }));
};
  
  const updateName = (workoutId: number, newName: string) => {
    setWorkouts(workouts.map(workout => {
      if (workout.id === workoutId) {
        return {
          ...workout,
          name: newName
        };
      }
      return workout;
    }));
};
  

  return (
  <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-orange-500/30">
    {/* Fondo con degradado sutil para dar profundidad */}
    <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>

    <div className="w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* HEADER: Ahora con mejor alineación y jerarquía */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 border-b border-slate-800/50 pb-8">
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-black italic text-orange-500 tracking-tighter
               drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] 
               drop-shadow-[0_5px_0px_rgba(154,52,18,1)] transform hover:-translate-y-1 transition-transform duration-300 cursor-default">
            TRACK_LOG
          </h1>
          <p className="text-slate-500 font-medium tracking-widest uppercase text-xs mt-3 ml-1">
            Performance Tracking System v1.0
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 to-orange-500 p-0.5 font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/40 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          <span className="relative flex items-center gap-2 rounded-xl bg-slate-950/10 px-8 py-3 transition-all duration-300 group-hover:bg-opacity-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            NEW WORKOUT
          </span>
        </button>
      </header>
      

      {/* GRID: Mejor manejo de espacios vacíos y responsive */}
      {workouts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workouts.map(w => (
            <div key={w.id} className="transform transition-all duration-300 hover:-translate-y-2">
              <WorkoutCard 
                workout={w} 
                onDeleteWorkout={deleteWorkout} 
                onAddSet={addSet} 
                onDeleteSet={deleteSet}
                onUpdateName={updateName}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Estado vacío (Empty State) para que no se vea triste */
        <div className="flex flex-col items-center justify-center py-20 text-slate-600 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/30">
          <p className="text-xl font-bold text-slate-400">No active sessions</p>
          <p className="text-sm">Start your journey by adding a new workout!</p>
        </div>
      )}

    
    {workouts.length > 0 && (
  <div className="mt-12">
    <StatsChart workouts={workouts} />
  </div>
)}


</div>

    {/* Invocamos el componente del Modal */}
    <NewWorkoutModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)}
      onSave={addWorkout} 
    />
  </div>
);
}