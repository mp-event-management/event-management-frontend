import { FC } from "react";

interface HeadingProps {
  title: string;
  subtitle: string;
}

const Heading: FC<HeadingProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full text-center">
      <p className="font-bold text-2xl">{title}</p>
      <p className="font-normal text-lg text-neutral-600">{subtitle}</p>
    </div>
  );
};

export default Heading;
