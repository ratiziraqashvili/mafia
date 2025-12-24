import { HomeCards } from "@/components/home-cards";
import { MafiaHeader } from "@/components/mafia-header";

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center gap-6 my-10 md:mx-15">
      <div className="flex flex-col items-center gap-4">
        <MafiaHeader />
        <h2 className="text-[#9aa] text-xl text-center max-w-2xl">Enter the shadows of deception and strategy. Will you survive the night or fall victim to the Mafia's schemes?</h2>
      </div>
      <HomeCards />
    </div>
  );
}
