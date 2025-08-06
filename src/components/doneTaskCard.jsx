"use client"

import { useRouter } from "next/navigation"

function TaskCard({ task }) {
    const router = useRouter()

    // ✅ Mostrar solo tareas finalizadas
    if (!task.done) {
        return null
    }

    const handleRestore = async (e) => {

        await fetch(`/api/task/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ done: false }),
        })

        // Recargar la página para reflejar el cambio
        router.refresh()
    }

    return (
        <div
            className="bg-slate-800 rounded p-3 flex flex-col hover:bg-slate-900 hover:cursor-pointer"
            onClick={() => {
                handleRestore()
                router.refresh
                alert('tarea restaurada con exito')
            }}
        >
            <h3 className="font-bold text-2xl mb-2 line-through">
                {task.title}
            </h3>
            <p className="line-through">{task.description}</p>

            <div className="mt-auto flex flex-col items-end">
                <p className="text-xs mt-1">{new Date(task.creation).toLocaleDateString()}</p>
            </div>
        </div>
    )
}

export default TaskCard
