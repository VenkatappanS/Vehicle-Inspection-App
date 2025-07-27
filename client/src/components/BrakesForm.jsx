import React, { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import useSpeechInput from '../hooks/useSpeechInput';

const BrakesForm = ({ next, prev, data, updateData }) => {
  
  const { isListening, activeField, startListening } = useSpeechInput();

  const [form, setForm] = useState({
    brakeFluidLevel: data.brakeFluidLevel || 'Good',
    frontBrakeCondition: data.frontBrakeCondition || 'Good',
    rearBrakeCondition: data.rearBrakeCondition || 'Good',
    emergencyBrake: data.emergencyBrake || 'Good',
    brakeSummary: data.brakeSummary || '',
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

  const generateBrakeSummary = () => {
    const {
      brakeFluidLevel,
      frontBrakeCondition,
      rearBrakeCondition,
      emergencyBrake,
    } = form;

    const summary = `Brake fluid level is ${brakeFluidLevel}. Front brakes are in ${frontBrakeCondition} condition, rear brakes are ${rearBrakeCondition}. Emergency brake is functioning at a ${emergencyBrake} level.`;

    setForm({ ...form, brakeSummary: summary });
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
        {options.map(([value, labelText]) => (
          <option key={value} value={value}>
            {labelText}
          </option>
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
      <h2 className="text-2xl font-bold mb-6">Brakes Inspection</h2>
      <div className="space-y-4">
        {renderSelect('Brake Fluid Level', 'brakeFluidLevel', [
          ['Good', 'Good'],
          ['Ok', 'Ok'],
          ['Low', 'Low'],
        ])}

        {renderSelect('Front Brake Condition', 'frontBrakeCondition', [
          ['Good', 'Good'],
          ['Ok', 'Ok'],
          ['Needs Replacement', 'Needs Replacement'],
        ])}

        {renderSelect('Rear Brake Condition', 'rearBrakeCondition', [
          ['Good', 'Good'],
          ['Ok', 'Ok'],
          ['Needs Replacement', 'Needs Replacement'],
        ])}

        {renderSelect('Emergency Brake', 'emergencyBrake', [
          ['Good', 'Good'],
          ['Ok', 'Ok'],
          ['Low', 'Low'],
        ])}
      </div>

      {/* Summary */}
      <div className="mt-6">
        <label className="block mb-2 font-medium">Brake Summary</label>
        <textarea
          name="brakeSummary"
          value={form.brakeSummary}
          onChange={handleChange}
          placeholder="Enter or generate a summary"
          rows={4}
          className="w-full border rounded p-2"
        ></textarea>

        <button
          onClick={generateBrakeSummary}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generate Brake Summary
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
        <button
          onClick={handleNext}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
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

export default BrakesForm;
