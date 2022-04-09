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
    setCatSus(
      "https://i.pinimg.com/originals/59/94/92/599492d0af693f11c73b368149b0b287.jpg"
    );
    setPowers(".... Wizarding In Progress ...");
    setStyleThing1("plum");
    setStyleThing2(30);
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
      <img
        src={catSus}
        style={{
          objectFit: "cover",
          objectPosition: "50%",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
        alt="beans"
      />
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          width: "auto",
          height: "auto",
          position: "absolute",
          textAlign: "center",
          alignContent: "stretch",
          justifyContent: "stretch",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
        <h2
          style={{
            background: stylething1,
            fontSize: stylething2 + "pt",
            gridColumn: 1,
            height: 500 + "px",
            width: 350 + "px",
            fontFamily: "sans-serif",
            alignSelf: "center",
            justifySelf: "center",
          }}
        >
          {powers}
        </h2>
        <img
          src={catSus}
          style={{
            objectFit: "cover",
            height: 400 + "px",
            width: "300px",
            alignSelf: "center",
            justifySelf: "center",
            backgroundColor: "lightcyan",
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
        <button
          onClick={() => summonPower()}
          style={{
            alignSelf: "center",
            justifySelf: "center",
          }}
        >
          haz powers?
        </button>
        <button
          onClick={() => yeetTheDeets()}
          style={{
            alignSelf: "center",
            justifySelf: "center",
          }}
        >
          Sned
        </button>
        <button
          onClick={() => deetTheYeets()}
          style={{
            alignSelf: "center",
            justifySelf: "center",
          }}
        >
          Deet
        </button>
        <button
          onClick={() => changeTheWorld()}
          style={{
            alignSelf: "center",
            justifySelf: "center",
          }}
        >
          Deet
        </button>
      </div>
    </>
  );
};

export default TestConcept;
