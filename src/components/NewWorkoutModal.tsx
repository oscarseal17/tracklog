import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave:(name: string, date: string) => void
}

export default function NewWorkoutModal({ isOpen, onClose, onSave}: Props) {
  
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'));

  if (!isOpen) return null;


  const handleSubmit = () => {
    if (!name || !date) return;
    onSave(name, date);
    setName("");
    setDate("");
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
        >
          ✕
        </button>

        <h2 className="text-2xl font-black italic text-white mb-1 text-orange-500 tracking-tighter uppercase">New Session</h2>
        <p className="text-slate-500 text-sm mb-6">Define your training goal</p>NEW SESSION


        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Workout Name</label>
            <input 
              type="text" 
              placeholder="e.g. Morning 5k Run" 
              className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Date</label>
            <input 
              type="date" 
              value={date}
              className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-lg focus:outline-none focus:border-orange-500 transition-colors [color-scheme:dark]"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button 
            onClick={onClose}
            className="flex-1 py-3 text-slate-500 font-bold hover:text-white transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-lg uppercase tracking-wider shadow-lg shadow-orange-900/20"
          >
            CREATE
          </button>
        </div>

      </div>
    </div>
  );
}