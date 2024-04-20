import React from "react";

export default function page(): React.JSX.Element {
  return (
    <div className="grid place-content-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Signin</h2>
          
          <div className="card-actions justify-end">
            <button className="btn w-full  text-white" type="button">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}
