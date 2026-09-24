import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StudentProvider } from './context/StudentContext';
import StudentLogin from './pages/StudentLogin';
import TrainerLogin from './pages/TrainerLogin';
import AdminLogin from './pages/AdminLogin';
import CoursesPage from './pages/CoursesPage';
import CourseDashboard from './pages/CourseDashboard';
import ProgressPage from './pages/ProgressPage';

function MainApp() {
  const { currentUser, logout } = useAuth();
  const [currentRoleView, setCurrentRoleView] = useState('student');
  // Navigation screen state: 'courses' | 'dashboard' | 'progress'
  const [currentScreen, setCurrentScreen] = useState('courses');

  if (currentUser?.isLoggedIn) {
    if (currentScreen === 'courses') {
      return (
        <CoursesPage
          onViewDetails={() => setCurrentScreen('dashboard')}
          onLogout={logout}
        />
      );
    }

    if (currentScreen === 'dashboard') {
      return (
        <CourseDashboard
          onNavigate={(screen) => setCurrentScreen(screen)}
          onBackToCourses={() => setCurrentScreen('courses')}
        />
      );
    }

    if (currentScreen === 'progress') {
      return (
        <ProgressPage
          onNavigate={(screen) => setCurrentScreen(screen)}
          onBackToCourses={() => setCurrentScreen('courses')}
        />
      );
    }
  }

  return (
    <div>
      {currentRoleView === 'student' && (
        <StudentLogin onSwitchRole={setCurrentRoleView} />
      )}
      {currentRoleView === 'trainer' && (
        <TrainerLogin onSwitchRole={setCurrentRoleView} />
      )}
      {currentRoleView === 'admin' && (
        <AdminLogin onSwitchRole={setCurrentRoleView} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StudentProvider>
        <MainApp />
      </StudentProvider>
    </AuthProvider>
  );
}