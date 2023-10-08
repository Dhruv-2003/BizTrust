import React from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="w-screen">
      <div className="flex px-10 pt-3 pb-1 justify-between align-middle">
        <p
          onClick={() => router.push("/")}
          className="text-transparent bg-clip-text font-semibold bg-blue-400 text-4xl cursor-pointer"
        >
          Biztrust
        </p>
        <div className="flex justify-evenly mt-2 mx-3">
          <p
            onClick={() => router.push("/dashboard")}
            className="text-2xl font-semibold text-blue-400 before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
                    before:bottom-0 before:left-0 before:bg-blue-600 cursor-pointer
                    before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                    before:transition before:ease-in-out before:duration-300 block relative"
          >
            Dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
