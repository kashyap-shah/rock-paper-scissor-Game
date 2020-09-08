//selection buttons
const selectionButtons = document.querySelectorAll('[data-selection]')
//to print the final score in a data-final-column
const finalColumn = document.querySelector('[data-final-column]')
//score
const yourScoreSpan = document.querySelector('[data-your-score]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
//selection array to store values
const SELECTIONS = [
	{
		name: 'rock',
		emoji: '\u270A',
		beats: 'scissor'
	},
	{
		name: 'paper',
		emoji: '\u270B',
		beats: 'rock'
	},
	{
		name: 'scissor',
		emoji: '\u270C',
		beats: 'paper'
	}
]

selectionButtons.forEach(selectionButton =>{
	//to get value of selection on click
	selectionButton.addEventListener('click', e =>{
		const selectionName = selectionButton.dataset.selection
		const selection = SELECTIONS.find(selection => selection.name === selectionName)
		makeSelection(selection)
	})
})

function makeSelection(selection){
	//computer selection
	const computerSelection = randomSelection()
	const yourWinner = isWinner(selection,computerSelection)
	const ComputerWinner = isWinner(computerSelection,selection)
	//console.log(computerSelection)

	addSelectionResult(computerSelection, ComputerWinner)
	addSelectionResult(selection, yourWinner)

	if(yourWinner) increementScore(yourScoreSpan)
	if(ComputerWinner) increementScore(computerScoreSpan)
}

function increementScore(scoreSpan){
	scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function addSelectionResult(selection, winner){
	//giving output for the winner
	const div = document.createElement('div')
	div.innerText = selection.emoji 
	div.classList.add('result-selection')
	if(winner) div.classList.add('winner')
	finalColumn.after(div)
}

function isWinner(selection, opponentSelection){
	return selection.beats === opponentSelection.name
}

function randomSelection(){
	//random funtion for computer selection
	const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
	return SELECTIONS[randomIndex]
}