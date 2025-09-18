import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AuthGuard } from './components/auth/AuthGuard';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  return (
    <AuthProvider>
      <AuthGuard>
        <Layout>
          <Dashboard />
        </Layout>
      </AuthGuard>
    </AuthProvider>
  );
}

export default App;