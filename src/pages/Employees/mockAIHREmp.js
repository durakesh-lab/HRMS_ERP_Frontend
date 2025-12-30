// mockAIEmployees.js

const employees = [
  {
    id: 1,
    name: "Tate McRae",
    role: "UX Designer",
    department: "Design",
    email: "tate@example.com",
    phone: "+1 234 567 890",
    status: "Active"
  },
  {
    id: 2,
    name: "Olivia Rodrigo",
    role: "Frontend Dev",
    department: "Engineering",
    email: "olivia@example.com",
    phone: "+1 987 654 321",
    status: "Active"
  }
];

export function findEmployeeByName(text) {
  return employees.find((e) =>
    text.toLowerCase().includes(e.name.toLowerCase())
  );
}

export function proposeEmployeeUpdate(text, employee) {
  if (!employee) return null;

  if (text.toLowerCase().includes("phone")) {
    const phoneMatch = text.match(/\+?\d[\d\s]{7,}/);
    return {
      type: "UPDATE",
      field: "phone",
      oldValue: employee.phone,
      newValue: phoneMatch?.[0] || "New Value",
      employee
    };
  }

  if (text.toLowerCase().includes("promote")) {
    return {
      type: "WORKFLOW",
      action: "Promotion",
      oldRole: employee.role,
      newRole: "Senior " + employee.role,
      employee
    };
  }

  return null;
}

export function mockDocumentUpdate(employee) {
  return {
    type: "DOCUMENT",
    document: "Insurance Policy",
    status: "Pending Approval",
    employee
  };
}
