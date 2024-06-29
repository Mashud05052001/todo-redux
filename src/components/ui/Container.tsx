import { ReactNode } from "react";

type TContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: TContainerProps) => {
  return (
    <div className="mx-auto max-w-7xl h-screen w-full px-3 sm:px-5 xl:px-8">
      {children}
    </div>
  );
};

export default Container;
