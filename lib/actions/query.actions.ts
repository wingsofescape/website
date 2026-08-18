/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { Resend } from 'resend';

import prisma from "@/db/prisma";
// Adjust path as needed

export async function submitFormData(prevState: any, formData: FormData) {
  const resend = new Resend(process.env.RESEND_KEY);
  // Extract all form fields
  const formFields = {
    firstName: formData.get("firstName")?.toString() || "",
    lastName: formData.get("lastName")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    destination: formData.get("destination")?.toString() || "",
    dates: formData.get("dates")?.toString() || "",
    budget: formData.get("budget")?.toString() || "",
    availability: formData.get("availability")?.toString() || "",
    message: formData.get("message")?.toString() || "",
    adults: formData.get("adults")?.toString() || "2",
    children: formData.get("children")?.toString() || "0",
    // nested followUp JSON (optional)
    followUp: formData.get("followUp"),
  };

  // Basic validation
  if (
    !formFields.firstName ||
    !formFields.lastName ||
    !formFields.email ||
    !formFields.phone
  ) {
    return {
      message:
        "Please fill in all required fields (First name, Last name, Email, Phone).",
    };
  }

  if (formFields.budget === "Select your budget *") {
    return {
      message: "Please select your budget.",
    };
  }

  try {
    // Simplified dates parsing: expect JSON array of YYYY-MM-DD strings
    const raw = formFields.dates || "[]";
    let parsedDates: string[] = [];
    try {
      const maybe = JSON.parse(raw);
      if (Array.isArray(maybe)) {
        parsedDates = maybe.filter((d) => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d));
      }
    } catch (e) {
      parsedDates = [];
      console.log("Failed to parse dates:", e);
    }


    // Save to database (dates stored as JSON string)
    await prisma.userQuery.create({
      data: {
        email: formFields.email,
        name: `${formFields.firstName} ${formFields.lastName}`,
        phoneNumber: formFields.phone,
        queryDestination: formFields.destination,
        message: formFields.message,
        budget: formFields.budget,
        dates: JSON.stringify(parsedDates || []),
      },
    });

    // ensure email body contains normalized dates array
    try {

      const { data, error } = await resend.emails.send({
        from: 'bookings@wingsofescape.com',
        to: 'wingsofescape@gmail.com',
        subject: 'New Enquiry Submitted',
        html: `<h1>New Enquiry Submitted</h1>
    <pre>${JSON.stringify(formFields, null, 2)}</pre>`,
        text: `A New Enquiry have been Submitted  ${JSON.stringify(formFields, null, 2)} `,
      });
      if (error) {
        console.error("Resend Error Object:", error);
      } else {
        console.log("Resend Success Data:", data); // Check for an ID
      }
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }

    return {
      message:
        "Thank you! Your enquiry has been submitted successfully. We'll be in touch soon.",
    };
  } catch (error) {
    console.error("Error saving data:", error);
    return { message: "Failed to submit your enquiry. Please try again." };
  }
}
