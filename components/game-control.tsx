import { Button } from "./ui/button";

export const GameControl = () => {
  return (
    <div className="mt-5">
      <Button
        size="lg"
        className="w-40 text-md bg-[#300e0f] hover:opacity-80 hover:bg-[#300e0f]"
      >
        Join Game
      </Button>
      <Button
        size="lg"
        className="w-40 text-md ml-4 bg-[#300e0f]  hover:opacity-80 hover:bg-[#300e0f]"
      >
        Create Game
      </Button>
    </div>
  );
};
