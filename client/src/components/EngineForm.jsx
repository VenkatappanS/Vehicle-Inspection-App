import React, { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import useSpeechInput from '../hooks/useSpeechInput';

const EngineForm = ({ next, prev, data, updateData }) => {
  
  const { isListening, activeField, startListening } = useSpeechInput();

  const [form, setForm] = useState({
    engineRustDamage: data.engineRustDamage || 'N',
    engineOilCondition: data.engineOilCondition || 'Good',
    engineOilColor: data.engineOilColor || 'Clean',
    brakeFluidCondition: data.brakeFluidCondition || 'Good',
    brakeFluidColor: data.brakeFluidColor || 'Clean',
    oilLeakEngine: data.oilLeakEngine || 'N',
    engineSummary: data.engineSummary || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    updateData(form);
    next();
  };

  const handlePrev = () => {
    updateData(form);
    prev();
  };

 const generateEngineSummary = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/gemini/engine-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        oilLevel: form.oilLevel,
        coolantLevel: form.coolantLevel,
        beltsCondition: form.beltsCondition,
        engineNoise: form.engineNoise,
      }),
    });

    const data = await response.json();
    setForm((prev) => ({ ...prev, engineSummary: data.summary }));
  } catch (err) {
    console.error('Summary error:', err);
    alert('Failed to generate engine summary');
  }
};



  const renderSelect = (label, name, options) => (
    <div className="grid grid-cols-12 gap-4 items-center">
      <label className="col-span-3 font-medium">{label}</label>
      <select
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="col-span-8 border rounded p-2 bg-white border-black-800 mb-4"
      >
        {options.map(([value, text]) => (
          <option key={value} value={value}>{text}</option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => startListening(label, (val) => setForm(prev => ({ ...prev, [name]: val })))}
        className="col-span-1 bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded flex items-center justify-center"
      >
        <FaMicrophone />
      </button>


    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Engine Inspection</h2>
      <div className="space-y-4">
        {renderSelect('Rust/Damage in Engine', 'engineRustDamage', [
          ['Y', 'Yes'],
          ['N', 'No'],
        ])}
        {renderSelect('Engine Oil Condition', 'engineOilCondition', [
          ['Good', 'Good'],
          ['Bad', 'Bad'],
        ])}
        {renderSelect('Engine Oil Color', 'engineOilColor', [
          ['Clean', 'Clean'],
          ['Brown', 'Brown'],
          ['Black', 'Black'],
        ])}
        {renderSelect('Brake Fluid Condition', 'brakeFluidCondition', [
          ['Good', 'Good'],
          ['Bad', 'Bad'],
        ])}
        {renderSelect('Brake Fluid Color', 'brakeFluidColor', [
          ['Clean', 'Clean'],
          ['Brown', 'Brown'],
          ['Black', 'Black'],
        ])}
        {renderSelect('Oil Leak in Engine', 'oilLeakEngine', [
          ['Y', 'Yes'],
          ['N', 'No'],
        ])}
      </div>

      {/* Summary */}
      <div className="mt-6">
        <label className="block mb-2 font-medium">Engine Summary</label>
        <textarea
          name="engineSummary"
          value={form.engineSummary}
          onChange={handleChange}
          placeholder="Enter or generate a summary"
          rows={4}
          className="w-full border rounded p-2"
        ></textarea>

        <button
          onClick={generateEngineSummary}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generate Engine Summary
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Previous
        </button>
      </div>

      {isListening && (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            width: '300px',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {activeField}
          </h2>
          <p style={{ color: '#555' }}>🎤 Listening...</p>
        </div>
      </div>
    )}
    </div>
  );
};

export default EngineForm;
