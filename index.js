const fs = require('fs');
const questionData = require('./Questions/data.js');
const squadData = require('./SQuAD/data.js');
const coqaData = require('./coqa/data.js');

const newData = {
  topics:[]
};

let totalCategories = 0;
let totalQuestions = 0;
let totalAnswers = 0;

const datasets = [questionData, squadData, coqaData];

for (const dataset of datasets) {
  for (const category of dataset.categories) {
    totalCategories++;
    totalQuestions += category.questions.length;
    for (const question of category.questions) {
      if (question.answer) {
        totalAnswers++;
      }
    }
    const newCategory = {
      category: category.category,
      questions: category.questions
    };
    newData.categories.push(newCategory);
  }
}

const jsonData = JSON.stringify(newData, null, 2);

fs.writeFileSync('./merged_data/newData.js', `export default ${jsonData}`, { encoding: 'utf-8' });

console.log(`Total number of topics:${totalCategories}`);
console.log(`Total number of questions: ${totalQuestions}`);
console.log(`Total number of answers: ${totalAnswers}`);
