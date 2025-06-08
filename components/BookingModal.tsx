"use client";

import { useState, useRef } from "react";
import { X, ArrowLeft, MapPin, Clock, User, Calendar as CalendarIconLucide, Loader2 } from "lucide-react";
import Image from "next/image";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Toaster, toast } from "react-hot-toast";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  pestType: string;
  propertyType: string;
  businessInfo: string;
  pestInfo: string;
  address: string;
  gateCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedDate: Date | null;
  selectedTime: string;
}

const pestTypes = ["Ants", "Bed Bugs", "Cockroaches", "Rodents","Not Sure", "Other", ];

// Updated timeSlots: 10 AM to 9 PM, hourly
const allAvailableTimes = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    pestType: "",
    propertyType: "",
    businessInfo: "",
    pestInfo: "",
    address: "",
    gateCode: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    selectedDate: null,
    selectedTime: "",
  });
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }>({});

  const step2Ref = useRef<HTMLDivElement | null>(null);

  const handleDateChange = (date: Date | Date[] | null) => {
    if (date && !Array.isArray(date)) {
      setFormData((prev) => ({ ...prev, selectedDate: date, selectedTime: "" }));
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | Date | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for the field being changed if it's one of the validated fields in step 4
    if (["firstName", "lastName", "email", "phone"].includes(field as string)) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Validation handlers for Step 4 fields onBlur
  const validateAndSetError = (field: keyof typeof errors, value: string, message: string, condition: boolean) => {
    if (condition) {
      setErrors((prev) => ({ ...prev, [field]: message }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFirstNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateAndSetError("firstName", e.target.value, "First Name is required.", !e.target.value.trim());
  };

  const handleLastNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateAndSetError("lastName", e.target.value, "Last Name is required.", !e.target.value.trim());
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const emailValue = e.target.value.trim();
    if (!emailValue) {
      setErrors((prev) => ({ ...prev, email: "Email is required." }));
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address." }));
    } else {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateAndSetError("phone", e.target.value, "Mobile Phone is required.", !e.target.value.trim());
  };

  const nextStep = () => {
    if (step < 7) {
      setStep(step + 1);
      if (step === 1 || step === 2 || step === 3 || step === 4 || step === 5 || step === 6) {
        setTimeout(() => {
          const scrollableContent = document.querySelector(".overflow-y-auto");
          if (scrollableContent) {
            scrollableContent.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 100);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const payload = {
      ...formData,
      selectedDate: formData.selectedDate ? formData.selectedDate.toISOString().split("T")[0] : null,
    };

    try {
      const response = await fetch("/api/send-booking-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStep(7);
      } else {
        const errorData = await response.json();
        console.error("Failed to send booking email:", response.status, errorData.message);
        toast.error(errorData.message || "Could not submit your booking. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setFormData({
      pestType: "",
      propertyType: "",
      businessInfo: "",
      pestInfo: "",
      address: "",
      gateCode: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      selectedDate: null,
      selectedTime: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  const formatDateForDisplay = (date: Date | null): string => {
    if (!date) return "Date TBD";
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:justify-end justify-center pointer-events-none md:pr-2 pr-0 rtl:p-0">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white shadow-xl w-full md:max-w-[363px] h-[70vh] max-h-[550px] flex flex-col overflow-hidden pointer-events-auto mb-16 md:mb-20 mb-0 md:mr-0 mr-0 rtl:ml-0 rtl:mr-6 md:rtl:mr-6 md:rounded-lg rounded-t-lg">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-3 border-b min-h-20 flex-shrink-0">
          {step > 1 && step < 7 ? (
            <button onClick={prevStep} className="flex items-center text-gray-600 hover:text-pest-red p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span className="text-sm">Back</span>
            </button>
          ) : (
            <div className="flex items-center">
              <Image src="/images/logo-u661-1.png" alt="1 Stop Pest Control Logo" width={100} height={42} className="h-16 w-auto" />
            </div>
          )}
          <button onClick={resetAndClose} className="text-gray-500 hover:text-pest-red p-1 rounded-md hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        {/* Scrollable Content Area */}
        <div className="overflow-y-auto flex-grow">
          {step === 1 && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3">How Can We Help You?</h2>
              <div className="mb-6">
                <p className="text-gray-700 mb-4">What type of pests are you having problems with?</p>
                <div className="space-y-2">
                  {pestTypes.map((pest) => (
                    <label key={pest} className="flex items-center border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="pestType" value={pest} checked={formData.pestType === pest} onChange={(e) => handleInputChange("pestType", e.target.value)} className="sr-only" />
                      <div className={`w-full p-2 rounded ${formData.pestType === pest ? "bg-pest-red text-white" : "text-gray-700"}`}>
                        {pest}
                        {formData.pestType === pest && <span className="float-right">✓</span>}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Are you in a residential or commercial property?</h3>
                <div className="space-y-2">
                  {["Residential", "Commercial"].map((type) => (
                    <label key={type} className="flex items-center border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="propertyType" value={type} checked={formData.propertyType === type} onChange={(e) => handleInputChange("propertyType", e.target.value)} className="sr-only" />
                      <div className={`w-full p-2 rounded ${formData.propertyType === type ? "bg-pest-red text-white" : "text-gray-700"}`}>
                        {type}
                        {formData.propertyType === type && <span className="float-right">✓</span>}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div ref={step2Ref} className="p-6 step-2-content">
              <h3 className="text-xl font-bold mb-4">Tell us more about your business and facility.</h3>
              <textarea value={formData.businessInfo} onChange={(e) => handleInputChange("businessInfo", e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" rows={4} maxLength={250} placeholder="Tell us more about your business and facility." />
              <div className="text-right text-sm text-gray-500 mt-1 mb-4">{formData.businessInfo.length} / 250</div>

              <h3 className="text-xl font-bold mb-4">Tell us more about the pest.</h3>
              <textarea value={formData.pestInfo} onChange={(e) => handleInputChange("pestInfo", e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" rows={4} maxLength={250} placeholder="Tell us more about the pest.*" />
              <div className="text-right text-sm text-gray-500 mt-1">{formData.pestInfo.length} / 250</div>
            </div>
          )}

          {step === 3 && (
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">What's Your Address?</h3>
              <div className="mb-6">
                <div className="relative">
                  <input type="text" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} className="w-full p-3 pr-10 border border-gray-300 rounded-lg" placeholder="Type your address" />
                  <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Is This Correct?</h3>
                <textarea value={formData.gateCode} onChange={(e) => handleInputChange("gateCode", e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" rows={3} maxLength={250} placeholder="Is there a gate code or instructions for when we get there?" />
                <div className="text-right text-sm text-gray-500 mt-1">{formData.gateCode.length} / 250</div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Who Should We Contact?</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <input type="text" value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} onBlur={handleFirstNameBlur} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="First Name*" required />
                  {errors.firstName && <p className="text-pest-red text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <input type="text" value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} onBlur={handleLastNameBlur} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Last Name*" required />
                  {errors.lastName && <p className="text-pest-red text-xs mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <input type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} onBlur={handleEmailBlur} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Email Address*" required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" />
                  {errors.email && <p className="text-pest-red text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <input type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} onBlur={handlePhoneBlur} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Mobile Phone*" required />
                  {errors.phone && <p className="text-pest-red text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  By submitting, you agree to receive text messages from Above and Beyond Pest Control at the number provided, including those related to your inquiry, follow-ups, and review requests, via automated technology. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency may vary. Reply STOP to cancel or HELP for assistance. <span className="text-pest-red underline cursor-pointer">Acceptable Use Policy</span>
                </p>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="p-6 bg-white text-gray-800">
              <h2 className="text-2xl font-bold mb-6 text-center">When Do You Need Service?</h2>
              <div className="mb-6 react-calendar-container">
                <Calendar onChange={(value) => handleDateChange(value as Date | Date[] | null)} value={formData.selectedDate} minDate={new Date()} className="minimal-calendar" prev2Label={null} next2Label={null} view="month" />
              </div>
              <div className="mb-6 relative custom-dropdown-container">
                <label className="block text-gray-700 text-sm font-bold mb-2">Select Time:</label>
                <select value={formData.selectedTime} onChange={(e) => handleInputChange("selectedTime", e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg  bg-white text-gray-800 appearance-none pr-10" disabled={!formData.selectedDate}>
                  <option value="" disabled className="text-gray-400">
                    -- Select a time --
                  </option>
                  {allAvailableTimes.map((time) => (
                    <option key={time} value={time} className="text-gray-800 bg-white hover:bg-pest-red/10">
                      {time}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-3 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-center">Click Send to Request Your Appointment</h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 shadow-md">
                <h3 className="font-semibold mb-3 text-center">Appointment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Pest Type:</span>
                    </span>
                    <span>{formData.pestType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Duration:</span>
                    </span>
                    <span>1 hour</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <CalendarIconLucide className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Date & Time:</span>
                    </span>
                    <span>
                      {formatDateForDisplay(formData.selectedDate)} - {formData.selectedTime || "Time TBD"}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                      <span className="font-medium">Address:</span>
                    </span>
                    <div>{formData.address}</div>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mb-4">Please review your appointment details before sending your request.</p>
            </div>
          )}

          {step === 7 && (
            <div className="p-6 text-center">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <CalendarIconLucide className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-red-700">Thanks, {formData.firstName}!</h2>
                <p className="text-gray-600 mb-4">Your appointment request has been received!</p>
                <p className="text-sm text-gray-500">We will contact you shortly to confirm your appointment details. If you have any questions, feel free to reach out to us.</p>
              </div>
            </div>
          )}
        </div>{" "}
        {/* END Scrollable Content Area */}
        {/* Fixed Footer with Conditional Buttons */}
        {step >= 1 && step <= 7 && (
          <div className="p-6 border-t flex-shrink-0">
            {step === 1 && (
              <button onClick={nextStep} disabled={!formData.pestType || !formData.propertyType} className="w-full bg-pest-red text-white py-3 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-pest-red/90 transition-colors">
                Next
              </button>
            )}
            {step === 2 && (
              <button onClick={nextStep} disabled={!formData.businessInfo || !formData.pestInfo} className="w-full bg-pest-red text-white py-3 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-pest-red/90 transition-colors">
                Next
              </button>
            )}
            {step === 3 && (
              <button onClick={nextStep} disabled={!formData.address} className="w-full bg-pest-red text-white py-3 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-pest-red/90 transition-colors">
                Next
              </button>
            )}
            {step === 4 &&
              (() => {
                const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email);
                const isDisabled = !formData.firstName || !formData.lastName || !formData.email || !isEmailValid || !formData.phone;
                return (
                  <button onClick={nextStep} disabled={isDisabled} className="w-full bg-pest-red text-white py-3 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-pest-red/90 transition-colors">
                    Next
                  </button>
                );
              })()}
            {step === 5 && (
              <button onClick={nextStep} disabled={!formData.selectedDate || !formData.selectedTime} className="w-full bg-pest-red text-white py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed hover:bg-pest-red/90 transition-colors">
                Next
              </button>
            )}
            {step === 6 && (
              <button onClick={handleSubmit} className="w-full bg-pest-red text-white py-3 rounded-lg font-semibold hover:bg-pest-red/90 transition-colors flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Confirm & Submit"
                )}
              </button>
            )}
            {step === 7 && (
              <button onClick={resetAndClose} className="w-full border border-pest-red text-pest-red py-3 rounded-lg font-semibold hover:bg-pest-red hover:text-white transition-colors">
                Close
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Updated calendarStyles and added custom dropdown styles
const calendarAndDropdownStyles = `
.react-calendar, .react-calendar *, .react-calendar *:before, .react-calendar *:after{
padding: 2px;
}
  .react-calendar-container .minimal-calendar {
    border: 1px solid #e5e7eb; /* gray-200 */
    border-radius: 0.5rem;
    font-family: inherit;
    width: 100% !important;
    background-color: white;
    box-sizing: border-box;
  }
  .react-calendar-container .minimal-calendar .react-calendar__navigation {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    padding: 0.5rem 0.5rem;
  }
  .react-calendar-container .minimal-calendar .react-calendar__navigation button {
    color: #d32f2f; /* pest-red */
    min-width: auto;
    background: none;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.375rem 0.625rem;
    border-radius: 0.375rem;
    line-height: 1;
  }
  .react-calendar-container .minimal-calendar .react-calendar__navigation button:hover,
  .react-calendar-container .minimal-calendar .react-calendar__navigation button:focus {
    background-color: #fdecea; /* Lighter red for hover */
  }
  .react-calendar-container .minimal-calendar .react-calendar__navigation__label {
    font-weight: bold;
    color: #d32f2f; /* pest-red for month/year */
    flex-grow: 1 !important;
    text-align: center;
    font-size: 1rem;
    pointer-events: none;
  }
  .react-calendar-container .minimal-calendar .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: 600;
    color: #d32f2f; /* pest-red for weekday header */
    font-size: 0.75rem;
    text-transform: uppercase;
  }
  .react-calendar-container .minimal-calendar .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em 0.25em;
  }
  .react-calendar-container .minimal-calendar .react-calendar__month-view__weekdays__weekday abbr[title] {
    text-decoration: none;
    font-weight: 600;
    cursor: default;
  }
  .react-calendar-container .minimal-calendar .react-calendar__month-view__days__day--neighboringMonth {
    color: #9ca3af; /* gray-400 for other month days */
    opacity: 0.7;
  }
  .react-calendar-container .minimal-calendar .react-calendar__tile {
    background: none;
    border: none;
    color: #374151; /* gray-700 */
    border-radius: 0.375rem;
    font-size: 0.875rem; 
    /* Padding is tricky with aspect-ratio, rely on flex centering and tile size */
    /* padding: 0.25em; */ /* Reduced padding to give numbers more space from edge */
    transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1; 
    /* Ensure text doesn't cause overflow if too large, might need to adjust font-size */
    overflow: hidden; 
    text-align: center;
    line-height: 1; /* Helps with vertical alignment of numbers */
  }
  .react-calendar-container .minimal-calendar .react-calendar__tile:disabled {
    background-color: #f9fafb; /* gray-50 */
    color: #9ca3af; /* gray-400 */
    cursor: not-allowed;
  }
  .react-calendar-container .minimal-calendar .react-calendar__tile:enabled:hover,
  .react-calendar-container .minimal-calendar .react-calendar__tile:enabled:focus {
    background-color: #fdecea; /* Lighter red for hover */
    color: #d32f2f; /* pest-red */
    font-weight: 600;
  }
  .react-calendar-container .minimal-calendar .react-calendar__tile--now {
    background: transparent;
    font-weight: 700;
    color: #d32f2f;
    border: 1px solid #d32f2f;
  }
  .react-calendar-container .minimal-calendar .react-calendar__tile--now:enabled:hover,
  .react-calendar-container .minimal-calendar .react-calendar__tile--now:enabled:focus {
    background: #fdecea;
  }
  .react-calendar-container .minimal-calendar .react-calendar__tile--active {
    background: #d32f2f !important;
    color: white !important;
    font-weight: bold;
    border: 1px solid transparent;
  }
  .react-calendar-container .minimal-calendar .react-calendar__tile--active:enabled:hover,
  .react-calendar-container .minimal-calendar .react-calendar__tile--active:enabled:focus {
    background: #b92b2b !important;
  }

  /* Custom Dropdown Styles */
  .custom-dropdown-container select {
    /* appearance: none; already set in className, but good to note */
    /* padding-right to make space for arrow is set by pr-10 on className */
  }
  .custom-dropdown-container option {
    padding: 0.5rem; /* Add padding to dropdown options for better touch targets */
  }
`;

if (typeof window !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = calendarAndDropdownStyles; // Renamed for clarity
  const existingStyleSheet = document.getElementById("custom-calendar-styles");
  if (existingStyleSheet) {
    existingStyleSheet.remove();
  }
  styleSheet.id = "custom-calendar-styles";
  document.head.appendChild(styleSheet);
}
