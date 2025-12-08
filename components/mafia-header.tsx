import { EyeIcon, SkullIcon } from "lucide-react"

export const MafiaHeader = () => {
    return (
        <div className="flex items-center gap-3">
          <SkullIcon color="var(--red)" size={50} />
          <h1 className="text-white text-5xl">MAFIA</h1>
          <EyeIcon color="var(--red)" size={50} />
        </div>
    )
}