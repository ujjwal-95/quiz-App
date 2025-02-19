import { useState, useEffect } from 'react';

const Timer = ({ duration, onTimeout, resetTrigger }) => {
    const [time, setTime] = useState(duration);

    useEffect(() => {
        setTime(duration); 
    }, [resetTrigger]);

    useEffect(() => {
        if (time === 0) {
            onTimeout(); 
            return;
        }
        const interval = setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
        return () => clearInterval(interval);
    }, [time]);

    return <p className='font-semibold text-red-500'>Time left: {time}s</p>;
};

export default Timer;

