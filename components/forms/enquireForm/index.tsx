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

const years = ["Any year", "2025", "2026", "2027", "2028"];

const budgets = [
  "Select your budget (per pax.)",
  "Less than ₹ 75,000",
  "₹ 75,000 - ₹ 1,00,000",
  "₹ 1,00,000 - ₹ 1,50,000",
  "₹ 1,50,000 - ₹ 2,00,000",
  "₹ 2,00,000 - ₹ 2,50,000",
  "₹ 2,50,000 +",
];

const availabilities = ["Any time", "Morning", "Afternoon", "Evening"];

export default function EnquireNow() {
  const destinations = localStorage.getItem('destinations') ? JSON.parse(localStorage.getItem('destinations') || '[]') : [];
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
      className="flex flex-col p-6 w-full md:w-1/2 mx-auto enquire-form items-left text-theme-primary-dark"
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
      <div className="flex flex-col gap-2 mb-8">
        <div className="w-full">
          <label
            id="destinationLabel"
            className="block font-bold test-white mb-2 text-lg"
          >
            Where would you like to go?
          </label>
          <select
            name="destination"
            className="border rounded px-3 py-2 w-full"
            value={details.destination}
            onChange={(e) =>
              setDetails({ ...details, destination: e.target.value })
            }
          >
            {destinations.map((d: { destinationHeading: string }) => (
              <option key={d.destinationHeading} value={d.destinationHeading} className="h-[50vh]">
                {d.destinationHeading}
              </option>
            ))}
            <option key={'other'} value={'other'} className="h-[50vh]">
              Other
            </option>
          </select>
          {/* <input
            name="destination"
            className="border rounded px-3 py-2 w-full"
            placeholder="Destination *"
            value={details.destination}
            onChange={(e) =>
              setDetails({ ...details, destination: e.target.value })
            }
            required
          /> */}
        </div>
        <div className="w-full">
          <label className="block font-bold test-white mb-2 text-lg">
            Guests
          </label>
          <div className="flex items-center gap-6">
            <div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="border rounded-full cursor-pointer h-8 w-8 bg-theme-primary-dark text-white hover:bg-theme-primary-light font-semibold"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                >
                  -
                </button>
                <span>{adults}</span>
                <button
                  type="button"
                  className="border rounded-full cursor-pointer h-8 w-8 bg-theme-primary-dark  text-white hover:bg-theme-primary-light font-semibold"
                  onClick={() => setAdults(adults + 1)}
                >
                  +
                </button>
              </div>
              <span className="block text-xs text-theme-primary mt-1">
                Adults (age 15+)
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="border rounded-full cursor-pointer h-8 w-8 bg-theme-primary-dark text-white hover:bg-theme-primary-light font-semibold"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                >
                  -
                </button>
                <span>{children}</span>
                <button
                  type="button"
                  className="border rounded-full cursor-pointer h-8 w-8 bg-theme-primary-dark text-white hover:bg-theme-primary-light font-semibold"
                  onClick={() => setChildren(children + 1)}
                >
                  +
                </button>
              </div>
              <span className="block text-xs text-theme-primary mt-1">
                Children (age 0-15)
              </span>
            </div>
          </div>
        </div>
        <div className="w-full">
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
        <div className="w-full">
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
      <div className="-mx-8 px-8 py-6 mb-8">
        <h2 className="text-2xl font-bold test-white mb-2">Your Details</h2>
        <p className="mb-6 text-theme-primary">
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
            <select className="border rounded-l px-2 py-2  text-theme-primary">
              <option>+91</option>
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
                  className="accent-theme-primary"
                />
                Email
              </label>
              <label className="flex items-center gap-1">
                <input
                  name="followUpPhone"
                  type="checkbox"
                  checked={followUp.phone}
                  onChange={() => handleFollowUpChange("phone")}
                  className="accent-theme-primary"
                />
                Phone Call
              </label>
              <label className="flex items-center gap-1">
                <input
                  name="followUpText"
                  type="checkbox"
                  checked={followUp.text}
                  onChange={() => handleFollowUpChange("text")}
                  className="accent-theme-primary"
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
        <p className="mb-2 text-theme-primary">
          Please share your ideas and initial plans for your trip below so our
          travel specialists can help you bring them to life.
        </p>
        <textarea
          className="border rounded px-3 py-2 w-full h-32 resize-vertical"
          name="message"
          maxLength={1000}
          placeholder="Hotels, experiences or anything else that you have though off...."
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
          className="text-white font-bold px-8 py-3 rounded transition-colors bg-theme-primary"
        >
          Submit Form
        </button>
        {state?.message && (
          <div
            className={`text-sm px-4 py-2 ${state.message.includes("successfully") ||
              state.message.includes("Thank you")
              ? "text-green-800"
              : "text-red-800"
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
