# Chatbot Training Dataset

This repository contains a collection of datasets for training chatbots. The datasets cover various conversation aspects, including general chit-chat, question answering, introductions, exits, and statements.

## Directory Structure

The datasets are organized into separate directories, each with its own readme.md file explaining the dataset's purpose and usage:

- Chit-Chat
- coqa
- Exits
- Intros
- Questions
- SQuAD
- Statements

## Merging Data

The `index.js` script combines data from the various datasets and writes the merged data to the `merged_data/newData.js` file. To update the merged data, simply run the `index.js` script with Node.js.

## Usage

Use the combined dataset to train chatbots for various conversation scenarios, improving their overall performance and user engagement.
