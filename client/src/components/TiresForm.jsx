import React, { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import useSpeechInput from '../hooks/useSpeechInput';

const TiresForm = ({ next, prev, data, updateData }) => {
  
  const { isListening, activeField, startListening } = useSpeechInput();
  
  const [form, setForm] = useState({
    leftFrontPressure: data.leftFrontPressure || '',
    rightFrontPressure: data.rightFrontPressure || '',
    leftFrontCondition: data.leftFrontCondition || 'Good',
    rightFrontCondition: data.rightFrontCondition || 'Good',
    leftRearPressure: data.leftRearPressure || '',
    rightRearPressure: data.rightRearPressure || '',
    leftRearCondition: data.leftRearCondition || 'Good',
    rightRearCondition: data.rightRearCondition || 'Good',
    tireSummary: data.tireSummary || '',
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

  const generateTireSummary = () => {
    const {
      leftFrontPressure, rightFrontPressure, leftRearPressure, rightRearPressure,
      leftFrontCondition, rightFrontCondition, leftRearCondition, rightRearCondition
    } = form;

    const summary = `Front tires: Left ${leftFrontPressure} PSI (${leftFrontCondition}), Right ${rightFrontPressure} PSI (${rightFrontCondition}). 
Rear tires: Left ${leftRearPressure} PSI (${leftRearCondition}), Right ${rightRearPressure} PSI (${rightRearCondition}).`;

    setForm({ ...form, tireSummary: summary });
  };

  const renderField = (label, name, type = 'text', placeholder = '') => (
    <div className="grid grid-cols-12 gap-4 items-center">
      <label className="col-span-3 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={label}
        className="col-span-8 border rounded p-2 bg-white text-black border-black mb-4"
      />
      
      <button
        type="button"
        onClick={() => startListening(label, (val) => setForm(prev => ({ ...prev, [name]: val })))}
        className="col-span-1 bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded flex items-center justify-center"
      >
        <FaMicrophone />
      </button>

    </div>
  );

  const renderSelect = (label, name) => (
    <div className="grid grid-cols-12 gap-4 items-center">
      <label className="col-span-3 font-medium">{label}</label>
      <select
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="col-span-8 border rounded p-2 bg-white border-black-800 mb-4"
      >
        <option value="Good">Good</option>
        <option value="Ok">Ok</option>
        <option value="Needs Replacement">Needs Replacement</option>
      </select>
      <button
        type="button"
        className="col-span-1 bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded flex items-center justify-center"
        onClick={() => startListening((text) => setForm(prev => ({ ...prev, [name]: text })))}
      >
  <FaMicrophone />
</button>

    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Tire Inspection</h2>
      <div className="space-y-4">
        {renderField('Left Front Pressure (PSI)', 'leftFrontPressure', 'number')}
        {renderField('Right Front Pressure (PSI)', 'rightFrontPressure', 'number')}
        {renderField('Left Rear Pressure (PSI)', 'leftRearPressure', 'number')}
        {renderField('Right Rear Pressure (PSI)', 'rightRearPressure', 'number')}

        {renderSelect('Left Front Condition', 'leftFrontCondition')}
        {renderSelect('Right Front Condition', 'rightFrontCondition')}
        {renderSelect('Left Rear Condition', 'leftRearCondition')}
        {renderSelect('Right Rear Condition', 'rightRearCondition')}
      </div>

      {/* Summary and Buttons */}
      <div className="mt-6">
        <label className="block mb-2 font-medium">Tire Summary</label>
        <textarea
          name="tireSummary"
          value={form.tireSummary}
          onChange={handleChange}
          placeholder="Enter or generate a summary"
          rows={4}
          className="w-full border rounded p-2"
        ></textarea>

        <button
          onClick={generateTireSummary}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generate Tire Summary
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button onClick={handlePrev} className="bg-gray-300 px-4 py-2 rounded">
          Previous
        </button>
        <button onClick={handleNext} className="bg-green-600 text-white px-4 py-2 rounded">
          Next
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

export default TiresForm;
