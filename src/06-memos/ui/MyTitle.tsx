import React from "react";

interface Props {
  title: string;
}

export const MyTitle = React.memo(({ title }: Props) => {
  console.log("My Title re-render");
  return (
    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-500">
      {title}
    </h1>
  );
});
