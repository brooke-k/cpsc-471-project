import axios from "axios";
import React, { useState } from "react";
import axiosJSONInst from "../axios";
const TestConcept = () => {
  const [powers, setPowers] = useState("powerless :(((");
  const [stylething1, setStyleThing1] = useState("white");
  const [stylething2, setStyleThing2] = useState(24);
  const [catSus, setCatSus] = useState(
    "https://i.kym-cdn.com/entries/icons/mobile/000/026/489/crying.jpg"
  );
  const [wizardSpell, setWizardSpell] = useState("");

  const summonPower = () => {
    axiosJSONInst
      .get("/power/obtain?powerSource=" + wizardSpell)
      .then((res) => {
        setPowers("!! POWER OBTAINED !!\n" + res.data.powerSource);
        setStyleThing1("greenyellow");
        setStyleThing2(48);
        setCatSus(
          "https://www.meme-arsenal.com/memes/6c2dae48c0ac1973c2c2b82842fc79d2.jpg"
        );
      })
      .catch((err) => {
        setPowers("powerless :(((");
        setCatSus(
          "https://i.kym-cdn.com/entries/icons/mobile/000/026/489/crying.jpg"
        );
        setStyleThing1("white");
        setStyleThing2(24);
      });
  };

  const getChange = (e) => {
    setWizardSpell(e.target.value);
  };

  const yeetTheDeets = () => {
    let thing = wizardSpell;
    console.log(wizardSpell);

    axiosJSONInst
      .post("/power/mail", {
        powerSource: thing,
      })
      .then(() => {
        setStyleThing1("lightpink");
        setStyleThing2(48);
        setCatSus(
          "https://www.meme-arsenal.com/memes/6c2dae48c0ac1973c2c2b82842fc79d2.jpg"
        );
        setPowers("!! POWER CREATED !!\n");
      })
      .catch(() => {
        setPowers("weak like a noodle - no powers for u");
        setCatSus(
          "https://i.kym-cdn.com/entries/icons/mobile/000/026/489/crying.jpg"
        );
        setStyleThing1("white");
        setStyleThing2(24);
      });
  };

  const deetTheYeets = () => {
    const dOpt = "many";
    let deleteString =
      "/power/banish?powerSource=" + wizardSpell + "&deleteOption=" + dOpt;
    let thing = wizardSpell;
    console.log(wizardSpell);

    axiosJSONInst
      .delete(deleteString)
      .then((res) => {
        setPowers("!! POWER VANQUISHED !!\n");
        setStyleThing1("orange");
        setStyleThing2(48);
        setCatSus(
          "https://www.meme-arsenal.com/memes/6c2dae48c0ac1973c2c2b82842fc79d2.jpg"
        );
      })
      .catch((err) => {
        setPowers(".. evil persists ...");
        setCatSus(
          "https://i.kym-cdn.com/entries/icons/mobile/000/026/489/crying.jpg"
        );
        setStyleThing1("white");
        setStyleThing2(24);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          width: 100 + "vw",
          height: 100 + "vh",
          position: "absolute",
          top: 0,
        }}
      >
        <h2
          style={{
            background: stylething1,
            fontSize: stylething2 + "pt",
            gridColumn: 1,
            height: 400 + "px",
            width: 500 + "px",
            gridRow: 1,
            fontFamily: "sans-serif",
          }}
        >
          {powers}
        </h2>
        <img
          src={catSus}
          style={{
            objectFit: "cover",
            height: 800 + "px",
            width: 800 + "px",
            gridColumn: 2,
            gridRow: 1,
          }}
          alt="IS THE CAT SUS???"
        />
        <input
          type="text"
          placeholder="wizard spell"
          id="ws"
          onChange={getChange}
          value={wizardSpell}
        />
        <button onClick={() => summonPower()}>haz powers?</button>
        <button onClick={() => yeetTheDeets()}>Sned</button>
        <button onClick={() => deetTheYeets()}>Deet</button>
      </div>
    </>
  );
};

export default TestConcept;
