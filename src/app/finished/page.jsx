import { prisma } from "@/libs/prisma"
import FinishedTaskCard from "@/components/doneTaskCard"

async function loadTask() {
    return await prisma.task.findMany()
}

async function finishedTask() {

    const task = await loadTask()
    console.log(task)

    return (
        <section className="container mx-auto">
            <div className="grid grid-cols-3 gap-3 mt-10">
                {task.map(task => (
                    <FinishedTaskCard task={task} key={task.id} />
                ))}
            </div>
        </section>
    )
}

export default finishedTask