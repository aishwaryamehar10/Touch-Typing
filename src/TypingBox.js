import React, { useState, useEffect } from 'react';

const TypingBox = () => {
    const [typedKeys, setTypedKeys] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [targetKeys, setTargetKeys] = useState('');
    const [timer, setTimer] = useState(300);
    const [numKeysPressed, setNumKeysPressed] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        const targetKeys = 'asdfjkl;'; // Define the target keys

        setTargetKeys(targetKeys);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(interval);
                    return prevTimer;
                }
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleChange = (e) => {
        const { value } = e.target;
        setInputValue(value);
        setNumKeysPressed(value.length);
        setAccuracy(calculateAccuracy(value, targetKeys));
        setFeedback(generateFeedback(value, targetKeys));
    };

    const calculateAccuracy = (inputValue, targetKeys) => {
        const totalKeys = targetKeys.length;
        const correctKeys = getCorrectKeys(inputValue, targetKeys);

        return totalKeys === 0 ? 100 : Math.floor((correctKeys / totalKeys) * 100);
    };

    const getCorrectKeys = (inputValue, targetKeys) => {
        const minLength = Math.min(inputValue.length, targetKeys.length);

        let correctKeys = 0;
        for (let i = 0; i < minLength; i++) {
            if (inputValue[i] === targetKeys[i]) {
                correctKeys++;
            }
        }

        return correctKeys;
    };

    const generateFeedback = (inputValue, targetKeys) => {
        const feedback = [];

        for (let i = 0; i < inputValue.length; i++) {
            const key = inputValue[i];
            const expectedKey = targetKeys[i];

            if (key === expectedKey) {
                feedback.push('correct');
            } else {
                feedback.push('incorrect');
            }
        }

        return feedback;
    };

    const renderTargetKeys = () => {
        return targetKeys.split('').map((key, index) => {
            let className = 'key';

            if (feedback[index] === 'correct') {
                className += ' correct';
            } else if (feedback[index] === 'incorrect') {
                className += ' incorrect';
            }

            return (
                <span key={index} className={className}>
                    {key}
                </span>
            );
        });
    };

    const handleClearButtonClick = () => {
        setTypedKeys('');
        setInputValue('');
        setNumKeysPressed(0);
        setAccuracy(100);
        setFeedback([]);
    };

    return (
        <div className="typing-box">
            <h2>Typing Practice</h2>
            <p>Type the following keys:</p>
            <div className="target-keys">{renderTargetKeys()}</div>
            <input
                className="input"
                type="text"
                value={inputValue}
                onChange={handleChange}
                autoFocus
            />
            <input
                type="text"
                className="input"
                value={typedKeys}
                onChange={(e) => setTypedKeys(e.target.value)}
            />
            <button className="clear-button" onClick={handleClearButtonClick}>
                Clear
            </button>
            <div className="results">
                <p>Time left: {timer} seconds</p>
                <p>Number of keys pressed: {numKeysPressed}</p>
                <p>Accuracy: {accuracy}%</p>
            </div>
        </div>
    );
};

export default TypingBox;









