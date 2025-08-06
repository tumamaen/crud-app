import { NextResponse } from "next/server";
import { prisma, Prisma } from "@/libs/prisma";


export async function GET(request, { params }) {

    const task = await prisma.task.findUnique({
        where: {
            id: Number(params.taskID)
        }
    })

    return (
        NextResponse.json(task)
    )
}

export async function PUT(request, { params }) {

    const data = await request.json()
    const taskUpdater = await prisma.task.update({
        where: {
            id: Number(params.taskID)
        },
        data: data
    })

    return (
        NextResponse.json(taskUpdater)
    )
}

export async function DELETE(request, { params }) {

    try {
        const { done } = await request.json
        const taskRemover = await prisma.task.update({
            where: {
                id: Number(params.taskID)
            },
            data: {
                done: true
            }
        })
        console.log(taskRemover)

        return (
            NextResponse.json(taskRemover)
        )
    } catch (error) {
        return NextResponse.json(error.message)
    }

}