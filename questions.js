/**
 * Return a question to ask the user
 * @param {string} language - language of the question to return
 * @param {number} difficulty - difficulty of the question between 1 and 10
 * @returns {string}
 */
function randomQuestion(category) {
	const ques =
`How many people are in your family?
Do you have any brothers or sisters?
What does your dad do?
What is you mother's occupation?
Describe your brother/sister.
Are you married?
Do you have any pets?
Do you want any pets?
Do you want any children?
Do you have any children?
Describe your house.
Describe your city or town.
What is your favourite type of food?
What is your favourite type of drink?
Do you like to cook?
Do you think you’re a good cook?
what was the last meal you cooked?
Do you think you’re a healthy person?
Are you a vegetarian?
Do you drink Coke or pepsi and why?
Do you prefer tea or coffee?
Which country has the best food?
Do you prefer pasta or rice?
Do you like spicy food?
Who cooks in your house?
What is your name?
Where do you live?
Where are you from?
Where were you born?
What do you do?
What do you study?
Describe yourself in three words.
Tell me about yourself.
Who is your favourite person in the world and why?
What do you want to do when you’re older?
What type of house do you live in?
What do you like to do in your free time?
What sport do you do?
Do you prefer winter sports or summer sports?
What if your favourite sport?
Do you like listening to music?
Do you like reading books?
What was the last book you read
What was the last movie you watched?
What type of music do you like listening to?
What type of movies do you like to watch?
Do you prefer arts or sports?
Do you like art?
What do you like to do to relax?
What do you think of modern art?
Do you prefer team games or individual games?
Where is the best place you’ve ever been on holiday?
Where was the last place you went on holiday?
Do you prefer beaches or mountains?
Do you like to travel alone or in a group?
Do you prefer to eat in the hotel or at local restaurants?
Do you prefer to use the local currency or pay for everything on card?
Do you prefer to use a map or an app?
Do you prefer to plan your holiday or leave everything to chance?
Do you prefer to stay in a hotel or an air bnb?
Do you like to learn the language of the country you’re in or use English?`
	var questions = ques.split('\n');
	var prev = 0;
	if(category == 12)          // 12 family questions
	{
		prev = 1;
	}
	else if(category == 25)      // 13 food questions  12 + 13 = 25
	{
		prev = 13;
	}
	else if(category == 36)      // 11 general questions  25 + 11 = 36
	{
		prev = 26;
	}
	else if(category == 51)		// 15 Hobbies questions
	{
		prev =37;
	}
	else if(category == 61)
	{
		prev = 52;
	}
	var number = Math.floor(Math.random() * (category - prev)) + prev;    // generate random number according to category

	var ans =  questions[number];
	return ans;
}
