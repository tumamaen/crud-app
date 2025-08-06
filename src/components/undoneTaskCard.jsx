"use client"

import { useRouter } from "next/navigation"

function TaskCard({ task }) {
    const router = useRouter()

    // ✅ No mostrar tareas marcadas como "done"
    if (task.done) {
        return null
    }

    return (
        <div
            className="bg-slate-800 rounded p-3 flex flex-col hover:bg-slate-900 hover:cursor-pointer"
            onClick={() => {
                router.push('task/edit/' + task.id)
            }}
        >
            <h3 className="font-bold text-2xl mb-2">
                {task.title}
            </h3>
            <p>{task.description}</p>
            <div className="mt-auto flex flex-col items-end">
                <p className="text-xs mt-1">{new Date(task.creation).toLocaleDateString()}</p>
            </div>
        </div>
    )
}

export default TaskCard
