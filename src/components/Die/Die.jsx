import "./Die.css";

const Die = ({ die, onChoose }) => {
    return (
        <div
            className={`die-container ${die.isHeld && "held"}`}
            onClick={() => onChoose(die.id)}
        >
            <h1 className="die-container_value">{die.value}</h1>
        </div>
    );
};

export default Die;
