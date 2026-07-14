/* =====================================================================
   CALLING FEEDBACK FORM — CLIENT SCRIPT
   Handles: validation, sanitization, submission, UI feedback
   ===================================================================== */

/* ---------------------------------------------------------------------
   CONFIGURATION
   Paste your deployed Google Apps Script Web App URL below.
   (See the deployment guide for how to obtain this.)
   --------------------------------------------------------------------- */
const CONFIG = {
  SCRIPT_URL: "https://script.google.com/macros/s/AKfycbxFIBVTyal4VLaVM89OeP5WJOJCdcblOOuilIf-i9NF-abdluR395fKWaPN1jN8fb24/exec",
};

/* District -> Caller Name list, sourced from Drop-Down_List.xlsx.
   Selecting a District filters the Caller Name dropdown to only show
   names from that district. If a caller's name isn't in the list, it
   can still be typed in manually and will be accepted. */
const DISTRICT_CALLER_MAP = {
  "Ahmadnagar": [
    "Mansi Suraj Salve",
    "Rina Rohidas Virkar",
    "ROHINI ASHOK KAMBLE",
    "RUPALI RAOSAHEB GAIKWAD",
    "Sushmita Baburao Jadhav",
    "Suvarna Hiraman Hiray",
    "Vaishnavi Navnath Chavhan"
  ],
  "Akola": [
    "Ashwini Tejrao Bhise",
    "Kalyani Agarkar",
    "Mamta Shamrao Ingale",
    "Meena Kiritkumar Ingale",
    "Meghali Bandu Zaskar",
    "Nisha Ambadas Wahurwagh",
    "Payal Sunil Deshmukh",
    "Pooja Gajanan Agarkar",
    "Pratidnya Milind Gawai",
    "Vijaya Dalvi"
  ],
  "Amravati": [
    "Aditi Tantarpade",
    "Anushka Khedkar",
    "Damini Kishor Narwade",
    "Gauri Haribhau Rao",
    "Gauri Shyam Tonpe",
    "Janvi Ravindra Pawar",
    "Kalpana Dinesh Dhage",
    "MADHURI PANJABRAO SABLE",
    "Manisha Surendra Chavan",
    "Pranita Hivrale",
    "Sneha Vinodrao Borkar",
    "Vishakha Bharat Naik"
  ],
  "Beed": [
    "Aditi Mohan Yede",
    "Aishwarya Ganesh Khedkar",
    "Priti Kritikumar Shete",
    "Sarthak Sunil Ghungale",
    "Shaikh Nuzefa Shaikh Sikandar"
  ],
  "Bhandara": [
    "Ashwini sukhadeo taywade",
    "Dhanshri Anil Raghorte",
    "Karishma Kushan Wanjari",
    "Payal Sahadeo Chopkar",
    "Sakshi Girish Tighare",
    "Triveni Gulab Wadibasme"
  ],
  "Buldhana": [
    "Aarti Sandip Jadhao",
    "Gayatri Ajay Panditkar",
    "Manisha Rahul Manatkar",
    "Payal Raju Lokhande"
  ],
  "Chandrapur": [
    "ACHAL PREMANAND CHIWANDE",
    "Arti Jayprakash Asutkar",
    "Madhuri Premanand Chiwande",
    "Shubhangi Ishwar Akkewar",
    "SMITA VIVEKRAO RAUT",
    "Sneha Nitin Jiwane"
  ],
  "Chatrapati Sambhaji Nagar": [
    "NIKITA NITIN SHETE",
    "NISHA RAVINDRA LOKHANDE",
    "SAKSHI CHANDRAKANT KORDE"
  ],
  "Chhatrapati Sambhaji Nagar": [
    "Ashwini Malode",
    "Bhakti Gajanan Dhage",
    "Chetna Vasantaro Patil",
    "Indrayani Vaykosh",
    "Mandakini Santosh Kharat",
    "Nandini Baban Sadavarte",
    "Nisha Sanjay Rathod",
    "Pooja Dipak Misal",
    "Pratiksha Salunke",
    "Rani Shivaji Tayade",
    "Sandhya Sanjay Jadhav",
    "Sarita Pande",
    "Soni Kadam"
  ],
  "Dhule": [
    "Ashwini Rakesh Chaudhari",
    "Chandrakala Khushalgiri Gosavi",
    "Disha Dinkar Kachave",
    "Komal Girish Nikam",
    "Madhuri Jagdish Hire",
    "Nikita Sharad Patil",
    "Nisha Manikrao Ahire",
    "Pratibha Rahul Yadav",
    "Saniya Jakir Khatik",
    "Savita Kishor Pagare",
    "Sushmita Sagar Marathe",
    "Urvashi Paras Chatre",
    "Vaishnavi Vijay More",
    "Yamini Baviskar Nitin"
  ],
  "Gadchiroli": [
    "Rupali Suraj Saosakde",
    "Sakshi Sandip Vairagade"
  ],
  "Gondia": [
    "Kajal Raju Wadhai",
    "Khushbhu Deepak Gaidhane",
    "Sakshi Santhosh Ambule",
    "SHITAL PADHURANG RAHANGDALE"
  ],
  "Hingoli": [
    "Jyoti Sarkate",
    "Kanhopatra Maroti Guhade",
    "Pallavi Santosh Khillare",
    "Pooja Sable",
    "Puja Rajkumar Jadhav",
    "Rani Vinayak Jagtap",
    "Sakhu Mahadev Sonule"
  ],
  "Jalgaon": [
    "Gita Kailas Koli",
    "Rajeshri Gajanan Patil",
    "Yamini Digambar Koli"
  ],
  "Jalna": [
    "Kanhopatra Pothore",
    "Manda Fulzade",
    "Manisha Nirmal",
    "Nikita Sathe",
    "Pooja Rathod",
    "Priti Sanjay Gajare",
    "Rutuja Pandit Jagdane",
    "Savita Babar",
    "Vaishali Pawar"
  ],
  "Kolhapur": [
    "Adarsh Sawant",
    "Ankita Mhalungekar",
    "Arati Anurag Deshmukh",
    "Arya Patil",
    "Bhumika Sopandev Patil",
    "Bismillah Sikandar Vadtangi",
    "Gouri Bhagwan Kudale",
    "Manisha Patil",
    "Mayuri Ananda Kholape",
    "Mayuri rangarao Rabade",
    "Nayan More",
    "Nayan Siddharth Kamable",
    "Nikita Gaikwad",
    "Rutuja Anil Dorkar",
    "Sakshi Vinayak Patil",
    "Saniya Tahsildar",
    "Sanskruti Sambhaji Kapase",
    "Shivani Suresh Powar",
    "Sphurti Kishor Mane",
    "Vaishnavi Sachin Sutar"
  ],
  "Latur": [
    "Bharat Harikishan Pawar",
    "Dadasaheb Rajabhau Rasal",
    "Kaushalya Bhagvan Kamble",
    "Mandakini Mahapure",
    "Muskan Mustafa Kubde",
    "Pranali Navnath Randive",
    "Pranali Rahul Dixit",
    "Reshma Navnath Kamble",
    "Siddhata Shidharth Bhise"
  ],
  "Mumbai City": [
    "Sejal Manohar Mestry"
  ],
  "Nagpur": [
    "Aastha Indrajeet Thakre",
    "Ankita Ravi Shinganjude",
    "Ayshu Ajay Paytode",
    "BHARTI ASHISH BUTE",
    "Janvi Dnyaneshwar Bawane",
    "Kirti Ravi Andhare",
    "Mamta Vilas Kawale",
    "Roshani Nilesh Kopre",
    "Seema Dhiraj Paraye",
    "Shubhangi Shukrapal Bute",
    "Snehal Dnyaneshwar Sirsat"
  ],
  "Nanded": [
    "Chetana Pandit Jadhav",
    "Maya Nivdange",
    "Pornima Bapurao Kamble",
    "Sayashila Gautam Parsode"
  ],
  "Nandurbar": [
    "Diksha Sahebrao Shinde",
    "Hemangi Dilip Baviskar",
    "Jyoti Ravindra Padvi",
    "Nirjala Pralhad Valvi",
    "Roshani Kantilal Tadvi",
    "VIBHA DINESH RAJPUT"
  ],
  "Nashik": [
    "Janhavi Suresh Pawar",
    "JAYSHRI SANGRAMSING JADHAV",
    "KANCHAN MILIND BHADANGE",
    "Kaveri Shivaji Nikam",
    "Komal Ashok Palve",
    "MAMATA DEVENDRASING PAWAR",
    "Manasi Manojkumar Malve",
    "Vaishnavi Anil Ahire"
  ],
  "Palghar": [
    "Pragati Manohar Mestry"
  ],
  "Parbhani": [
    "Aayodhya Madhavrao Garud",
    "Anjali Dilip Kamble",
    "Kshitija Rajesh Deshmukh",
    "Namrata Rajesh Shivankar",
    "Rutuja Yuvraj Ughade",
    "Sanchi Shyamsundar Kale",
    "Shital Atul Gaikwad",
    "Shradha Maroti Langote",
    "Sushma Vinit Khade",
    "Vaishali Munjaji Gaikwad"
  ],
  "Pune": [
    "Prajakta Raju Jadhav",
    "Simran Nadim Shaikh"
  ],
  "Ratnagiri": [
    "Shilpa Yesudas Patel"
  ],
  "Sangli": [
    "Amruta Balu More",
    "Anjali babaso sankaje",
    "Bhumika Vilas Kharje",
    "Gauri Subhash Patil",
    "Maithili Chandrakant Waghmare",
    "Mayuri Raosaheb Rajmane",
    "Pornima Yuvraj Kharade",
    "Sakshi Gadade",
    "Sania Sabbir Jambhalkar",
    "Smeeta Isapure",
    "Smita Sanjay Gurav",
    "Sonali Arjun Nikaji",
    "Sonam Vikas Sakate",
    "Varsha Prashant Patil"
  ],
  "Satara": [
    "Arpita Balkrushna Lohar",
    "Atharv Sachin Kachare",
    "Samruddhi Tulshidas Lohat"
  ],
  "Sindhudurg": [
    "Shreya Dhananjay Parkar"
  ],
  "Solapur": [
    "Amin Najir Khatib",
    "Apurva Chandrakant Patil",
    "Ayesha Harun Dakani",
    "Ayyub Kashim Shaikh",
    "Divya Vishal Mane",
    "Lata Vitthal Yemul",
    "Manisha Khandare",
    "Naina Deepak Jogdiya",
    "Shivganga Waghamre",
    "Shruti Rahul Surwase",
    "Shubham Waghmode",
    "Tushar Subhash Bansode",
    "Vandana Somayya Chintakin",
    "Vasudha Bandpatte"
  ],
  "Wardha": [
    "Abhilasha Subhasharao Hepat",
    "Aishwarya Shankar Mandhare",
    "Amrapali Milind Bhagat",
    "ARATI KISANAJI MADAVI",
    "Chhakuli prashant Vilayatkar",
    "Dhanshri Pavan Watkar",
    "Jaya Rambhau Khetri",
    "Payal Bharat Madavi",
    "Pranoti Ramuji Koparkar"
  ],
  "Washim": [
    "Drushti Dadarao Ghughe",
    "Jayashri Vijay Jamakar",
    "Sneha Kailash Jadhav"
  ],
  "Yavatmal": [
    "Ankita Shivankar",
    "Devangana Sadashiv Dhakulkar",
    "Kashish Devidas Kharbade",
    "Neha Ramteke",
    "Neha Shirbhate",
    "Pranjali Naukarkar",
    "Sakshi Kailas Paikrao",
    "Santoshi Marshettiwar",
    "Suhani Uttam Jadhao",
    "Tanvi Avinash Shire",
    "Vaibhav Sathe",
    "Vaishnavi Shirbhate"
  ]
};

/* MH Number must be "MH" followed by exactly 12 digits, e.g. MH161430031167 */
const MH_NUMBER_REGEX = /^MH\d{12}$/;

/* ---------------------------------------------------------------------
   DOM REFERENCES
   --------------------------------------------------------------------- */
const form = document.getElementById("feedbackForm");
const submitBtn = document.getElementById("submitBtn");
const submitLabel = submitBtn.querySelector(".btn-label");
const submitSpinner = submitBtn.querySelector(".spinner");
const resetBtn = document.getElementById("resetBtn");
const formAlert = document.getElementById("formAlert");

const successModal = document.getElementById("successModal");
const successCloseBtn = document.getElementById("successCloseBtn");
const errorModal = document.getElementById("errorModal");
const errorModalMessage = document.getElementById("errorModalMessage");
const errorCloseBtn = document.getElementById("errorCloseBtn");
const errorRetryBtn = document.getElementById("errorRetryBtn");
const errorDetails = document.getElementById("errorDetails");
const errorDetailsText = document.getElementById("errorDetailsText");

const callingDateInput = document.getElementById("callingDate");
const mhNumberInput = document.getElementById("mhNumber");
const beneficiaryNameInput = document.getElementById("beneficiaryName");
const districtInput = document.getElementById("district");
const callerNameInput = document.getElementById("callerName");
const callerNameOptionsList = document.getElementById("callerNameOptions");
const callingRemarkInput = document.getElementById("callingRemark");
const serviceVerificationSection = document.getElementById("serviceVerificationSection");

/* Fields that only matter when the call actually connected. These live inside
   the Service Verification section, which is shown/hidden based on the
   Calling Remark selected (see toggleServiceVerification below). */
const CONDITIONAL_FIELDS = [
  "appointmentGenerated",
  "screeningService",
  "medicineReceived",
  "ctService",
  "hospitalService",
  "rating",
];

let isSubmitting = false; // guards against duplicate/double submissions

/* ---------------------------------------------------------------------
   INIT
   --------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  lockCallingDateToToday();
  initStarRating();
  toggleServiceVerification(); // hidden by default until "Call Connect" is chosen
});

/* ---------------------------------------------------------------------
   CASCADING DROPDOWN: DISTRICT -> CALLER NAME
   Selecting a District repopulates the Caller Name datalist with only
   that district's callers. The Caller Name field stays a free-text input
   with suggestions, so a caller not yet in the list can still be typed in.
   --------------------------------------------------------------------- */
function populateCallerNameOptions(district) {
  callerNameOptionsList.innerHTML = "";

  const names = DISTRICT_CALLER_MAP[district] || [];
  names.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    callerNameOptionsList.appendChild(option);
  });

  if (district && names.length > 0) {
    callerNameInput.disabled = false;
    callerNameInput.placeholder = "Type to search or select caller name";
  } else if (district) {
    // District selected but no callers on file for it yet — still allow typing a new name
    callerNameInput.disabled = false;
    callerNameInput.placeholder = "No saved callers for this district — type the caller's name";
  } else {
    callerNameInput.disabled = true;
    callerNameInput.placeholder = "Select a district first";
  }
}

districtInput.addEventListener("change", () => {
  callerNameInput.value = "";
  populateCallerNameOptions(districtInput.value);
  validateField("callerName");
});

/* ---------------------------------------------------------------------
   CONDITIONAL SECTION: SERVICE VERIFICATION
   Only relevant when the call actually connected. Selecting "Call Connect"
   as the Calling Remark reveals this section and makes its fields
   required; any other remark hides it and clears/relaxes those fields.
   --------------------------------------------------------------------- */
function isCallConnected() {
  return sanitize(callingRemarkInput.value) === "Call Connect";
}

function toggleServiceVerification() {
  const shouldShow = isCallConnected();
  serviceVerificationSection.hidden = !shouldShow;

  CONDITIONAL_FIELDS.forEach((name) => {
    const input = document.getElementById(name);
    if (shouldShow) {
      input.setAttribute("required", "required");
    } else {
      input.removeAttribute("required");
      // Clear out any stale error state on fields that are no longer required
      const fieldWrapper = input.closest(".field");
      const errorEl = document.querySelector(`[data-error-for="${name}"]`);
      if (fieldWrapper) fieldWrapper.classList.remove("field--invalid");
      if (errorEl) errorEl.textContent = "";
    }
  });
}

callingRemarkInput.addEventListener("change", toggleServiceVerification);

/* ---------------------------------------------------------------------
   STAR RATING WIDGET (Bad -> Excellent color-coded picker)
   Keeps its value in sync with the hidden #rating input so the rest
   of the validation/submission code doesn't need to know it's stars.
   --------------------------------------------------------------------- */
const RATING_LABELS = { 1: "Bad", 2: "Poor", 3: "Average", 4: "Good", 5: "Excellent" };
const RATING_COLORS = {
  1: "#e0433d",
  2: "#f0932b",
  3: "#f6c93b",
  4: "#a8d94f",
  5: "#4caf50",
};

function initStarRating() {
  const container = document.getElementById("starRating");
  const hiddenInput = document.getElementById("rating");
  const label = document.getElementById("ratingLabel");
  const stars = Array.from(container.querySelectorAll(".star"));

  function paintStars(value, isPreview) {
    stars.forEach((star) => {
      const starValue = Number(star.dataset.value);
      const isOn = starValue === value;
      star.classList.toggle(isPreview ? "preview" : "active", isOn);
      if (!isPreview) star.classList.remove("preview");
      if (isPreview) star.classList.remove("active");
    });
  }

  function setRating(value) {
    hiddenInput.value = value;
    stars.forEach((star) => {
      const starValue = Number(star.dataset.value);
      star.classList.remove("preview");
      star.classList.toggle("active", starValue === value);
      star.setAttribute("aria-checked", String(starValue === value));
    });
    label.textContent = RATING_LABELS[value] || "";
    label.style.color = RATING_COLORS[value] || "var(--color-text-muted)";
    // Let the existing blur/change-based validator clear any error state
    hiddenInput.dispatchEvent(new Event("change"));
  }

  stars.forEach((star) => {
    const value = Number(star.dataset.value);

    star.addEventListener("click", () => setRating(value));

    star.addEventListener("mouseenter", () => {
      if (hiddenInput.value) return; // don't preview-override an existing selection look
      paintStars(value, true);
      label.textContent = RATING_LABELS[value];
      label.style.color = RATING_COLORS[value];
    });

    star.addEventListener("mouseleave", () => {
      if (hiddenInput.value) return;
      stars.forEach((s) => s.classList.remove("preview"));
      label.textContent = "";
    });

    // Keyboard support: Enter/Space selects the focused star
    star.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setRating(value);
      }
    });
  });
}

/* Clears the star widget back to its empty state (used on reset / after success) */
function resetStarRating() {
  const container = document.getElementById("starRating");
  const hiddenInput = document.getElementById("rating");
  const label = document.getElementById("ratingLabel");

  hiddenInput.value = "";
  container.querySelectorAll(".star").forEach((star) => {
    star.classList.remove("active", "preview");
    star.setAttribute("aria-checked", "false");
  });
  label.textContent = "";
}

/* Restrict the date picker so only today's date can be chosen */
function lockCallingDateToToday() {
  const todayStr = getTodayString();
  callingDateInput.min = todayStr;
  callingDateInput.max = todayStr;
  callingDateInput.value = todayStr; // pre-fill for convenience
}

function getTodayString() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/* ---------------------------------------------------------------------
   INPUT SANITIZATION (live, as the user types)
   --------------------------------------------------------------------- */

// MH Number: strip all whitespace and force uppercase as the user types
mhNumberInput.addEventListener("input", () => {
  mhNumberInput.value = mhNumberInput.value.replace(/\s+/g, "").toUpperCase();
});

/* Generic sanitizer applied to every text-like field right before submit.
   Trims outer whitespace and collapses internal double-spaces. */
function sanitize(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ");
}

/* ---------------------------------------------------------------------
   VALIDATION
   --------------------------------------------------------------------- */

/* Each validator returns an error message string, or "" if the field is valid */
const validators = {
  callingDate: (value) => {
    if (!value) return "Calling date is required.";
    if (value !== getTodayString()) return "Only today's date can be selected.";
    return "";
  },
  mhNumber: (value) => {
    const clean = sanitize(value).replace(/\s+/g, "");
    if (!clean) return "MH Number is required.";
    if (!MH_NUMBER_REGEX.test(clean)) {
      return "Invalid format. Expected MH followed by 12 digits (e.g. MH161430031167).";
    }
    return "";
  },
  beneficiaryName: (value) => (!sanitize(value) ? "Beneficiary name is required." : ""),
  district: (value) => (!value ? "Please select a district." : ""),
  callerName: (value) => {
    if (!sanitize(value)) return "Caller name is required.";
    if (!districtInput.value) return "Please select a district first.";
    return "";
  },
  appointmentGenerated: (value) => (isCallConnected() && !value ? "Please select an option." : ""),
  screeningService: (value) => (isCallConnected() && !value ? "Please select an option." : ""),
  medicineReceived: (value) => (isCallConnected() && !value ? "Please select an option." : ""),
  ctService: (value) => (isCallConnected() && !value ? "Please select an option." : ""),
  hospitalService: (value) => (isCallConnected() && !value ? "Please select an option." : ""),
  rating: (value) => (isCallConnected() && !value ? "Please select a rating." : ""),
  callingRemark: (value) => (!value ? "Please select a calling remark." : ""),
  communicationRemark: () => "", // optional field, no validation required
};

/* Validate a single field and update its error UI. Returns true if valid. */
function validateField(fieldName) {
  const input = document.getElementById(fieldName);
  const fieldWrapper = input.closest(".field");
  const errorEl = document.querySelector(`[data-error-for="${fieldName}"]`);
  const message = validators[fieldName](input.value);

  if (message) {
    fieldWrapper.classList.add("field--invalid");
    errorEl.textContent = message;
  } else {
    fieldWrapper.classList.remove("field--invalid");
    errorEl.textContent = "";
  }
  return !message;
}

/* Validate every field in the form. Returns true only if all are valid. */
function validateAll() {
  const fieldNames = Object.keys(validators);
  let allValid = true;
  let firstInvalidField = null;

  fieldNames.forEach((name) => {
    const valid = validateField(name);
    if (!valid && !firstInvalidField) {
      firstInvalidField = name;
    }
    allValid = allValid && valid;
  });

  if (firstInvalidField) {
    scrollToField(firstInvalidField);
  }

  return allValid;
}

/* Smoothly scroll to and focus the first invalid field */
function scrollToField(fieldName) {
  const input = document.getElementById(fieldName);
  input.closest(".field").scrollIntoView({ behavior: "smooth", block: "center" });
  input.focus({ preventScroll: true });
}

/* Re-validate a field the moment the user leaves it (better UX than only on submit) */
Object.keys(validators).forEach((name) => {
  const input = document.getElementById(name);
  input.addEventListener("blur", () => validateField(name));
  input.addEventListener("change", () => validateField(name));
});

/* ---------------------------------------------------------------------
   FORM SUBMISSION
   --------------------------------------------------------------------- */
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (isSubmitting) return; // hard stop against duplicate submissions

  hideAlert();

  if (!validateAll()) {
    showAlert("Please fix the highlighted fields before submitting.");
    return;
  }

  if (!CONFIG.SCRIPT_URL || CONFIG.SCRIPT_URL.includes("PASTE_YOUR")) {
    showAlert("The form is not yet connected to Google Sheets. Please set SCRIPT_URL in script.js.");
    return;
  }

  const payload = buildPayload();

  setSubmitting(true);
  try {
    const response = await fetch(CONFIG.SCRIPT_URL, {
      method: "POST",
      // "text/plain" avoids a CORS pre-flight request, which Apps Script
      // web apps do not handle. The server still parses this as JSON.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Server responded with HTTP ${response.status}. Check that the Web App is deployed with access "Anyone".`);
    }

    // Apps Script sometimes returns an HTML login/redirect page instead of
    // JSON if the deployment isn't public or the URL is wrong. Guard against
    // that so we surface a useful message instead of a JSON parse crash.
    const rawText = await response.text();
    let result;
    try {
      result = JSON.parse(rawText);
    } catch (parseErr) {
      throw new Error(
        "Server did not return valid JSON. This usually means the SCRIPT_URL is wrong, the deployment isn't set to \"Anyone\" access, or it needs to be redeployed as a new version. Raw response: " +
          rawText.slice(0, 200)
      );
    }

    if (result.status === "success") {
      form.reset();
      lockCallingDateToToday();
      resetStarRating();
      toggleServiceVerification();
      populateCallerNameOptions(""); // re-lock Caller Name until a District is picked again
      clearAllFieldErrors();
      showSuccessModal();
    } else {
      showErrorModal(result.message || "The server could not save your submission.");
    }
  } catch (err) {
    console.error("Form submission error:", err);
    showErrorModal(
      "Could not reach the server. Please check your internet connection and try again.",
      err.message
    );
  } finally {
    setSubmitting(false);
  }
});

/* Collect and sanitize all field values into the payload sent to the backend */
function buildPayload() {
  const connected = isCallConnected();
  return {
    callingDate: callingDateInput.value,
    mhNumber: sanitize(mhNumberInput.value).replace(/\s+/g, ""),
    beneficiaryName: sanitize(beneficiaryNameInput.value),
    district: districtInput.value,
    callerName: sanitize(callerNameInput.value),
    callingRemark: sanitize(callingRemarkInput.value),
    callConnected: connected, // true only when Calling Remark === "Call Connect"
    // Service verification fields only apply when the call connected; sent as
    // empty strings otherwise since they weren't shown/collected.
    appointmentGenerated: connected ? document.getElementById("appointmentGenerated").value : "",
    screeningService: connected ? document.getElementById("screeningService").value : "",
    medicineReceived: connected ? document.getElementById("medicineReceived").value : "",
    ctService: connected ? document.getElementById("ctService").value : "",
    hospitalService: connected ? document.getElementById("hospitalService").value : "",
    rating: connected ? document.getElementById("rating").value : "",
    communicationRemark: sanitize(document.getElementById("communicationRemark").value),
  };
}

/* Toggle the submit button between idle / loading states */
function setSubmitting(state) {
  isSubmitting = state;
  submitBtn.disabled = state;
  resetBtn.disabled = state;
  submitSpinner.hidden = !state;
  submitLabel.textContent = state ? "Submitting..." : "Submit";
}

function clearAllFieldErrors() {
  document.querySelectorAll(".field--invalid").forEach((el) => el.classList.remove("field--invalid"));
  document.querySelectorAll(".error-msg").forEach((el) => (el.textContent = ""));
}

/* ---------------------------------------------------------------------
   RESET BUTTON
   --------------------------------------------------------------------- */
resetBtn.addEventListener("click", () => {
  form.reset();
  lockCallingDateToToday();
  resetStarRating();
  toggleServiceVerification();
  populateCallerNameOptions(""); // re-lock Caller Name until a District is picked again
  clearAllFieldErrors();
  hideAlert();
});

/* ---------------------------------------------------------------------
   TOP-LEVEL ALERT BANNER
   --------------------------------------------------------------------- */
function showAlert(message) {
  formAlert.textContent = message;
  formAlert.hidden = false;
  formAlert.scrollIntoView({ behavior: "smooth", block: "start" });
}

function hideAlert() {
  formAlert.hidden = true;
  formAlert.textContent = "";
}

/* ---------------------------------------------------------------------
   SUCCESS / ERROR MODALS
   --------------------------------------------------------------------- */
function showSuccessModal() {
  successModal.hidden = false;
}

function showErrorModal(message, technicalDetail) {
  errorModalMessage.textContent = message;

  if (technicalDetail) {
    errorDetailsText.textContent = technicalDetail;
    errorDetails.hidden = false;
  } else {
    errorDetails.hidden = true;
    errorDetailsText.textContent = "";
  }

  errorModal.hidden = false;
}

successCloseBtn.addEventListener("click", () => {
  successModal.hidden = true;
  districtInput.focus();
});

errorCloseBtn.addEventListener("click", () => {
  errorModal.hidden = true;
});

// Retry re-submits the form immediately with the same field values
errorRetryBtn.addEventListener("click", () => {
  errorModal.hidden = true;
  form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event("submit", { cancelable: true }));
});

// Allow closing modals by clicking the dark overlay
[successModal, errorModal].forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.hidden = true;
  });
});
