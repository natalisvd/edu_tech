import React from "react";
import Link from "next/link";

const Frontend = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="/frontend/vue">
          <div className="bg-white p-8 rounded shadow-md cursor-pointer transition-colors duration-300 hover:bg-blue-200">
            <h2 className="text-xl font-bold mb-4">Vue</h2>
            <p>Click and take the vue test</p>
          </div>
        </Link>
        <Link href="/frontend/react">
          <div className="bg-white p-8 rounded shadow-md cursor-pointer transition-colors duration-300 hover:bg-blue-200">
            <h2 className="text-xl font-bold mb-4">React</h2>
            <p>Click and take the react test</p>
          </div>
        </Link>
        <Link href="/frontend/login">
          <div className="bg-white p-8 rounded shadow-md cursor-pointer transition-colors duration-300 hover:bg-blue-200">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <p>Click and take the react test</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Frontend;
