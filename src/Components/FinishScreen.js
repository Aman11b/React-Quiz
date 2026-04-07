function FinishScreen({ dispatch, score, maxPossibePoints, highscore }) {
  const percentage = (score / maxPossibePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 70 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥉";
  if (percentage === 0) emoji = "🥲";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{score}</strong> out of {maxPossibePoints}(
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
