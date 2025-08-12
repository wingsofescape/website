/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/db/prisma";
// Adjust path as needed

export async function submitFormData(prevState: any, formData: FormData) {
  // Extract all form fields
  const formFields = {
    firstName: formData.get("firstName")?.toString() || "",
    lastName: formData.get("lastName")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    destination: formData.get("destination")?.toString() || "",
    month: formData.get("month")?.toString() || "",
    year: formData.get("year")?.toString() || "",
    budget: formData.get("budget")?.toString() || "",
    availability: formData.get("availability")?.toString() || "",
    message: formData.get("message")?.toString() || "",
    adults: formData.get("adults")?.toString() || "2",
    children: formData.get("children")?.toString() || "0",
    followUpEmail: formData.get("followUpEmail") === "on",
    followUpPhone: formData.get("followUpPhone") === "on",
    followUpText: formData.get("followUpText") === "on",
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
    // Here you would save to database
    await prisma.userQuery.create({
      data: {
        email: formFields.email,
        name: `${formFields.firstName} ${formFields.lastName}`,
        phoneNumber: formFields.phone,
        queryDestination: formFields.destination,
        numberOfDays: 10,
        address: "Test Address", // Placeholder, replace with actual field if needed
        // Add other fields as needed
      },
    });

    return {
      message:
        "Thank you! Your enquiry has been submitted successfully. We'll be in touch soon.",
    };
  } catch (error) {
    console.error("Error saving data:", error);
    return { message: "Failed to submit your enquiry. Please try again." };
  }
}
