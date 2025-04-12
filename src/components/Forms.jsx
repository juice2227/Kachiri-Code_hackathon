import React, { useState } from "react";

const HealthForm = () => {
  const [formData, setFormData] = useState({
    // Section 1: Basic Info
    age: "",
    weight: "",
    height: "",

    // Section 2: Health Conditions
    conditions: [],
    otherCondition: "",

    // Section 3: Period Info
    lastPeriodDate: "",
    cycleLength: "",
    periodDuration: "",
    periodRegularity: "regular",
    painfulPeriods: false,

    // Section 4: Pregnancy & Lifestyle
    beenPregnant: "",
    pregnanciesCount: "",
    sexuallyActive: "",

    // Section 5: Fertility & Contraceptives
    tryingToConceive: "",
    currentContraceptive: "",
    otherContraceptive: "",

    // Section 6: Medications
    medications: "",

    // Section 7: Consent
    consentGiven: false,
  });

  const healthConditions = [
    "PCOS",
    "Endometriosis",
    "Fibroids",
    "Thyroid Disorder",
    "Diabetes",
    "Hypertension",
    "STI/STD",
    "Other",
  ];

  const contraceptives = [
    "None",
    "Birth Control Pill",
    "IUD",
    "Implant",
    "Condoms",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleConditionChange = (condition) => {
    setFormData((prev) => {
      const newConditions = prev.conditions.includes(condition)
        ? prev.conditions.filter((c) => c !== condition)
        : [...prev.conditions, condition];
      return { ...prev, conditions: newConditions };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-center text-purple-800 mb-8">
          Women's Health Assessment
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 divide-y divide-gray-200"
        >
          {/* Section 1: Basic Info */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">
              1. Basic Information
            </h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="height"
                  className="block text-sm font-medium text-gray-700"
                >
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  id="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Health Conditions */}
          <div className="pt-8 space-y-6">
            <h2 className="text-lg font-medium text-gray-900">
              2. Health Conditions
            </h2>
            <p className="text-sm text-gray-500">Select all that apply</p>

            <div className="grid grid-cols-2 gap-4">
              {healthConditions.map((condition) => (
                <div key={condition} className="flex items-center">
                  <input
                    id={`condition-${condition}`}
                    name="conditions"
                    type="checkbox"
                    checked={formData.conditions.includes(condition)}
                    onChange={() => handleConditionChange(condition)}
                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label
                    htmlFor={`condition-${condition}`}
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    {condition}
                  </label>
                </div>
              ))}
            </div>

            {formData.conditions.includes("Other") && (
              <div className="mt-4">
                <label
                  htmlFor="otherCondition"
                  className="block text-sm font-medium text-gray-700"
                >
                  Please specify
                </label>
                <input
                  type="text"
                  name="otherCondition"
                  id="otherCondition"
                  value={formData.otherCondition}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>
            )}
          </div>

          {/* Section 3: Period Information */}
          <div className="pt-8 space-y-6">
            <h2 className="text-lg font-medium text-gray-900">
              3. Menstrual Cycle Information
            </h2>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="lastPeriodDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Period Date
                </label>
                <input
                  type="date"
                  name="lastPeriodDate"
                  id="lastPeriodDate"
                  value={formData.lastPeriodDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="cycleLength"
                  className="block text-sm font-medium text-gray-700"
                >
                  Average Cycle Length (days)
                </label>
                <input
                  type="number"
                  name="cycleLength"
                  id="cycleLength"
                  value={formData.cycleLength}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="periodDuration"
                  className="block text-sm font-medium text-gray-700"
                >
                  Period Duration (days)
                </label>
                <input
                  type="number"
                  name="periodDuration"
                  id="periodDuration"
                  value={formData.periodDuration}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="periodRegularity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Period Regularity
                </label>
                <select
                  id="periodRegularity"
                  name="periodRegularity"
                  value={formData.periodRegularity}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                >
                  <option value="regular">Regular</option>
                  <option value="irregular">Irregular</option>
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="painfulPeriods"
                name="painfulPeriods"
                type="checkbox"
                checked={formData.painfulPeriods}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label
                htmlFor="painfulPeriods"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Experience painful periods
              </label>
            </div>
          </div>

          {/* Section 4: Pregnancy & Lifestyle */}
          <div className="pt-8 space-y-6">
            <h2 className="text-lg font-medium text-gray-900">
              4. Pregnancy & Lifestyle
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Have you been pregnant before?
                </label>
                <div className="mt-1 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="beenPregnant"
                      value="yes"
                      checked={formData.beenPregnant === "yes"}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="beenPregnant"
                      value="no"
                      checked={formData.beenPregnant === "no"}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {formData.beenPregnant === "yes" && (
                <div>
                  <label
                    htmlFor="pregnanciesCount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    If yes, how many times?
                  </label>
                  <input
                    type="number"
                    name="pregnanciesCount"
                    id="pregnanciesCount"
                    value={formData.pregnanciesCount}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Are you sexually active?
                </label>
                <div className="mt-1 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="sexuallyActive"
                      value="yes"
                      checked={formData.sexuallyActive === "yes"}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="sexuallyActive"
                      value="no"
                      checked={formData.sexuallyActive === "no"}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Fertility & Contraceptives */}
          <div className="pt-8 space-y-6">
            <h2 className="text-lg font-medium text-gray-900">
              5. Fertility & Contraceptives
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Are you trying to conceive?
                </label>
                <div className="mt-1 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="tryingToConceive"
                      value="yes"
                      checked={formData.tryingToConceive === "yes"}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="tryingToConceive"
                      value="no"
                      checked={formData.tryingToConceive === "no"}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="currentContraceptive"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Contraceptive Method
                </label>
                <select
                  id="currentContraceptive"
                  name="currentContraceptive"
                  value={formData.currentContraceptive}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                >
                  {contraceptives.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {formData.currentContraceptive === "Other" && (
                <div>
                  <label
                    htmlFor="otherContraceptive"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Please specify
                  </label>
                  <input
                    type="text"
                    name="otherContraceptive"
                    id="otherContraceptive"
                    value={formData.otherContraceptive}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section 6: Medications */}
          <div className="pt-8 space-y-6">
            <h2 className="text-lg font-medium text-gray-900">
              6. Medications
            </h2>

            <div>
              <label
                htmlFor="medications"
                className="block text-sm font-medium text-gray-700"
              >
                List any medications affecting reproductive health
              </label>
              <textarea
                id="medications"
                name="medications"
                rows={3}
                value={formData.medications}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                placeholder="Include medication names, dosages, and frequency"
              />
            </div>
          </div>

          {/* Section 7: Consent */}
          <div className="pt-8 space-y-6">
            <h2 className="text-lg font-medium text-gray-900">7. Consent</h2>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="consentGiven"
                  name="consentGiven"
                  type="checkbox"
                  checked={formData.consentGiven}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="consentGiven"
                  className="font-medium text-gray-700"
                >
                  I consent to the collection and use of this health information
                  for medical purposes
                </label>
                <p className="text-gray-500">
                  By checking this box, you acknowledge that this information
                  will be stored securely and used by healthcare providers.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-8">
            <button
              type="submit"
              className="w-full bg-purple-600 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              disabled={!formData.consentGiven}
            >
              Submit Health Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthForm;
