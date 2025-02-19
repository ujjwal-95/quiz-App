import { useEffect, useState } from 'react';
import { getQuizHistory } from '../utils/indexedDb';

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const data = await getQuizHistory();
            setHistory(data);
        };
        fetchHistory();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-95vh bg-[#1a1c2c] text-white p-6">
            <div className="bg-[#23263a] p-6 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Quiz Attempt History</h2>
                {history.length === 0 ? (
                    <p className="text-center text-gray-400">No attempts yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {history.map((record, index) => (
                            <li key={index} className="bg-[#30344e] p-3 rounded-lg">
                                <p className="text-lg font-semibold">Score: {record.score}/10</p>
                                <p className="text-sm text-gray-300">{record.date}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default History;
