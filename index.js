const fs = require('fs');
const data = require('./questions/data.js');
const squadData = require('./squad/data.js');
const coqaData = require('./coqa/data.js');
const jeopardyData = require('./jeapordy/data.js');
const wikiqaData = require('./wikiqa/data.js');
const humorData = require('./humor/data.js');

const newData = {
  topics: []
};

let totalCategories = 0;
let totalQuestions = 0;
let totalAnswers = 0;

const datasets = [data, squadData, coqaData, jeopardyData, wikiqaData, humorData];

function removeSpecialCharacters(text) {
  // Remove non-standard punctuation, backslashes, double quotes, single quotes, parentheses, semicolons, and colons
  let newText = text.replace(/[\\'"\(\);:]/g, '');

  // Replace occurrences of '. . .' and '. ..' with '...'
  newText = newText.replace(/(\. ){2,}\./g, '...');

  // Remove extra spaces around commas
  newText = newText.replace(/ , | ,/g, ',');

  // Remove ' -- ' and replace with a single space
  newText = newText.replace(/ -- /g, ' ');

  // Remove line breaks and carriage returns, replacing them with a single space
  newText = newText.replace(/[\n\r]+/g, ' ');

  // Remove double spaces
  newText = newText.replace(/\s{2,}/g, ' ');

  // Remove any HTML or markup characters
  newText = newText.replace(/<[^>]*>/g, '');

  // Remove Wikipedia markup, such as '{{...}}' and '[[...]]'
  newText = newText.replace(/(\{\{|\[\[)[^}\]]*(\}\}|\]\])/g, '');

  // Remove remaining special characters, including Unicode characters
  newText = newText.replace(/[^\x20-\x7E]+/g, '');

  // Decode any HTML entities
  newText = newText.replace(/&[^;]+;/g, (match) => {
    const el = document.createElement('div');
    el.innerHTML = match;
    return el.innerText;
  });

  return newText;
}



for (const dataset of datasets) {
  for (const category of dataset.topics) {
    totalCategories++;
    totalQuestions += category.prompts.length;
    const cleanPrompts = category.prompts.map(prompt => {
      const cleanQuestion = removeSpecialCharacters(prompt.prompt);
      const cleanReply = prompt.reply ? removeSpecialCharacters(prompt.reply) : null;
      return {
        prompt: cleanQuestion,
        reply: cleanReply
      };
    });
    totalAnswers += cleanPrompts.filter(prompt => prompt.reply).length;

    const newCategory = {
      topic: removeSpecialCharacters(category.topic),
      prompts: cleanPrompts
    };

    newData.topics.push(newCategory);
  }
}

const jsonData = JSON.stringify(newData, null, 2);

fs.writeFileSync('./merged_data/newData.js', `export default ${jsonData}`, { encoding: 'utf-8' });

console.log(`Total number of topics:${totalCategories}`);
console.log(`Total number of questions: ${totalQuestions}`);
console.log(`Total number of answers: ${totalAnswers}`);
