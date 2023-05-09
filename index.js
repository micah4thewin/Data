const fs = require('fs');
const data = require('./questions/data.js');
const squadData = require('./squad/data.js');
const coqaData = require('./coqa/data.js');
const jeopardyData = require('./jeapordy/data.js');
const wikiqaData = require('./wikiqa/data.js');
const humorData = require('./humor/data.js'); // Add this line

const newData = {
  topics: []
};

let totalCategories = 0;
let totalQuestions = 0;
let totalAnswers = 0;

const datasets = [data, squadData, coqaData, jeopardyData, wikiqaData, humorData]; // Add humorData here

for (const dataset of datasets) {
  for (const category of dataset.topics) {
    totalCategories++;
    totalQuestions += category.prompts.length;
    for (const question of category.prompts) {
      if (question.reply) {
        totalAnswers++;
      }
    }
    const newCategory = {
      topic: category.topic,
      prompts: category.prompts
    };
    newData.topics.push(newCategory);
  }
}

const jsonData = JSON.stringify(newData, null, 2);

fs.writeFileSync('./merged_data/newData.js', `export default ${jsonData}`, { encoding: 'utf-8' });

console.log(`Total number of topics:${totalCategories}`);
console.log(`Total number of questions: ${totalQuestions}`);
console.log(`Total number of answers: ${totalAnswers}`);
