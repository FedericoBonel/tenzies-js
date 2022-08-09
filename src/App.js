import "./App.css";
import Die from "./components/Die/Die";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import victory from "./sounds/victory.mp3";

const App = () => {
    const generateRandomValue = () => {
        const [max, min] = [7, 1];
        return Math.floor(Math.random() * (max - min) + min);
    };

    const generateRandomDice = (numberOfValues = 10) => {
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

    const [dice, setDice] = useState(generateRandomDice());
    const [won, setWon] = useState(false);
    const [numberRolls, setNumberRolls] = useState(0);

    useEffect(() => {
        const checkWonGame = () => {
            const valueToCheck = dice[0].value;
            return dice.every(
                (die) => die.isHeld && die.value === valueToCheck
            );
        };

        if (checkWonGame()) {
            const audio = new Audio(victory);
            audio.play();
            setWon(true);
        }
    }, [dice]);

    const rollNewDice = () => {
        if (won) {
            setWon(false);
            setDice(generateRandomDice());
            setNumberRolls(0);
        } else {
            setDice((oldDice) =>
                oldDice.map((die) =>
                    die.isHeld
                        ? die
                        : {
                              ...die,
                              value: generateRandomValue(),
                          }
                )
            );
            setNumberRolls((oldNumber) => oldNumber + 1);
        }
    };

    const holdDice = (dieId) => {
        setDice((oldDice) =>
            oldDice.map((die) =>
                die.id === dieId ? { ...die, isHeld: !die.isHeld } : die
            )
        );
    };

    const renderedDice = dice.map((die) => (
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
                <p className="tenzies-rolls">{`Number of rolls: ${numberRolls}`}</p>
                <section className="dice-container">{renderedDice}</section>
                <button className="roll-btn" onClick={rollNewDice}>
                    {won ? "New Game" : "Roll"}
                </button>
            </main>
        </div>
    );
};

export default App;
