import React from "react";

const Select = () => {
  return (
    <div>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Pick the best fantasy franchise</span>
          <span className="label-text-alt">Alt label</span>
        </div>
        <select className="select select-bordered" defaultValue={"first"}>
          <option disabled value="first">
            Pick one
          </option>
          <option value="starWars">Star Wars</option>
          <option value="harryPotter">Harry Potter</option>
          <option value="lordOfTheRings">Lord of the Rings</option>
          <option value="planetOfTheApes">Planet of the Apes</option>
          <option value="starTrek">Star Trek</option>
        </select>
        <div className="label">
          <span className="label-text-alt">Alt label</span>
          <span className="label-text-alt">Alt label</span>
        </div>
      </label>
    </div>
  );
};

export default Select;
