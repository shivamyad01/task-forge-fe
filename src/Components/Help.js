import React from "react";

function Help() {
  return (
    <div className="ml-16 mt-2">
      <br />
      <div className="bg-white p-4 rounded-2xl mb-4 border border-zinc-950 flex flex-wrap space-y-12 justify-center">
        <p className="font-bold text-black font-poppins ">
          How can I help you?
        </p>

        <div className="outline-2 outline-blue-500/50 border rounded-md w-3/4 p-2 font-semibold bg-color mb-2 mr-32 ml-24 flex items-center h-12 hover:bg-orange-300 ">
          <p className="inner-text font-extralight ml-4">How can I help you?</p>
          <div className="ml-auto">
            <i class="fa-solid fa-angle-down" style={{ color: "#000000," }}></i>
          </div>
        </div>

        <div className="outline-2 outline-blue-500/50 border rounded-md w-3/4 p-2 font-semibold bg-color mb-2 ml-5  mr-12 flex items-center h-12 hover:bg-orange-300">
          <p className="inner-text font-extralight ml-4">How can I help you?</p>
          <div className="ml-auto">
            <i class="fa-solid fa-angle-down" style={{ color: "#000000," }}></i>
          </div>
        </div>

        <div className="outline-2 outline-blue-500/50 border rounded-md w-3/4 p-2 font-semibold bg-color mb-2 ml-5  mr-12 flex items-center h-12 hover:bg-orange-300">
          <p className="inner-text font-extralight ml-4">How can I help you?</p>
          <div className="ml-auto">
            <i class="fa-solid fa-angle-down" style={{ color: "#000000," }}></i>
          </div>
        </div>

        <div className="outline-2 outline-blue-500/50 border rounded-md w-3/4 p-2 font-semibold bg-color mb-2 ml-5  mr-12 flex items-center h-12 hover:bg-orange-300">
          <p className="inner-text font-extralight ml-4">How can I help you?</p>
          <div className="ml-auto">
            <i class="fa-solid fa-angle-down" style={{ color: "#000000," }}></i>
          </div>
        </div>

        <div className="outline-2 outline-blue-500/50 border rounded-md w-80 p-2 font-semibold bg-color mb-2 h-12 hover:bg-orange-300 flex items-center justify-center">
          <div className="ml-2">
            <i className="fa-solid fa-envelope" style={{ color: "#ffa500" }}></i>
            <b className="ml-4 inner-text font-normal">EMAIL</b>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Help;
