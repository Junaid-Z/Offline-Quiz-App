import { useState } from "react";
import { questions } from "./Resources/data";
import "./Style/QuizApp.css"
function QuizApp() {
	let [count, setCount] = useState(0);
	let [answers, setAnswers] = useState([]);
	function CalculateScore(answers) {
		let score = 0;
		let wrongAnswers = [];
		for (var questionNumber = 0; questionNumber < answers.length; questionNumber += 1) {
			let chosenAnswer = answers[questionNumber];
			if (questions[questionNumber].options[chosenAnswer] === questions[questionNumber].answer) {
				score += 1;
			}
			else {
				wrongAnswers.push(questionNumber + 1);
			}
		}
		console.log(answers)
		console.log(score);
		return {
			score: score,
			wrongAnswers: wrongAnswers,
		};
	}
	function ChangeCount(v) {
		if (v === 1) {
			if (count < questions.length) {
				if (answers[count] !== undefined) {
					setCount(count + 1);
				}
				else {
					alert("Please Choose An Option")
				}
			};
		}
		else if (v === -1) {
			if (count !== 0) {
				setCount(count - 1);
			}
		}
	}
	return (
		<div className="App">
			<header className="App-header">
				{(count < 5 &&
					(<div className='card questionCard'>
						<div style={{ marginBottom: "10px" }}>We are currently on question number {count + 1}</div>
						<div>Q- {questions[count].question}</div>
						<div className="answerList">
							{questions[count].options.map((q, i) => {
								return (
									<label key={i}>
										{questions[count].options[i]}
										<input type="radio" name="mcq" checked={answers[count] === i} onChange={() => {
											answers[count] = i;
											setAnswers([...answers]);
										}} />
									</label>)
							})}
						</div>
					</div>)) ||
					<div className='card questionCard'>
						Your Score Is {CalculateScore(answers).score}/5
						{(CalculateScore(answers).score === 0
							&&
							<div>
								Did you even prepare for the quiz ? 💀💀💀
							</div>)
							||
							(CalculateScore(answers).score !== 5
								&&
								<div>
									You answered question number {CalculateScore(answers).wrongAnswers.map((a, i, array) => {
										if (i !== array.length - 1) {
											return `${a},`
										}
										else {
											return a
										}
									})} incorrectly
								</div>)
							||
							<div>
								Congratulations you answered all the question correctly. You deserve a pat on the back 🎉🎉🎉
							</div>}
					</div>
				}
				<div className="myButtons">
					<button onClick={() => { ChangeCount(-1) }}>Previous Question</button>
					<button onClick={() => { ChangeCount(1) }}>Next Question</button>
				</div>
			</header>
		</div>
	);
}
export default QuizApp;