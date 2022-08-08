import "./App.css";
import Die from "./components/Die/Die";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const App = () => {
    const [max, min] = [7, 1];

    const generateRandomValue = () => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    const generateRandomDies = (numberOfValues = 10) => {
        let numbers = [];
        for (let i = 0; i < numberOfValues; i++) {
            numbers.push({
                id: nanoid(),
                value: generateRandomValue(),
                isHeld: false,
            });
        }
        return numbers;
    };

    const [dies, setDies] = useState(generateRandomDies());
    const [won, setWon] = useState(false);

    useEffect(() => {
        const checkWonGame = () => {
            const valueToCheck = dies[0].value;
            return dies.every(
                (die) => die.isHeld && die.value === valueToCheck
            );
        };

        setWon(checkWonGame());
    }, [dies]);

    const rollNewDies = () => {
        if (won) {
            setWon(false);
            setDies(generateRandomDies());
        } else {
            setDies((oldDies) =>
                oldDies.map((die) =>
                    die.isHeld
                        ? die
                        : {
                              ...die,
                              value: generateRandomValue(),
                          }
                )
            );
        }
    };

    const holdDice = (diceId) => {
        setDies((oldDies) =>
            oldDies.map((die) =>
                die.id === diceId ? { ...die, isHeld: !die.isHeld } : die
            )
        );
    };

    const renderedDies = dies.map((die) => (
        <Die key={die.id} die={die} onChoose={holdDice} />
    ));

    return (
        <div className="App">
            <main>
                {won && <Confetti />}
                <h1 className="tenzies-title">Tenzies</h1>
                <p className="tenzies-para">
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.
                </p>
                <section className="dies-container">{renderedDies}</section>
                <button className="roll-btn" onClick={rollNewDies}>
                    {won ? "New Game" : "Roll"}
                </button>
            </main>
        </div>
    );
};

export default App;
