import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Quiz from './components/Quiz';
import Scoreboard from './components/Scoreboard';
import History from './components/History';
import { useState } from 'react';

function App() {
    const [score, setScore] = useState(null);
    const [quizStarted, setQuizStarted] = useState(false);

    const startQuiz = () => {
        setScore(null);  
        setQuizStarted(true);  
    };

    return (
        <Router>
         <div className="min-h-screen bg-[#1a1c2c] flex flex-col items-center">
          <nav className="w-full bg-[#23263a] text-white py-4 flex items-center justify-between px-4 md:px-8">
             <span className="text-xl font-bold">📝 Quiz App</span>
               <div className="flex space-x-8 mx-auto">
                  <Link to="/" onClick={() => setQuizStarted(false)} className="font-semibold hover:underline">🏠 Home</Link>
                  <Link to="/history" className="font-semibold hover:underline">📜 History</Link>
              </div>
          </nav>

                <div className="flex flex-col items-center mt-10">
                    <Routes>
                        <Route path="/" element={
                            quizStarted ? (
                                score === null ? 
                                    <Quiz onComplete={setScore} /> 
                                    : (
                                        <div className="text-center space-y-4">
                                            <Scoreboard score={score} />
                                            <button 
                                                onClick={startQuiz} 
                                                className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md cursor-pointer hover:bg-green-600 transition"
                                            >
                                                🔄 Attempt Again
                                            </button>
                                        </div>
                                    )
                            ) : (
                                <button 
                                    onClick={startQuiz} 
                                    className="bg-blue-400 hover:bg-blue-600 text-white px-6 py-2 ml-19 rounded-lg cursor-pointer shadow-md transition"
                                >
                                    🚀 Start Quiz
                                </button>
                            )
                        } />
                        <Route path="/history" element={<History />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
