import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import girlImage from "../assets/girl4.jpg"; // Make sure to add your image file

const ContraceptiveDashboard = () => {
  const navigate = useNavigate();

  // Get contraceptive data from form submission or local storage
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem("healthFormData");
    return savedData
      ? JSON.parse(savedData)
      : {
          currentContraceptive: "None",
          otherContraceptive: "",
          tryingToConceive: "no",
        };
  });

  // Contraceptive data with usage statistics
  const [contraceptives] = useState([
    {
      name: "Pill",
      effectiveness: 91,
      convenience: 70,
      sideEffects: 40,
      durationRemaining:
        userData.currentContraceptive === "Pill" ? "3 weeks" : null,
      description: "Daily oral medication that prevents ovulation",
      pros: ["91% effective", "Can regulate periods", "Reduces acne"],
      cons: ["Must take daily", "Possible side effects"],
    },
    {
      name: "IUD",
      effectiveness: 99,
      convenience: 95,
      sideEffects: 30,
      durationRemaining:
        userData.currentContraceptive === "IUD" ? "4 years" : null,
      description: "Small device inserted into uterus that prevents pregnancy",
      pros: ["99% effective", "Long-lasting (3-10 years)", "Low maintenance"],
      cons: ["Requires insertion", "Possible cramping"],
    },
    {
      name: "Implant",
      effectiveness: 99,
      convenience: 90,
      sideEffects: 35,
      durationRemaining:
        userData.currentContraceptive === "Implant" ? "2 years" : null,
      description: "Small rod inserted under skin that releases hormones",
      pros: ["99% effective", "Lasts 3-5 years", "No daily maintenance"],
      cons: ["Possible irregular bleeding", "Requires insertion"],
    },
    {
      name: "Condom",
      effectiveness: 85,
      convenience: 65,
      sideEffects: 5,
      description: "Barrier method that also protects against STIs",
      pros: ["No hormones", "STI protection", "Readily available"],
      cons: ["85% effective", "Must use every time"],
    },
    {
      name: "Injectable",
      effectiveness: 94,
      convenience: 80,
      sideEffects: 45,
      durationRemaining:
        userData.currentContraceptive === "Injectable" ? "8 weeks" : null,
      description: "Shot given every 3 months to prevent pregnancy",
      pros: ["94% effective", "No daily pills", "Private"],
      cons: ["Possible weight gain", "Requires shots"],
    },
  ]);

  const [activeMethod, setActiveMethod] = useState(null);
  const [sliderValues, setSliderValues] = useState({
    effectiveness: 50,
    convenience: 50,
    sideEffects: 50,
  });

  // Update sliders when method changes
  useEffect(() => {
    if (activeMethod) {
      const method = contraceptives.find((m) => m.name === activeMethod);
      if (method) {
        setSliderValues({
          effectiveness: method.effectiveness,
          convenience: method.convenience,
          sideEffects: method.sideEffects,
        });
      }
    }
  }, [activeMethod, contraceptives]);

  // Handle navigation to chat about specific method
  const handleLearnMore = (methodName) => {
    navigate("/chat", { state: { method: methodName } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4 md:p-8">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white p-4 rounded-2xl shadow-lg mb-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Your Contraceptive Overview</h1>
          <p className="text-sm opacity-90">
            {userData.currentContraceptive === "None"
              ? "You're not currently using contraception"
              : `Current method: ${userData.currentContraceptive}${
                  userData.otherContraceptive
                    ? ` (${userData.otherContraceptive})`
                    : ""
                }`}
          </p>
        </div>
      </header>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Method Details Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {activeMethod || "Select a Method"}
          </h2>

          {activeMethod ? (
            <div className="space-y-4">
              {/* Current method status */}
              {userData.currentContraceptive === activeMethod && (
                <div className="bg-pink-50 p-3 rounded-lg mb-4">
                  <p className="text-pink-700 font-medium">
                    You're currently using this method
                  </p>
                  {contraceptives.find((m) => m.name === activeMethod)
                    ?.durationRemaining && (
                    <p className="text-sm text-pink-600 mt-1">
                      Duration remaining:{" "}
                      {
                        contraceptives.find((m) => m.name === activeMethod)
                          .durationRemaining
                      }
                    </p>
                  )}
                </div>
              )}

              {/* Method stats */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Effectiveness: {sliderValues.effectiveness}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValues.effectiveness}
                  readOnly
                  className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Convenience: {sliderValues.convenience}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValues.convenience}
                  readOnly
                  className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Side Effects: {sliderValues.sideEffects}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValues.sideEffects}
                  readOnly
                  className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Method description */}
              <div className="pt-4">
                <h3 className="font-medium text-gray-800">Description</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {
                    contraceptives.find((m) => m.name === activeMethod)
                      ?.description
                  }
                </p>
              </div>

              {/* Pros/Cons */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-medium text-green-600">Pros</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600 mt-1">
                    {contraceptives
                      .find((m) => m.name === activeMethod)
                      ?.pros.map((pro, i) => (
                        <li key={i}>{pro}</li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-600">Cons</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600 mt-1">
                    {contraceptives
                      .find((m) => m.name === activeMethod)
                      ?.cons.map((con, i) => (
                        <li key={i}>{con}</li>
                      ))}
                  </ul>
                </div>
              </div>

              {/* Learn More Button */}
              <button
                onClick={() => handleLearnMore(activeMethod)}
                className="mt-6 w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition"
              >
                Chat with BintiAI about {activeMethod}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={girlImage}
                alt="Woman considering contraceptive options"
                className=" w-full h-auto mb-4"
              />
              <p className="text-gray-500 text-center py-4">
                Select a contraceptive method to view details
              </p>
            </div>
          )}
        </div>

        {/* Contraceptive Options */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Contraceptive Options
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contraceptives.map((method, index) => (
              <div
                key={method.name}
                onClick={() => setActiveMethod(method.name)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  activeMethod === method.name
                    ? "bg-pink-100 border-2 border-pink-500"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <h3 className="font-medium text-lg text-gray-800">
                  {method.name}
                </h3>
                {userData.currentContraceptive === method.name && (
                  <span className="text-xs text-pink-600">
                    (Your current method)
                  </span>
                )}
                <p className="text-sm text-gray-600 mt-2">
                  {method.description}
                </p>
                <div className="mt-3 flex justify-between text-xs">
                  <span>Effectiveness: {method.effectiveness}%</span>
                  <span>Convenience: {method.convenience}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContraceptiveDashboard;
