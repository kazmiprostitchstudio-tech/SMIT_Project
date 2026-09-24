import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentContext = createContext();

const DEFAULT_MODULES = [
  {
    id: 1,
    title: 'Web Designing',
    completed: 20,
    total: 20,
    percentage: 100,
    subTopics: [
      'HTML5 Semantic Tags & Structure',
      'CSS3 Flexbox & Grid Systems',
      'Responsive Web Design & Media Queries',
      'Bootstrap 5 Framework',
      'Tailwind CSS Basics & Components'
    ]
  },
  {
    id: 2,
    title: 'Front-End Development',
    completed: 27,
    total: 31,
    percentage: 87,
    subTopics: [
      'JavaScript ES6+ Syntax & Features',
      'DOM Manipulation & Event Handling',
      'Asynchronous JS, Promises & Async/Await',
      'Fetch API & RESTful Endpoints',
      'Local Storage & Session Storage'
    ]
  },
  {
    id: 3,
    title: 'Modern Front-End Development',
    completed: 10,
    total: 14,
    percentage: 71,
    subTopics: [
      'React Fundamentals & JSX',
      'State & Props Management',
      'React Hooks (useState, useEffect, useContext)',
      'React Router DOM v6',
      'Custom Hooks & Performance Optimization'
    ]
  },
  {
    id: 4,
    title: 'Back-End Development',
    completed: 1,
    total: 16,
    percentage: 6,
    subTopics: [
      'Node.js Runtime & NPM Ecosystem',
      'Express.js Server & Routing',
      'MongoDB & Mongoose Schema Modeling',
      'JWT Authentication & Password Hashing',
      'Deployment on Cloud Platforms'
    ]
  }
];

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
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  modules: DEFAULT_MODULES
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