import React, { useState } from 'react';

const TranslateForm = () => {
  const [input, setInput] = useState('');
  const [translation, setTranslation] = useState('');
  const [sourceLang, setSourceLang] = useState('en'); // Set default source language
  const [targetLang, setTargetLang] = useState('de'); // Set default target language
  const [showTranslation, setShowTranslation] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    setError('');
    setShowTranslation(false);
    const data = {
      inputs: input,
      parameters: {
        src_lang: sourceLang, // MBart requires specifying source language
        tgt_lang: targetLang, // MBart requires specifying target language
      }
    };

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/mbart-large-50-many-to-many-mmt",
        {
          headers: {
            Authorization: "Bearer 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", // Your Hugging Face API key
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (response.ok) {
        setTranslation(result.generated_text || "No translation available.");
        setShowTranslation(true);
      } else {
        throw new Error(result.error.message || "Translation failed.");
      }
    } catch (error) {
      setError(`Failed to translate: ${error.message}`);
      console.error("Translation error:", error);
    }
  };

  return (
    <div className="content-container">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter text to translate"
      />
      <div className="flex gap-4 mb-4">
        <select onChange={e => setSourceLang(e.target.value)} value={sourceLang} className="input-style">
          <option value="en">English</option>
          <option value="de">German</option>
          <option value="fr">French</option>
          <option value="ru">Russian</option>
        </select>
        <select onChange={e => setTargetLang(e.target.value)} value={targetLang} className="input-style">
          <option value="de">German</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="ru">Russian</option>
        </select>
      </div>
      <button onClick={handleTranslate} className="button-style">Translate</button>
      {translation && <div className={`translation-display show`}>{translation}</div>}
      {error && <div className={`error-display show`}>{error}</div>}
    </div>
  );
};

export default TranslateForm;
