"use client";
import { useState } from "react";
import DataRetrived from "./DataRetrived";
import "rc-slider/assets/index.css";
import ToolTip from "./ToolTip";

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
  const handleValidateUrlInput = () => {
    const isFromRightMove = input.includes(
      "https://www.rightmove.co.uk/properties/"
    );
    const isURLNumberValid = input
      .replace("https://www.rightmove.co.uk/properties/", "")
      .replace("#", "")
      .match(/^[0-9]+$/);
    if (isFromRightMove && isURLNumberValid) {
      handleUrlScrape();
      setInvalidInput(false);
    } else {
      setInvalidInput(true);
    }
  };
  const [invalidInput, setInvalidInput] = useState(false);
  const [price, setPrice] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [postCode, setPostCode] = useState("");
  const [discount, setDiscount] = useState("15");
  const [desiredYield, setDesiredYield] = useState("5");
  const [convertedRentRate, setConvertedRentRate] = useState("15");
  const [duration, setDuration] = useState("5");
  const TABLET_MESSAGE: string =
    "Not tablet friendly - please use mobile or desktop device".replaceAll(
      " ",
      "_"
    );
  console.log(TABLET_MESSAGE);
  return (
    <div
      className={`before:absolute before:top-0 before:translate-x-1/2 before: flex flex-col befo md:flex-row md:before:content-['${TABLET_MESSAGE}'] my-4 p-8 lg:before:content-['']`}
    >
      <div className="grid grid-cols-1-2 items-center gap-4 border-magenta border-2 border-solid md:w-1/2 p-4">
        <h2 className="text-3xl col-span-2 font-bold">Inputs</h2>

        <label htmlFor="urlInput">Url Input:</label>
        <div className="relative">
          {invalidInput && (
            <span className="absolute bg-red-800 text-parchment p-1 rounded-lg text-sm top-0 -translate-y-14">
              Invalid URL: Please provide url in format
              &#34;https://www.rightmove.co.uk/properties/128317784#&#34;
            </span>
          )}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name="urlInput"
            type="text"
            placeholder="..."
            className="bg-azure text-parchment p-2 outline-navy placeholder:text-parchment"
          />
        </div>
        <p className="text-lg">Discount :</p>
        <div>
          <ToolTip value={discount} min={0} max={30} extraSymbol="%" />
          <input
            type="range"
            id="discount"
            name="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            min="0"
            max="30"
            step="1"
          />
        </div>
        <p>Desired yield :</p>
        <input
          type="number"
          id="desiredYield"
          name="desiredYield"
          value={desiredYield}
          onChange={(e) => setDesiredYield(e.target.value)}
          min="4.5"
          max="9"
          step="0.5"
          className="p-4 border-azure border-solid border-2"
        ></input>
        <p>Converted rent rate:</p>
        <div>
          <ToolTip
            value={convertedRentRate}
            min={10}
            max={25}
            extraSymbol="%"
          />

          <input
            type="range"
            id="converteRentRate"
            name="converteRentRate"
            value={convertedRentRate}
            onChange={(e) => setConvertedRentRate(e.target.value)}
            min="10"
            max="25"
            step="5"
          />
        </div>
        <p>Number of years:</p>

        <div className=" flex col-span-2 justify-between">
          <input
            className="hidden"
            onChange={(e) => setDuration(e.target.value)}
            type="radio"
            value="3"
            name="duration"
            id="duration-3"
            checked={duration === "3"}
          />
          <label
            htmlFor="duration-3"
            className={`${
              duration === "3" ? "opacity-100" : "opacity-50"
            } py-4 px-10 text-2xl text-parchment bg-azure`}
          >
            3
          </label>

          <input
            className="hidden"
            onChange={(e) => setDuration(e.target.value)}
            type="radio"
            value="5"
            name="duration"
            id="duration-5"
            checked={duration === "5"}
          />
          <label
            htmlFor="duration-5"
            className={`${
              duration === "5" ? "opacity-100" : "opacity-50"
            } py-4 px-10 text-2xl text-parchment bg-azure`}
          >
            5
          </label>
          <input
            className="hidden"
            onChange={(e) => setDuration(e.target.value)}
            type="radio"
            value="7"
            name="duration"
            id="duration-7"
            checked={duration === "7"}
          />
          <label
            htmlFor="duration-7"
            className={`${
              duration === "7" ? "opacity-100" : "opacity-50"
            } py-4 px-10 text-2xl text-parchment bg-azure`}
          >
            7
          </label>
        </div>

        <button
          onClick={handleValidateUrlInput}
          className="w-full col-span-2 bg-magenta text-parchment my-8 py-4"
        >
          Go
        </button>
      </div>
      <div className=" border-magenta border-2 border-solid md:w-1/2 p-4">
        <DataRetrived
          morgageValues={{
            price: parseFloat(price.replace(",", "")),
            postCode,
            discount: parseFloat(discount) / 100,
            desiredYield: parseFloat(desiredYield) / 100,
            convertedRentRate: parseFloat(convertedRentRate) / 100,
            duration: parseFloat(duration),
          }}
        />
      </div>
    </div>
  );
}
