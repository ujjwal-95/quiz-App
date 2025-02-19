import { useState, useEffect } from 'react';
import Timer from './Timer';
import { saveQuizResult, getQuizHistory } from '../utils/indexedDb.js'; 

const questions = [
 { question: "1. Which planet is closest to the Sun?", options: ["A. Venus", "B. Mercury", "C. Earth", "D. Mars"], answer: "B. Mercury" },
 { question: "2. Which data structure organizes items in a First-In, First-Out (FIFO) manner?", options: ["A. Stack", "B. Queue", "C. Tree", "D. Graph"], answer: "B. Queue" },
 { question: "3. Which of the following is primarily used for structuring web pages?", options: ["A. Python", "B. Java", "C. HTML", "D. C++"], answer: "C. HTML" },
 { question: "4. Which chemical symbol stands for Gold?", options: ["A. Au", "B. Gd", "C. Ag", "D. Pt"], answer: "A. Au" },
 { question: "5. Which of these processes is not typically involved in refining petroleum?", options: ["A. Fractional distillation", "B. Cracking", "C. Polymerization", "D. Filtration"], answer: "D. Filtration" },
 { question: "6. What is the value of 12 + 28?", type: "integer", answer: "40" },
 { question: "7. How many states are there in the United States?", type: "integer", answer: "50" },
 { question: "8. In which year was the Declaration of Independence signed?", type: "integer", answer: "1776" },
 { question: "9. What is the value of pi rounded to the nearest integer?", type: "integer", answer: "3" },
 { question: "10. If a car travels at 60 mph for 2 hours, how many miles does it travel?", type: "integer", answer: "120" },
];

const Quiz = ({ onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(1);
    const [resetTrigger, setResetTrigger] = useState(0);
    const [history, setHistory] = useState([]);
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        const loadHistory = async () => {
            const attempts = await getQuizHistory();
            setHistory(attempts);
        };
        loadHistory();
    }, []);

    const nextQuestion = () => {
        setUserInput(""); 
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setResetTrigger((prev) => prev + 1); 
        } else {
            const newAttempt = {
                date: new Date().toLocaleString(),
                score: score,
                total: questions.length
            };
            saveQuizResult(newAttempt);
            setHistory((prev) => [...prev, newAttempt]); 
            onComplete(score);
        }
    };

    const handleAnswer = (selected) => {
        if (questions[currentQuestion].type === "integer") {
            if (userInput === questions[currentQuestion].answer) {
                setScore(score + 1);
            }
        } else {
            if (selected === questions[currentQuestion].answer) {
                setScore(score + 1);
            }
        }
        nextQuestion();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-95vh bg-[#1a1c2c] text-white px-6">
            <div className="bg-[#23263a] p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
                <Timer duration={30} onTimeout={nextQuestion} resetTrigger={resetTrigger} />
                <h2 className="text-xl font-semibold mb-6">{questions[currentQuestion].question}</h2>

                {questions[currentQuestion].type === "integer" ? (
                    <div className="flex flex-col space-y-4">
                        <input 
                            type="number" 
                            value={userInput} 
                            onChange={(e) => setUserInput(e.target.value)} 
                            className="bg-gray-700 text-white p-2 rounded-md text-center"
                            placeholder="Enter your answer" 
                        />
                        <button 
                            onClick={() => handleAnswer(userInput)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 cursor-pointer rounded-lg shadow transition"
                        >
                            Submit
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col space-y-4">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button 
                                key={index} 
                                onClick={() => handleAnswer(option)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 cursor-pointer rounded-lg shadow transition"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;