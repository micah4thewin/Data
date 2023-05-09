const fs = require('fs');
const questionData = require('./questions/data.js');
const squadData = require('./squad/data.js');
const coqaData = require('./coqa/data.js');
const jeopardyData = require('./jeapordy/data.js');

const newData = {
  topics: []
};

let totalCategories = 0;
let totalQuestions = 0;
let totalAnswers = 0;

const datasets = [questionData, squadData, coqaData, jeopardyData];

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
