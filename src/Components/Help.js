import React from "react";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';

function Help() {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-4 sm:px-6 lg:px-16">
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-2xl mb-4 border border-gray-200 shadow-sm flex flex-col items-center space-y-6">
        <p className="font-bold text-slate-800 font-poppins text-lg sm:text-xl">How can I help you?</p>

        <div className="outline-blue-500 border rounded-md w-full max-w-2xl p-2 sm:p-3 font-semibold bg-color flex items-center h-12 hover:bg-orange-100 cursor-pointer">
          <p className="inner-text font-extralight ml-2 sm:ml-4">What is TaskForge?</p>
          <div className="ml-auto text-gray-700">
            <ExpandMoreRoundedIcon fontSize="small" />
          </div>
        </div>

        <div className="outline-blue-500 border rounded-md w-full max-w-2xl p-2 sm:p-3 font-semibold bg-color-dark flex items-center h-12 hover:bg-orange-100 cursor-pointer">
          <p className="inner-text font-extralight ml-2 sm:ml-4">How do I create a task?</p>
          <div className="ml-auto text-gray-700">
            <ExpandMoreRoundedIcon fontSize="small" />
          </div>
        </div>

        <div className="outline-blue-500 border rounded-md w-full max-w-2xl p-2 sm:p-3 font-semibold bg-color-dark flex items-center h-12 hover:bg-orange-100 cursor-pointer">
          <p className="inner-text font-extralight ml-2 sm:ml-4">How do I manage profiles?</p>
          <div className="ml-auto text-gray-700">
            <ExpandMoreRoundedIcon fontSize="small" />
          </div>
        </div>

        <div className="bg-color-dark border rounded-md w-full max-w-xs p-2 font-semibold h-12 hover:bg-orange-100 flex items-center justify-center cursor-pointer">
          <div className="ml-2 flex items-center text-orange-500">
            <MailOutlineRoundedIcon fontSize="small" />
            <b className="ml-3 inner-text font-normal text-gray-800">EMAIL</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
