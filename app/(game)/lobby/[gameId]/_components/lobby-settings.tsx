import { GameMode, GameVisibility } from "@/generated/prisma/enums";

interface LobbySettingsProps {
  mode: GameMode;
  visibility: GameVisibility;
  sessionName: string;
}

export const LobbySettings = ({
  mode,
  visibility,
  sessionName,
}: LobbySettingsProps) => {
  return (
    <div className="p-6 border-zinc-800 border-2 backdrop-blur-sm bg-[#151518] flex flex-col rounded-lg gap-10">
      <div>
        <h1 className="text-lg">Game Settings</h1>
      </div>
      <div className="flex gap-4 w-full">
        <div className="border-b border-zinc-800 flex flex-col sm:flex-row justify-between items-center text-sm w-full pb-2">
          <span className="text-gray-400">Game Mode</span>
          {mode[0] + mode.slice(1).toLowerCase()}
        </div>
        <div className="border-b border-zinc-800 flex justify-between items-center text-sm w-full pb-2">
          <span className="text-gray-400">Visibility</span>
          {visibility[0] + visibility.slice(1).toLowerCase()}
        </div>
        <div className="border-b border-zinc-800 flex justify-between items-center text-sm w-full pb-2">
          <span className="text-gray-400">Session Name</span>
          {sessionName}
        </div>
      </div>
    </div>
  );
};
