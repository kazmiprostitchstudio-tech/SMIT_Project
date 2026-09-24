import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentContext = createContext();

const DEFAULT_STUDENT = {
  name: 'Muhammad Hassan',
  rollNumber: '770860',
  batch: '20',
  campus: 'Zaitoon Ashraf IT Park',
  city: 'Karachi',
  courseName: 'Modern Web Application Development',
  progress: 75,
  attendance: { attended: 92, total: 113 },
  assignment: { completed: 6, total: 15 },
  // Default placeholder avatar ya uploaded image data URL
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  feeRecords: [
    {
      month: 'August 2026',
      amount: 'Rs. 1,000',
      type: 'Tuition Fee',
      dueDate: '10 Aug 2026',
      voucherId: 'VCH-88291',
      status: 'Paid'
    },
    {
      month: 'September 2026',
      amount: 'Rs. 1,000',
      type: 'Tuition Fee',
      dueDate: '10 Sep 2026',
      voucherId: 'VCH-99412',
      status: 'Paid'
    }
  ]
};

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(() => {
    try {
      const saved = localStorage.getItem('smit_student_data');
      return saved ? JSON.parse(saved) : DEFAULT_STUDENT;
    } catch {
      return DEFAULT_STUDENT;
    }
  });

  useEffect(() => {
    localStorage.setItem('smit_student_data', JSON.stringify(student));
  }, [student]);

  // Profile update handler
  const updateProfile = (updatedData) => {
    setStudent((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <StudentContext.Provider value={{ student, updateProfile }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);