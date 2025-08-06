import Link from "next/link"

function Navabar() {
    return (
        <nav className="bg-slate-900 flex p-5 justify-between pe-[3rem] items-center">
            <ul className="flex gap-10">
                <h1>
                    <Link href="/" className="text-3xl font-bold">
                        tareas
                    </Link>
                </h1>
            </ul>
            <ul className="flex gap-10 font-bold">
                <li className="list-none">
                    <Link href="/new">
                        Nueva
                    </Link>
                </li>
                <li className="list-none">
                    <Link href="/finished">
                        Finalizadas
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navabar