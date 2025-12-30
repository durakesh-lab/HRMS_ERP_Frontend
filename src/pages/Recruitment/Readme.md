# AI-Assisted Recruitment Module (Frontend – Mock Implementation)

This module implements a **frontend-only, demo-ready AI-assisted recruitment experience** for HR users.  
The goal is to validate **UX, interaction flow, and approval-driven AI workflows** before backend and AI API integration.

All AI behavior in this phase is **mocked** using static logic and sample data.

---

## 📌 Scope of Implementation

- Technology: **React + MUI**
- Mode: **Frontend-only (No backend / No real AI APIs)**
- Target Users: **HR users**
- Status: **UI & Mock Logic Completed for Job Listing, Shortlisting, and Interview Scheduling**

---

## 🔁 AI Mode vs Manual Mode

- HR users can toggle **AI Mode ON/OFF**
- **AI Mode ON** → Conversational AI assistant is shown
- **AI Mode OFF** → Existing manual recruitment flow is shown
- Candidate users are unaffected and always see the candidate view

---

## 🤖 AI Recruitment Assistant – What’s Implemented

### 1️⃣ Conversational Job Creation (Voice/Text Command – Mocked)

**Requirement Covered:**
> *Voice/Text Command: The assistant will allow users to create job postings by specifying job details such as title, description, qualifications, and location.*

**Current Implementation:**
- HR can type natural language commands in chat, for example:
Create a frontend developer job in Bangalore with React and 3 years experience

markdown
Copy code
- The AI parses the text using a mock parser
- Job details are auto-generated:
- Job Title
- Location
- Qualifications
- Description (mocked)
- A **job review card** is displayed inside the chat
- **Approve / Edit buttons** are shown for HR review

**Status:** ✅ Completed (Mock UI + Logic)

---

### 2️⃣ Automated Candidate Shortlisting (Mocked)

**Requirement Covered:**
> *Automated Shortlisting: AI will screen resumes against job descriptions and rank them based on relevance.*

**Current Implementation:**
- Mock candidate data is used
- When HR types a command like:
Shortlist candidates

markdown
Copy code
- AI ranks candidates using mock scoring logic
- Each candidate is assigned:
- Relevance score (0–100)
- Status:
  - Shortlisted
  - Needs Review
  - Rejected

**Approval Flow (Implemented):**
- Candidates marked as **Needs Review** display:
- Approve button
- Reject button
- Actions are UI-only (no persistence)

**Status:** ✅ Completed (Mock logic + approval UI)

---

### 3️⃣ Interview Scheduling (Mocked)

**Requirement Covered:**
> *Interview Scheduling: AI will access calendar systems to schedule interviews based on available slots for both candidates and interviewers.*

**Current Implementation:**
- When HR types:
Schedule interviews

yaml
Copy code
- AI generates **mock interview slots**
- Each slot displays:
- Date
- Time
- Interviewer
- HR can click **Approve Schedule**

**Approval Flow:**
- Approval is required before confirmation
- Approval action is UI-only (no calendar integration)

**Status:** ✅ Completed (Mock scheduling + approval UI)

---

## 🧪 What Has Been Tested

✔ Job creation using natural language  
✔ Job review card rendering  
✔ Chat-based interaction flow  
✔ AI mode toggle behavior  

---

## 🔜 What Needs Further Testing (Already Implemented)

- Candidate shortlisting flow:
- Trigger via chat command
- Verify scores and statuses
- Approve / Reject interactions
- Interview scheduling flow:
- Trigger slot suggestions
- Approve interview schedules

---

## ❌ Not Included in This Phase

The following are **intentionally out of scope** for this implementation:

- Backend APIs (job persistence, approvals, interviews)
- Real resume parsing or AI ranking
- Calendar integrations (Google Calendar, Outlook, etc.)
- Voice input (Mic icon is UI placeholder only)
- Notifications and audit logs
- Role-based approval routing

These will be handled in later phases.

---

## 🧠 Design Philosophy

- AI actions are **assistive, not autonomous**
- All critical decisions require **explicit HR approval**
- Manual workflows remain fully functional
- AI mode enhances productivity without replacing control

---

## 📍 Summary

This module delivers a **demo-ready AI recruitment experience** that satisfies the **functional intent of Requirement 2.1** at the UI and interaction level.  
It provides a strong foundation for integrating real AI services and backend workflows in future phases.
