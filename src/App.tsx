import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { JournalProvider } from './hooks/useJournalContext';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { MyJournals } from './pages/MyJournals';
import { AddNewJournal } from './pages/AddNewJournal';

/**
 * Main App component
 * Sets up routing and global providers
 */
function App() {
  return (
    <BrowserRouter>
      <JournalProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journals" element={<MyJournals />} />
            <Route path="/new" element={<AddNewJournal />} />
          </Routes>
        </div>
      </JournalProvider>
    </BrowserRouter>
  );
}

export default App;
