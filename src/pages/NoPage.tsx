import { FC } from "react";

export const NoPage: FC = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <h1 className="text-center font-bold text-lg mt-2">
        Sorry, but there doesn&apos;t seem to be anything here
      </h1>
      <img
        src="https://thumbs.gfycat.com/AccurateUnfinishedBergerpicard-size_restricted.gif"
        alt="Confused John Travolta meme"
      />
    </div>
  );
};
