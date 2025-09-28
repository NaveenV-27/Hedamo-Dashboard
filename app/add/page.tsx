"use client";

import { useState } from "react";

type ProductFormData = {
  name: string;
  category: string;
  description: string;
  ingredients: string[];
  certifications: string[];
};

type Product = {
  id?: number
  productName: string
  category: string
  description: string
  ingredients: string[]
  certifications: string[]
  score: number
  status: string
  // AI suggestions
  explanation?: string
  suggestions?: string[]
  flags?: string[]
}
const AddProductForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    description: "",
    ingredients: [""],
    certifications: [""],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof ProductFormData
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleListChange = (
    index: number,
    value: string,
    field: "ingredients" | "certifications"
  ) => {
    const updatedList = [...formData[field]];
    updatedList[index] = value;
    setFormData({ ...formData, [field]: updatedList });
  };

  const addListItem = (field: "ingredients" | "certifications") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const generateAISuggestions = () => {
    const suggestions: string[] = []
    const flags: string[] = []

    const mockSuggestions = [
      "Add sourcing details for main ingredients.",
      "Include certification ID for organic or safety claims.",
      "Clarify packaging recyclability.",
      "Provide allergen information clearly.",
      "Mention supplier traceability for imported ingredients.",
      "Add environmental impact details like carbon footprint.",
    ];
    

    const shuffled = mockSuggestions.sort(() => 0.5 - Math.random());
    suggestions.concat(shuffled);
    
    // Example logic for mock AI
    if (formData.ingredients.some(i => i === "")) {
      suggestions.push("Add sourcing details for missing ingredients")
      flags.push("Incomplete ingredients")
    }
    if (!formData.certifications.length) {
      suggestions.push("Include at least one certification")
      flags.push("No certifications")
    }

    const explanation = `Moderate transparency. Found ${flags.length} issues.`

    return { explanation, suggestions, flags }
  }


  const handleSubmit = async () => {
    const aiData = generateAISuggestions();
    console.log("Ai suggs:", aiData);

    const newProduct = {
      productName: formData.name,
      category: formData.category,
      description: formData.description,
      ingredients: formData.ingredients,
      certifications: formData.certifications,
      score: Math.floor(50 + Math.random() * 50), // mock AI score
      status: "Pending",
      ...aiData, // explanation, suggestions, flags
    }

    // Send to API
    const response = await fetch("/api/AddProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })

    const data = await response.json()
    if (data.success) {
      alert("Product added with AI suggestions!")
    } else {
      alert("Failed to add product")
    }
  }



  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const mockAIResponse = generateAISuggestions()

  return (
    <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-700 p-6 rounded shadow space-y-6 text-gray-100">
      <h2 className="text-2xl font-bold">Add Product</h2>

      {/* Progress Bar */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 rounded ${
              s <= step ? "bg-green-500" : "bg-gray-700"
            }`}
          ></div>
        ))}
      </div>
      {/* Step Indicators */}
      <div className="flex justify-between mb-6">
        {["Basic Info", "Ingredients", "Certifications", "Review"].map(
          (label, i) => (
            <div
              key={i}
              className={`flex-1 text-center text-sm ${
                step === i + 1 ? "text-green-400 font-bold" : "text-gray-400"
              }`}
            >
              {label}
            </div>
          )
        )}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div>
          <label className="block mb-2">Product Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange(e, "name")}
            className="w-full p-2 mb-4 bg-slate-800 border border-slate-600 rounded"
          />

          <label className="block mb-2">Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => handleChange(e, "category")}
            className="w-full p-2 mb-4 bg-slate-800 border border-slate-600 rounded"
          />

          <label className="block mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange(e, "description")}
            className="w-full p-2 mb-4 bg-slate-800 border border-slate-600 rounded"
          />
        </div>
      )}

      {/* Step 2: Ingredients */}
      {step === 2 && (
        <div>
          <label className="block mb-4">Ingredients</label>
          {formData.ingredients.map((ing, i) => (
            <input
              key={i}
              type="text"
              value={ing}
              onChange={(e) => handleListChange(i, e.target.value, "ingredients")}
              className="w-full p-2 mb-2 bg-slate-800 border border-slate-600 rounded"
            />
          ))}
          <button
            type="button"
            onClick={() => addListItem("ingredients")}
            className="mt-2 px-3 py-1 bg-blue-500 rounded text-black"
          >
            + Add Ingredient
          </button>
        </div>
      )}

      {/* Step 3: Certifications */}
      {step === 3 && (
        <div>
          <label className="block mb-4">Certifications</label>
          {formData.certifications.map((cert, i) => (
            <input
              key={i}
              type="text"
              value={cert}
              onChange={(e) => handleListChange(i, e.target.value, "certifications")}
              className="w-full p-2 mb-2 bg-slate-800 border border-slate-600 rounded"
            />
          ))}
          <button
            type="button"
            onClick={() => addListItem("certifications")}
            className="mt-2 px-3 py-1 bg-blue-500 rounded text-black"
          >
            + Add Certification
          </button>
        </div>
      )}

      {/* Step 4: Review & AI Feedback */}
      {step === 4 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Review Submission</h3>
          <p><b>Name:</b> {formData.name}</p>
          <p><b>Category:</b> {formData.category}</p>
          <p><b>Description:</b> {formData.description}</p>
          <p><b>Ingredients:</b> {formData.ingredients.join(", ")}</p>
          <p><b>Certifications:</b> {formData.certifications.join(", ")}</p>

          <div className="mt-6 bg-slate-800 p-4 rounded">
            <h3 className="font-semibold mb-2">AI Feedback</h3>
            <p className="text-gray-400 mb-2">{mockAIResponse.explanation}</p>
            <ul className="list-disc list-inside text-gray-300 mb-2">
              {mockAIResponse.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <div className="flex gap-2">
              {mockAIResponse.flags.map((f, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm bg-red-500 text-black"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
          >
            Back
          </button>
        )}
        {step < 4 ? (
          <button
            type="button"
            onClick={nextStep}
            className="ml-auto px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="ml-auto px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default AddProductForm;
