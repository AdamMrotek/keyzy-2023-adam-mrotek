"use client";
import { useState } from "react";
import DataRetrived from "./DataRetrived";

// import Slider from "rc-slider";
import "rc-slider/assets/index.css";

// const createSliderWithTooltip = Slider.createSliderWithTooltip;

export default function FormInputs() {
  const handleUrlScrape = async () => {
    console.log("handleUrlScrape");
    const res = await fetch("http://localhost:3000/api/getPropertyPrice", {
      method: "POST",
      body: JSON.stringify({ input }),
    });
    const details = await res.json();
    console.log(details);
    setPrice(details.price);
    setPostCode(details.postCode);
  };

  const [price, setPrice] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [postCode, setPostCode] = useState("");
  return (
    <div className="flex my-4 width p-8">
      <div className="flex flex-col border-magenta border-2 border-solid w-1/2 p-4">
        <h2>Inputs</h2>
        <h1 className="flex text-cyan-700 bg-yellow-100 col-blue-200 text-5xl font-bold underline mx-auto">
          Hello world!
        </h1>

        <label htmlFor="urlInput">Url Input:</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          name="urlInput"
          type="text"
          placeholder="Right Move Url"
        />
        <input
          type="range"
          id="discount"
          name="discount"
          min="0"
          max="30"
          step="1"
        />
        <input
          type="number"
          id="desiredYield"
          name="desiredYield"
          min="4.5"
          max="9"
          step="0.5"
        ></input>
        <input
          type="range"
          id="converteRentRate"
          name="converteRentRate"
          min="10"
          max="25"
          step="5"
        />
        <button onClick={handleUrlScrape}>Go</button>
        <p className="green-400 text-5xl font-bold mx-auto ">
          What&apos;s going on
        </p>
        <p className="font-sans">Property price {price}</p>
        <p>Property post code {postCode}</p>
      </div>
      <div className=" border-magenta border-2 border-solid w-1/2 p-4">
        <DataRetrived morgageValue={300000} />
      </div>
    </div>
  );
}
