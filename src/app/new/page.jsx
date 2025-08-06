"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

function NewPage() {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const params = useParams() // ✅ Usamos el hook
    const id = params.id       // Obtenemos el ID desde la URL

    useEffect(() => {
        if (!id) return;

        fetch(`/api/task/${id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title)
                setDescription(data.description)
            })
    }, [id]) // 👈 importante agregar 'id' como dependencia

    const onSubmit = async (e) => {
        e.preventDefault()

        if (params.id) {
            const res = await fetch(`/api/task/${params.id}`, {
                method: "PUT",
                body: JSON.stringify({ title, description }),
                headers: {
                    "content-type": "application/json"
                }

            })
            const data = await res.json()
            console.log(data)
        } else {

            const res = await fetch('/api/task', {
                method: 'POST',
                body: JSON.stringify({ title, description }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
        }

        router.push('/')
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <form
                className="bg-slate-600 p-10 lg:w-1/4 md:w-1/2 rounded"
                onSubmit={onSubmit}
            >
                <label htmlFor="title" className="font-bold text-sm">
                    titulo de la tarea
                </label>
                <input
                    type="text"
                    id="title"
                    className="border border-gray-400 bg-gray-400 p-2 mb-4 w-full rounded text-black"
                    placeholder="Titulo"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <label htmlFor="description" className="font-bold text-sm">
                    Descripcion de la tarea
                </label>
                <textarea
                    rows="3"
                    id="description"
                    className="border border-gray-400 bg-gray-400 p-2 mb-4 w-full rounded text-black"
                    placeholder="Descripcion"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                ></textarea>
                <div className="flex justify-between gap-2">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="sumbit"
                    >
                        Crear
                    </button>

                    {
                        params.id && (
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                type="button"
                                onClick={async () => {
                                    alert('Tarea finalizada')
                                    const res = await fetch(`/api/task/${params.id}`, {
                                        method: "DELETE"
                                    })
                                    const data = await res.json()
                                    router.push('/')
                                }}
                            >
                                Finalizar tarea
                            </button>
                        )
                    }
                </div>
            </form>
        </div>
    )
}

export default NewPage
