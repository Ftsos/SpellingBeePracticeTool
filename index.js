var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
//Word Index 154
var letters = ['A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.', 'H.', 'I.', 'J.', 'K.', 'L.', 'M.', 'N.', 'O.', 'P.', 'Q.', 'R.', 'S.', 'T.', 'U.', 'V.', 'W.', 'X.', 'Y.', 'Z.']

var synth = window.speechSynthesis;
var grammar = '#JSGF V1.0; grammar spell; public <spell> = ' + letters.join(' | ') + ' ;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

var voices = [];
var words = []
let wordIndex = 1;

var revealP = document.querySelector("p#WordRevealed")
var listenButtonB = document.querySelector("button#listen")
var stopListeningButtonB = document.querySelector("button#stopListening")
var speechResult = document.querySelector("p#speechResult")

var wordsText = `Advertising
Christmas
Company
Entrance
Salt water
Simulator
Sunshine
Awesome
Crowded
Interactive
Interesting
Separate
Sunglasses
Sweatshirt
Umbrella
Microphone
Password
Text message
Username
Astronaut
Firefighter
Juggler
Receptionist
Aquarium
Museum
Sightseeing
Theme park
Atmosphere
Backstage
Immediately
Underwear
Cosmopolitan
Spectacular
Well known
Fireworks
Champagne
Heavy metal
Lead singer
Across from
Flower shop
Newsstand
Happy New Year!
Make friends
Make a wish
Shake hands
Stay up late
Wait in line
Ball of light
Cathedral
Earthquake
Emergency
Enough
Extremely
Government
Overboard
Part-owner
Performance
Afterward
Suddenly
Bicycle
Helicopter
Make a phone call
Businessman
Mathematics
Murderer
Ourselves
Politician
Romance
Available
Extraordinary
Fashionable
Fast-moving
Imaginary
Middle-class
Successful
Angrily
Badly
Carefully
Easily
Happily
Hungrily
Loudly
Nervously
Normally
Politely
Properly
Quickly
Quietly
Rudely
Thirstily
Brightness
Computer chip
Digital photo
Primary color
Musician
Rehearsal
Rehearse
Documentary
Game show
Music show
Sitcom
Succeed
Make sense
Accuracy
Arrangement
Atomic clock
Backpack
Backpacking
Classical music
Independence
Natural history
Paddleboat
Paperback
Percentage
Playing cards
Postcard
Responsibility
Satellite
Suggestion
Vegetarian
Accurate
Addictive
Impossible
Fleece jacket
Lightweight
Polyester
Raincoat
Waterproof
Abbreviation
Something
Uncountable
Mushroom
Through
Figure out
Keep going
Keep in touch
Last but not least
Order a meal
Pass the time
Spend money
Absolutely
Exhibition
Satellite
Species
Technology
Ancient
Average
Commercial
Right-hand
Stunning
Valuable
Passenger
Streetcar
Wagon
Weigh
Advertisement
Autograph
Environment
Equipment
Feather
Flash photograph
Fortunately
Highlight
Human being
In contrast
Inhabitant
Jewelry
Table manners
Tourism center
Traditionally
Treatment
Volcano
Exhausting
Fascinating
Freezing
Frightening
Increased
Surprising
Terrifying
Unfriendly
Crocodile
Dinosaur
Husky
Reindeer
Gesture
Amazed
Embarrassed
Excited
Fascinated
Frightened
Shampoo
Toilet paper
Communicate
Disagree
Encourage
Experience
Put away
Make the bed
Pass an exam
Raise money
Set the table
Take off
Take part
Fantastically
Handwriting
Height
Neatly
Process
Thumbnail
Wedding
Wizard
Worldwide
Attractive
Life-size
Little-known
Sensitive
Background
Storyboard
Filmmaker
consultant
Manager
Mechanic
Producer
Referee
Scientist
Surgeon
Translator
Argue
Overtake
Promise
Refuse
Seriously
February
auxiliary
camouflage
category
changeable
committee
definitely
definition
envelope
grammar
humorous
liaison
manoeuvre
occasion
parliamentary
privilege
questionnaire
rhythm
weather
`


function wordsParse() {
	words = wordsText.split('\n')
	console.log(words)
}

function main() {
	wordsParse()
	speechRecognitionList.addFromString(grammar, 1);
	recognition.grammars = speechRecognitionList;
	recognition.continuous = true;
	recognition.lang = 'en-US';
	recognition.interimResults = false;
	recognition.maxAlternatives = 1;
}

function startButton() {
	if (words.length < 1) {wordsParse()}
	let utterance = new SpeechSynthesisUtterance(words[0])
	utterance.voice = synth.getVoices()[0]
	utterance.pitch = 1
	utterance.rate = 1
	synth.speak(utterance)
}

function nextButton() {
	if (words.length < 1) {wordsParse()}
	let utterance = new SpeechSynthesisUtterance(words[wordIndex])
	utterance.voice = synth.getVoices()[0]
	utterance.pitch = 1
	utterance.rate = 1
	synth.speak(utterance)
	wordIndex++;
}

function revealButton() {
	if (words.length < 1) {wordsParse()}
	revealP.innerHTML = words[wordIndex - 1]	
}

function listenButton() {
	recognition.start();
	recognition.onresult = function(event) {
  		var word = event.results[0][0].transcript;
  		speechResult.innerHTML = word + ` <b>${word == words[wordIndex - 1] ? "Correct" : "Incorrect"}</b>`
  		console.log('Confidence: ' + event.results[0][0].confidence);
	}
	stopListeningButtonB.style.display = "block"
	listenButtonB.style.display = "none"
}

function stopListeningButton() {
	recognition.stop()
	stopListeningButtonB.style.display = "none"
	listenButtonB.style.display = "block"
}



