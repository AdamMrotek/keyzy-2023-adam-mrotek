"use client";
import { useState } from "react";

export default function Home() {
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
    <div className="flex flex-col my-4">
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
      <button onClick={handleUrlScrape}>Go</button>

      <p className="green-400 text-5xl font-bold mx-auto">
        What&apos;s going on
      </p>
      <p className="font-sans">Property price {price}</p>
      <p>Property post code {postCode}</p>
    </div>
  );
}
