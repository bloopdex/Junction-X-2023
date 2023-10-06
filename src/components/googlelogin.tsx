import React from 'react'

export default function Googlelogin() {
    return (
        <div>
            <button
                className=" py-3 pr-3 mb-4 w-full text-center font-extrabold font-roboto px-24 border flex gap-2  rounded-lg text-slate-700 border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
            >
                <img
                    className="w-6 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                ></img>
                <span>Sign in with Google</span>
            </button>
        </div>
    );
}
