import { FC } from "react";

interface HeadingProps {
  title: string;
  subtitle: string;
}

const Heading: FC<HeadingProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <p className="font-bold text-lg">{title}</p>
      <p className="font-light text-neutral-600">{subtitle}</p>
    </div>
  );
};

export default Heading;
