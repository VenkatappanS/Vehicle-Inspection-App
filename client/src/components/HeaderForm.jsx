import React, { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import useSpeechInput from '../hooks/useSpeechInput';

const HeaderForm = ({ next, data, updateData }) => {

  const { isListening, activeField, startListening } = useSpeechInput();

  const [form, setForm] = useState({
    truckSerial: data.truckSerial || '',
    truckModel: data.truckModel || '',
    inspectorName: data.inspectorName || '',
    inspectionEmpId: data.inspectionEmpId || '',
    inspectionDateTime: data.inspectionDateTime || '',
    location: data.location || '',
    geoCoordinates: data.geoCoordinates || '',
    serviceMeterHours: data.serviceMeterHours || '',
    inspectorSignature: data.inspectorSignature || '',
    customerName: data.customerName || '',
    customerId: data.customerId || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    updateData(form);
    next();
  };

  const handleMicClick = (label, key) => {
  startListening(label, (text) => {
    setForm((prev) => ({ ...prev, [key]: text }));
  });
};


  const renderField = (label, name, type = 'text') => (
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-6">Header</h2>
    <div className="space-y-4">
      {renderField('Truck Serial Number', 'truckSerial')}
      {renderField('Truck Model', 'truckModel')}
      {renderField('Inspector Name', 'inspectorName')}
      {renderField('Inspection Employee ID', 'inspectionEmpId')}
      {renderField('Date & Time of Inspection', 'inspectionDateTime', 'datetime-local')}
      {renderField('Location of Inspection', 'location')}
      {renderField('Geo Coordinates (optional)', 'geoCoordinates')}
      {renderField('Service Meter Hours', 'serviceMeterHours', 'number')}
      {renderField('Inspector Signature', 'inspectorSignature')}
      {renderField('Customer Name/Company Name', 'customerName')}
      {renderField('CAT Customer ID', 'customerId')}
    </div>
    <div className="flex justify-end pt-6">
      <button
        onClick={handleNext}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
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

export default HeaderForm;
