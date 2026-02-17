import React from "react";

function Help() {
  return (
    <div className="px-4 py-4 sm:px-6 lg:px-16 mt-2">
      <div className="bg-white p-4 sm:p-6 rounded-2xl mb-4 border border-zinc-950 flex flex-col items-center space-y-6">
        <p className="font-bold text-black font-poppins text-lg sm:text-xl">How can I help you?</p>

        <div className="outline-blue-500 border rounded-md w-full max-w-2xl p-2 sm:p-3 font-semibold bg-color flex items-center h-12 hover:bg-orange-300">
          <p className="inner-text font-extralight ml-2 sm:ml-4">How can I help you?</p>
          <div className="ml-auto">
            <i className="fa-solid fa-angle-down" style={{ color: "#000000" }}></i>
          </div>
        </div>

        <div className="outline-blue-500 border rounded-md w-full max-w-2xl p-2 sm:p-3 font-semibold bg-color-dark flex items-center h-12 hover:bg-orange-400">
          <p className="inner-text font-extralight ml-2 sm:ml-4">How can I help you?</p>
          <div className="ml-auto">
            <i className="fa-solid fa-angle-down" style={{ color: "#000000" }}></i>
          </div>
        </div>

        <div className="outline-blue-500 border rounded-md w-full max-w-2xl p-2 sm:p-3 font-semibold bg-color-dark flex items-center h-12 hover:bg-orange-400">
          <p className="inner-text font-extralight ml-2 sm:ml-4">How can I help you?</p>
          <div className="ml-auto">
            <i className="fa-solid fa-angle-down" style={{ color: "#000000" }}></i>
          </div>
        </div>

        <div className="outline-blue-500 border rounded-md w-full max-w-2xl p-2 sm:p-3 font-semibold bg-color-dark flex items-center h-12 hover:bg-orange-400">
          <p className="inner-text font-extralight ml-2 sm:ml-4">How can I help you?</p>
          <div className="ml-auto">
            <i className="fa-solid fa-angle-down" style={{ color: "#000000" }}></i>
          </div>
        </div>

        <div className="bg-color-dark border rounded-md w-full max-w-xs p-2 font-semibold h-12 hover:bg-orange-400 flex items-center justify-center">
          <div className="ml-2 flex items-center">
            <i className="fa-solid fa-envelope" style={{ color: "#ffa500" }}></i>
            <b className="ml-4 inner-text font-normal">EMAIL</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
