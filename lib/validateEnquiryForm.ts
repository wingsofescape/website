type EnquiryValidationInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dates: string;
  budget: string;
};

export function validateEnquiryForm(fields: EnquiryValidationInput): string | null {
  if (
    !fields.firstName.trim() ||
    !fields.lastName.trim() ||
    !fields.email.trim() ||
    !fields.phone.trim()
  ) {
    return "Please fill in all required fields (First name, Last name, Email, Phone, Dates).";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    return "Please enter a valid email address.";
  }

  let parsedDates: unknown;
  try {
    parsedDates = JSON.parse(fields.dates);
  } catch {
    parsedDates = null;
  }

  if (
    !Array.isArray(parsedDates) ||
    !parsedDates.some(
      (date) => {
        if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          return false;
        }

        const parsedDate = new Date(`${date}T00:00:00.000Z`);
        return (
          !Number.isNaN(parsedDate.getTime()) &&
          parsedDate.toISOString().slice(0, 10) === date
        );
      },
    )
  ) {
    return "Please fill in all required fields (First name, Last name, Email, Phone, Dates).";
  }

  if (
    !fields.budget ||
    fields.budget === "Select your budget *" ||
    fields.budget === "Select your budget (per pax.)"
  ) {
    return "Please select your budget.";
  }

  return null;
}
