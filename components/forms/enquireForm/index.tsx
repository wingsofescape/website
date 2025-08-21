// EnquireNow.tsx
"use client";
import { submitFormData } from "@/lib/actions/query.actions";
import React, { useState, useActionState } from "react";
const months = [
  "Any month",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = ["Any year", "2025", "2026", "2027"];
const budgets = [
  "Select your budget *",
  "£5,000 - £10,000",
  "£10,000 - £20,000",
  "£20,000+",
];
const destinations = [
  "Other",
  "Europe",
  "Asia",
  "Africa",
  "Americas",
  "Oceania",
];
const availabilities = ["Any time", "Morning", "Afternoon", "Evening"];

export default function EnquireNow() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [followUp, setFollowUp] = useState({
    email: true,
    phone: true,
    text: true,
  });
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    destination: "Other",
    month: "Any month",
    year: "Any year",
    budget: "Select your budget *",
    availability: "Any time",
    message: "",
  });

  const [state, formAction] = useActionState(submitFormData, { message: "" });

  const handleFollowUpChange = (type: string) => {
    setFollowUp({
      ...followUp,
      [type]: !followUp[type as keyof typeof followUp],
    });
  };

  return (
    <form
      className="bg-[#f7f7f5] p-8  max-w-3xl mx-auto my-12 enquire-form"
      action={formAction}
    >
      {/* Hidden inputs for state values */}
      <input type="hidden" name="adults" value={adults} />
      <input type="hidden" name="children" value={children} />
      <input type="hidden" name="month" value={details.month} />
      <input type="hidden" name="year" value={details.year} />
      <input type="hidden" name="budget" value={details.budget} />
      <input type="hidden" name="availability" value={details.availability} />
      <input type="hidden" name="message" value={details.message} />

      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <label
            id="destinationLabel"
            className="block font-bold test-white mb-2 text-lg"
          >
            Where would you like to go?
          </label>
          <select
            name="destination"
            className="w-full border rounded px-3 py-2"
            value={details.destination}
            onChange={(e) =>
              setDetails({ ...details, destination: e.target.value })
            }
          >
            {destinations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-bold test-white mb-2 text-lg">
            Guests
          </label>
          <div className="flex items-center gap-6">
            <div>
              <span className="block text-xs text-gray-700 mb-1">
                Adults (age 15+)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="border rounded w-7 h-7"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                >
                  -
                </button>
                <span>{adults}</span>
                <button
                  type="button"
                  className="border rounded w-7 h-7"
                  onClick={() => setAdults(adults + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <span className="block text-xs text-gray-700 mb-1">
                Children (age 0-15)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="border rounded w-7 h-7"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                >
                  -
                </button>
                <span>{children}</span>
                <button
                  type="button"
                  className="border rounded w-7 h-7"
                  onClick={() => setChildren(children + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <label className="block font-bold test-white mb-2 text-lg">
            When would you like to go?
          </label>
          <div className="flex gap-2">
            <select
              className="border rounded px-3 py-2 w-1/2"
              name="month"
              value={details.month}
              onChange={(e) =>
                setDetails({ ...details, month: e.target.value })
              }
            >
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              className="border rounded px-3 py-2 w-1/2"
              name="year"
              value={details.year}
              onChange={(e) => setDetails({ ...details, year: e.target.value })}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block font-bold test-white mb-2 text-lg">
            How much are you looking to spend? *
          </label>
          <select
            className="w-full border rounded px-3 py-2"
            name="budget"
            value={details.budget}
            onChange={(e) => setDetails({ ...details, budget: e.target.value })}
          >
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Your Details */}
      <div className="bg-[#ededed] -mx-8 px-8 py-6 mb-8">
        <h2 className="text-2xl font-bold test-white mb-2">Your Details</h2>
        <p className="mb-6 text-gray-700">
          Please add a few details below and we will call you to discuss your
          plans.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <input
            name="firstName"
            className="border rounded px-3 py-2"
            placeholder="First name *"
            value={details.firstName}
            onChange={(e) =>
              setDetails({ ...details, firstName: e.target.value })
            }
            // required
          />
          <input
            name="lastName"
            className="border rounded px-3 py-2"
            placeholder="Last name *"
            value={details.lastName}
            onChange={(e) =>
              setDetails({ ...details, lastName: e.target.value })
            }
            // required
          />
          <div className="flex">
            <select className="border rounded-l px-2 py-2 bg-gray-100 text-gray-700">
              <option>+44</option>
              <option>+1</option>
              <option>+33</option>
              <option>+49</option>
              <option>+34</option>
              <option>+39</option>
              <option>+61</option>
              <option>+81</option>
              <option>+86</option>
              <option>+7</option>
              <option>+91</option>
              {/* Add more country codes as needed */}
            </select>
            <input
              name="phone"
              className="border-t border-b border-r rounded-r px-3 py-2 flex-1"
              placeholder="Phone number *"
              value={details.phone}
              onChange={(e) =>
                setDetails({ ...details, phone: e.target.value })
              }
              // required
              type="tel"
            />
          </div>
          <input
            name="email"
            className="border rounded px-3 py-2"
            placeholder="Email address *"
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            // required
            type="email"
            autoComplete=""
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">
              How should we follow up?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  name="followUpEmail"
                  type="checkbox"
                  checked={followUp.email}
                  onChange={() => handleFollowUpChange("email")}
                  className="accent-[#004236]"
                />
                Email
              </label>
              <label className="flex items-center gap-1">
                <input
                  name="followUpPhone"
                  type="checkbox"
                  checked={followUp.phone}
                  onChange={() => handleFollowUpChange("phone")}
                  className="accent-[#004236]"
                />
                Phone Call
              </label>
              <label className="flex items-center gap-1">
                <input
                  name="followUpText"
                  type="checkbox"
                  checked={followUp.text}
                  onChange={() => handleFollowUpChange("text")}
                  className="accent-[#004236]"
                />
                Text
              </label>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-2">
              When are you available?
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              name="availability"
              value={details.availability}
              onChange={(e) =>
                setDetails({ ...details, availability: e.target.value })
              }
            >
              {availabilities.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
            <div className="text-xs text-gray-600 mt-1">
              Our team will contact you during{" "}
              <a href="#" className="underline">
                office hours
              </a>
              .
            </div>
          </div>
        </div>
      </div>

      {/* Tell Us More */}
      <div>
        <h2 className="text-2xl font-bold test-white mb-2">Tell Us More</h2>
        <p className="mb-2 text-gray-700">
          Please share your ideas and initial plans for your trip below so our
          travel specialists can help you bring them to life.
        </p>
        <textarea
          className="border rounded px-3 py-2 w-full h-32 resize-vertical"
          name="message"
          maxLength={1000}
          placeholder="Have you seen any hotels you would like to stay in, or tours that you would like to experience? Do you have any set dates or room requirements? Are you unsure of where to start planning? Let our Travel Specialists know so that they can help you plan a trip of a lifetime."
          value={details.message}
          onChange={(e) => setDetails({ ...details, message: e.target.value })}
        />
        <div className="text-xs text-gray-600 mt-1">
          {details.message.length} / 1000 characters
        </div>
      </div>
      {/* Submit button could go here */}

      <div className="mt-8 flex flex-col md:flex-row justify-start items-start gap-4">
        <button
          type="submit"
          className="bg-[#004236] text-white font-bold px-8 py-3 rounded hover:bg-[#00664f] transition-colors"
        >
          Submit Form
        </button>
        {state?.message && (
          <div
            className={`text-sm px-4 py-2 rounded ${
              state.message.includes("successfully") ||
              state.message.includes("Thank you")
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {state.message}
          </div>
        )}
        <div className="text-xs text-gray-600 max-w-lg">
          By proceeding, I understand that the personal data I provide will be
          used to deal with my request in accordance with the privacy policy.
        </div>
      </div>
    </form>
  );
}
