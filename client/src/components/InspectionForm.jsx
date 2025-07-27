import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderForm from './HeaderForm';
import TiresForm from './TiresForm';
import BatteryForm from './BatteryForm';
import ExteriorForm from './ExteriorForm';
import BrakesForm from './BrakesForm';
import EngineForm from './EngineForm';
import jsPDF from 'jspdf';

const InspectionForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { reportId } = useParams();

  const updateFormData = (sectionData) => {
    setFormData((prev) => ({ ...prev, ...sectionData }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  useEffect(() => {
    if (reportId) {
      fetch(`http://localhost:5000/api/tasks/${reportId}`)
        .then((res) => res.json())
        .then((data) => setFormData(data))
        .catch((err) => console.error('Error fetching report:', err));
    }
  }, [reportId]);

  const steps = [
    <HeaderForm next={nextStep} data={formData} updateData={updateFormData} />,
    <TiresForm next={nextStep} prev={prevStep} data={formData} updateData={updateFormData} />,
    <BatteryForm next={nextStep} prev={prevStep} data={formData} updateData={updateFormData} />,
    <ExteriorForm next={nextStep} prev={prevStep} data={formData} updateData={updateFormData} />,
    <BrakesForm next={nextStep} prev={prevStep} data={formData} updateData={updateFormData} />,
    <EngineForm next={nextStep} prev={prevStep} data={formData} updateData={updateFormData} />,
  ];

const handleSubmit = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/submit-inspection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reportId, ...formData }),
    });

    if (response.ok) {
      alert('Inspection submitted and saved successfully!');
      generatePDF();  // Download PDF on success
    } else {
      alert('Failed to submit inspection.');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Submission failed.');
  }
};

const generatePDF = () => {
  const doc = new jsPDF();
  let y = 10;

  doc.setFontSize(16);
  doc.text("Vehicle Inspection Report", 70, y);
  y += 10;

  Object.entries(formData).forEach(([key, value]) => {
    doc.setFontSize(12);
    doc.text(`${key}: ${value}`, 10, y);
    y += 8;
    if (y > 270) {
      doc.addPage();
      y = 10;
    }
  });

  doc.save(`inspection_${reportId}.pdf`);
};





  return (
    <div className="p-4 max-w-3xl mx-auto">
      {steps[step]}

      {step === steps.length - 1 && (
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Submit Inspection
        </button>

      )}
    </div>
  );
};

export default InspectionForm;
