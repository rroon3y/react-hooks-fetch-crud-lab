function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDelete(id));
  }

  function handleChange(e) {
    const newIndex = parseInt(e.target.value);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((r) => r.json())
      .then(onUpdate);
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <ul>
        {answers.map((ans, index) => (
          <li key={index}>
            {ans} {index === correctIndex ? "✔️" : ""}
          </li>
        ))}
      </ul>
      <label>Correct Answer:</label>
      <select value={correctIndex} onChange={handleChange}>
        {answers.map((_, i) => (
          <option key={i} value={i}>
            {`Answer ${i + 1}`}
          </option>
        ))}
      </select>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
