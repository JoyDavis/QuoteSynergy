import React, { useState } from "react";
import OpenAI from "openai";
import config from "./config.json";

const Openai = () => {
  const [prompt, setPrompt] = useState("");
  const [numberInput, setNumberInput] = useState(0);
  const [selectedTone, setSelectedTone] = useState("neutral");
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  const speakQuote = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const handleNumberInputChange = (event) => {
    setNumberInput(event.target.value);
  };

  const handleToneChange = (event) => {
    setSelectedTone(event.target.value);
  };

  const generateResponse = async () => {
    const openaiApiKey = config.openaiApiKey;
    const openai = new OpenAI({
      apiKey: openaiApiKey,
      dangerouslyAllowBrowser: true,
    });

    setLoading(true);

    try {
      let tonePrompt = "";

      const toneInstructions = {
        neutral: "Write in a neutral tone.",
        friendly: "Write in a friendly and approachable tone.",
        inspirational: "Provide inspirational and motivational quotes.",
        relaxed: "Write in a relaxed and laid-back tone.",
        funny: "Inject humor and make the quotes funny.",
        professional: "Maintain a professional and formal tone.",
        witty: "Inject wit and cleverness into the responses.",
        adventurous: "Provide adventurous and daring quotes.",
      };

      tonePrompt += toneInstructions[selectedTone];

      const response = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Who won the world series in 2020?" },
          {
            role: "assistant",
            content: "The Los Angeles Dodgers won the World Series in 2020.",
          },
          {
            role: "system",
            content: `You take the user input and then give them ${numberInput} quotes about the topic they give you with ${selectedTone} tone.`,
          },
          // {
          //   role: "system",
          //   content: `You only give quotes, if the user asks a general question, tell them "..."`,
          // },
          { role: "user", content: prompt },
          { role: "assistant", content: tonePrompt },
        ],
        model: "gpt-3.5-turbo",
      });

      const quoteSets = response.choices[0].message.content.split("\n");

      const cleanQuoteSets = quoteSets.filter((set) => set.trim() !== "");
      setQuotes(cleanQuoteSets);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="openai">
      <section className="hero-section">
        <div className="hero-container hero2">
          <h1>
            Envision, Create, Inspire: Let QuoteSynergy's AI Quote Generator
            Spark Your Imagination!
          </h1>
          <p className="hero2-text">
            Unlock the power of words and unleash your creativity with every
            generated quote!
          </p>
          <div>
            <div className="generate-flex3">
              <div className="generate-flex2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#666"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                </svg>
                <p className="check-text">No credit card required</p>
              </div>
              <div className="generate-flex2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#666"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                </svg>
                <p className="check-text">No signup required</p>
              </div>
              <div className="generate-flex2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#666"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                </svg>
                <p className="check-text">Endless quotes</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="generator-container">
        <h2>AI Quote Generator</h2>
        <p className="promptInput">Please enter your prompt below:</p>
        <textarea
          id="promptInput"
          rows="4"
          cols="50"
          value={prompt}
          onChange={handleInputChange}
          style={{ height: "auto" }}
          placeholder="Type your prompt here..."
        ></textarea>
        <br />
        <br />
        <div className="input-container">
          <div className="amount-container">
            <label htmlFor="promptInput2">Amount of quotes:</label>

            <input
              id="promptInput2"
              type="number"
              value={numberInput}
              onChange={handleNumberInputChange}
              min={0}
              max={5}
            />
          </div>
          <div className="tone-container">
            <label htmlFor="tone">Select tone:</label>
            <div className="custom-select">
              <select
                id="tone"
                value={selectedTone}
                onChange={handleToneChange}
              >
                <option value="neutral">Neutral</option>
                <option value="friendly">Friendly</option>
                <option value="inspirational">Inspirational</option>
                <option value="relaxed">Relaxed</option>
                <option value="funny">Funny</option>
                <option value="professional">Professional</option>
                <option value="witty">Witty</option>
                <option value="adventurous">Adventurous</option>
              </select>
            </div>
          </div>
        </div>
        <br />
        <br />
        <button onClick={generateResponse} className={loading ? "loading" : ""}>
          {loading ? "Loading..." : "Generate"}
        </button>
        <br />
        <br />
        <div id="responseArea">
          {quotes.map((quote) => (
            <div className="quote-container" key={quote}>
              <div className="quote-text">{quote}</div>
              <div className="btn-container">
                <button onClick={() => copyToClipboard(quote)}>
                  {" "}
                  <i className="fas fa-copy"></i>
                </button>
                <button onClick={() => speakQuote(quote)}>
                  <i className="fas fa-volume-up"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <section>
        <div className="steps-container">
          <h2>Generate Quotes in 3 Simple Steps!</h2>
          <div className="grid-3">
            <div className="generate-card">
              <p className="generate-step">1</p>

              <p className="generate-text">
                Input a quote topic that resonates with you
              </p>
            </div>
            <div className="generate-card">
              <p className=" generate-step">2</p>
              <p className="generate-text">
                Select the tone of the quote and how many quotes you want to
                output
              </p>
            </div>

            <div className="generate-card">
              <p className="generate-step">3</p>
              <p className="generate-text">Click the generate button</p>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <p>Copyright © 2024 QuoteSynergy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Openai;
