import { Children } from "react";

export default function HeadLayout({children}) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">
        Welcome to Our Restaurant
      </h1>
      {children}
    </div>
  );
}
