import React, { useState } from 'react';

const TranslateForm = () => {
  const [input, setInput] = useState('');
  const [translation, setTranslation] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('de');
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    setError('');
    const data = {
      inputs: input,
      parameters: { src_lang: sourceLang, tgt_lang: targetLang },
    };

    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/facebook/mbart-large-50-many-to-many-mmt', {
          headers: {
            Authorization: 'Bearer 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',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (!result.error) {
        setTranslation(result.generated_text || 'No translation available.');
      } else {
        throw new Error("Translation failed: " + result.error.message);
      }
    } catch (error) {
      setError(`Failed to translate: ${error.toString()}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to translate"
      />
      <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
        <option value="en">English</option>
        <option value="de">German</option>
        <option value="fr">French</option>
        <option value="ru">Russian</option>
      </select>
      <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
        <option value="de">German</option>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="ru">Russian</option>
      </select>
      <button onClick={handleTranslate}>Translate</button>
      {translation && <p>{translation}</p>}
      {error && <p className="error-display">{error}</p>}
    </div>
  );
};

export default TranslateForm;
