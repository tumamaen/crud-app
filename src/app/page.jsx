import { prisma } from "@/libs/prisma"
import TaskCard from "@/components/undoneTaskCard"

async function loadTask() {
  return await prisma.task.findMany()
}

async function homePage() {

  const task = await loadTask()
  console.log(task)

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
        {task.map(task => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </section>
  )
}

export default homePage