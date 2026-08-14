"use client";
import { submitFormData } from "@/lib/actions/query.actions";
import React, { useState, useActionState, useEffect } from "react";
import Calendar from 'react-calendar';
import '../../../app/global.css';
import 'react-calendar/dist/Calendar.css';
import { LooseValue } from "react-calendar/dist/shared/types.js";

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
  const [destinations, setDestinations] = useState<{ destinationHeading: string, slug: string }[]>([]);

  // Load destinations from localStorage on client mount
  useEffect(() => {
    const stored = localStorage.getItem('destinations');
    setDestinations(stored ? JSON.parse(stored) : []);
  }, []);


  const [form, setForm] = useState({
    // guest details
    adults: 2,
    children: 0,
    // follow up preferences
    followUp: { email: true, phone: true, text: true },
    // travel
    dates: [] as Date[],
    flightsBooked: 'No',
    destination: "Other",
    // personal
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    // preferences
    budget: "Select your budget *",
    availability: "Any time",
    message: "",
  });

  const formatDateOnly = (d: Date | string | undefined | null) => {
    if (!d) return null;
    const date = typeof d === "string" ? new Date(d) : d;
    // use local date parts to avoid timezone shifts
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [state, formAction] = useActionState(submitFormData, { message: "" });

  const handleFollowUpChange = (type: keyof typeof form.followUp) => {
    setForm((prev) => ({ ...prev, followUp: { ...prev.followUp, [type]: !prev.followUp[type] } }));
  };

  return (
    <form
      className="flex flex-col p-6 w-full md:w-1/2 mx-auto enquire-form items-left text-theme-primary-dark"
      action={formAction}
    >
      {/* Hidden inputs for state values (keeps form action payload consistent) */}
      <input type="hidden" name="adults" value={String(form.adults)} />
      <input type="hidden" name="children" value={String(form.children)} />
      <input type="hidden" name="budget" value={form.budget} />
      <input type="hidden" name="availability" value={form.availability} />
      <input type="hidden" name="message" value={form.message} />
      <input type="hidden" name="flightsBooked" value={String(form.flightsBooked)} />
      <input
        type="hidden"
        name="dates"
        value={JSON.stringify(
          (form.dates || []).map((d) => formatDateOnly(d) || null),
        )}
      />

      {/* Top Row */}
      <div className="flex flex-col gap-8 mb-8">
        <h2 className="text-2xl font-bold test-white mb-2">Destination Details</h2>
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
            value={form.destination}
            onChange={(e) => setForm((p) => ({ ...p, destination: e.target.value }))}
          >
            {destinations.map((d: { destinationHeading: string }) => (
              <option key={d.destinationHeading} value={d.destinationHeading} className="h-[50vh]">
                {d.destinationHeading}
              </option>
            ))}
            <option key={'other'} value={'other'} className="h-[50vh]">Other</option>
          </select>
        </div>
        <div className="w-full">
          <label className="block font-bold test-white mb-2 text-lg">
            Guests Count
          </label>
          <div className="flex items-center gap-6">
            <div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="border rounded-full cursor-pointer h-8 w-8 bg-theme-primary-dark text-white hover:bg-theme-primary-light font-semibold"
                  onClick={() => setForm((p) => ({ ...p, adults: Math.max(1, p.adults - 1) }))}
                >
                  -
                </button>
                <span>{form.adults}</span>
                <button
                  type="button"
                  className="border rounded-full cursor-pointer h-8 w-8 bg-theme-primary-dark  text-white hover:bg-theme-primary-light font-semibold"
                  onClick={() => setForm((p) => ({ ...p, adults: p.adults + 1 }))}
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
                  onClick={() => setForm((p) => ({ ...p, children: Math.max(0, p.children - 1) }))}
                >
                  -
                </button>
                <span>{form.children}</span>
                <button
                  type="button"
                  className="border rounded-full cursor-pointer h-8 w-8 bg-theme-primary-dark text-white hover:bg-theme-primary-light font-semibold"
                  onClick={() => setForm((p) => ({ ...p, children: p.children + 1 }))}
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
            When are you planning to travel? *
          </label>
          <div className="flex gap-2">
            <Calendar onChange={(val) => setForm((form) => ({ ...form, dates: val as Date[] }))} value={form.dates as LooseValue} selectRange className="h-fit w-fit" />
          </div>
        </div>
        <div className="w-full">
          <label className="block font-bold test-white mb-2 text-lg">
            How much are you looking to spend? *
          </label>
          <select
            className="w-full border rounded px-3 py-2"
            name="budget"
            value={form.budget}
            onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
          >
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* FLights details section */}
      <div>
        <h2 className="text-2xl font-bold test-white mb-2">Flight Details</h2>
        <p className="mb-2 text-theme-primary">
          Are your flights already booked?
        </p>

        <input
          type="checkbox"
          name="flightsBooked"
          checked={form.flightsBooked === 'Yes'}
          onChange={() => setForm((p) => ({ ...p, flightsBooked: p.flightsBooked === 'Yes' ? 'No' : 'Yes' }))}
          className="accent-theme-primary"
        />
        <label className="ml-2 text-theme-primary">Yes, my flights are booked</label>
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
            value={form.firstName}
            onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
          // required
          />
          <input
            name="lastName"
            className="border rounded px-3 py-2"
            placeholder="Last name *"
            value={form.lastName}
            onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
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
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              // required
              type="tel"
            />
          </div>
          <input
            name="email"
            className="border rounded px-3 py-2"
            placeholder="Email address *"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
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
                  checked={form.followUp.email}
                  onChange={() => handleFollowUpChange("email")}
                  className="accent-theme-primary"
                />
                Email
              </label>
              <label className="flex items-center gap-1">
                <input
                  name="followUpPhone"
                  type="checkbox"
                  checked={form.followUp.phone}
                  onChange={() => handleFollowUpChange("phone")}
                  className="accent-theme-primary"
                />
                Phone Call
              </label>
              <label className="flex items-center gap-1">
                <input
                  name="followUpText"
                  type="checkbox"
                  checked={form.followUp.text}
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
              value={form.availability}
              onChange={(e) => setForm((p) => ({ ...p, availability: e.target.value }))}
            >
              {availabilities.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
            <div className="text-xs text-gray-600 mt-1">
              Our team will contact you during office hours.
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
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
        />
        <div className="text-xs text-gray-600 mt-1">
          {form.message.length} / 1000 characters
        </div>
      </div>
      {/* Submit button could go here */}

      <div className="mt-8 flex flex-col md:flex-row justify-start items-start gap-4">
        <div className="flex gap-3">

          <button
            type="submit"
            className="text-white font-bold px-8 py-3 rounded transition-colors bg-theme-primary"
          >
            Submit Form
          </button>
        </div>
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
