import { GameControl } from "@/components/game-control";
import { HomeCards } from "@/components/home-cards";
import { MafiaHeader } from "@/components/mafia-header";
import { SettingsDropdown } from "./_components/settings-dropdown";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center flex-col items-center gap-6 my-10 md:mx-15">
        <div className="flex flex-col items-center gap-4">
          <MafiaHeader />
          <h2 className="text-[#9aa] text-xl text-center max-w-2xl">
            Enter the shadows of deception and strategy. Will you survive the
            night or fall victim to the Mafia's schemes?
          </h2>
        </div>
        <HomeCards />
        <GameControl />
        <div className="rounded-lg bg-[#131215] p-5 border border-gray-800 gap-3 max-w-2xl">
          <h3 className="text-2xl mb-3">How to Play</h3>
          <ul className="pl-5 list-disc marker:text-red-500">
            <li className="mb-2">
              Day Phase:{" "}
              <span className="text-muted-foreground">
                Discuss, debate, and vote to eliminate suspects.
              </span>
            </li>
            <li className="mb-2">
              Night Phase:{" "}
              <span className="text-muted-foreground">
                Secret roles take action to protect or eliminate players.
              </span>
            </li>
            <li className="mb-2">
              Win Condition:{" "}
              <span className="text-muted-foreground">
                Either eliminate all Mafia members or be eliminated yourself.
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="fixed left-0 bottom-0 w-full md:bg-transparent bg-[#111]">
        <SettingsDropdown />
      </div>
    </div>
  );
}
