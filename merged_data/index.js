const fs = require('fs');
const data = require('./newData.js');

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const promptReplyPairs = [];

data.topics.forEach(topic => {
  topic.prompts.forEach(prompt => {
    if (prompt.reply) {
      promptReplyPairs.push({ prompt: prompt.prompt, reply: prompt.reply });
    }
  });
});

const shuffledPromptReplyPairs = shuffle(promptReplyPairs);

const trainingSize = Math.floor(shuffledPromptReplyPairs.length * 0.7);
const validationSize = Math.floor(shuffledPromptReplyPairs.length * 0.15);

const trainingSet = shuffledPromptReplyPairs.slice(0, trainingSize);
const validationSet = shuffledPromptReplyPairs.slice(trainingSize, trainingSize + validationSize);
const testSet = shuffledPromptReplyPairs.slice(trainingSize + validationSize);

fs.writeFileSync('./trainingSet.json', JSON.stringify(trainingSet, null, 2), { encoding: 'utf-8' });
fs.writeFileSync('./validationSet.json', JSON.stringify(validationSet, null, 2), { encoding: 'utf-8' });
fs.writeFileSync('./testSet.json', JSON.stringify(testSet, null, 2), { encoding: 'utf-8' });

console.log(`Number of question and answer pairs in the training set: ${trainingSet.length}`);
console.log(`Number of question and answer pairs in the validation set: ${validationSet.length}`);
console.log(`Number of question and answer pairs in the test set: ${testSet.length}`);
