const Scoreboard = ({ score }) => (
    <div className="flex flex-col items-center justify-center min-h-90vh bg-[#1a1c2c] text-white">
        <div className="bg-[#23263a] p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-lg">Your Score: <span className="font-semibold">{score}/10</span></p>
        </div>
    </div>
);

export default Scoreboard;
