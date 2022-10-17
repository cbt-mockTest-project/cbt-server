# CBT Server (2021.10.16 ~ ing)

## Stack
Nestjs, Typeorm, Postgresql, Aws

## DB-Diagram 
https://dbdiagram.io/d/634a210ef0018a1c5f0afe8e

## 진행상황

### entity 
- User
- MockExam
- MockExamCategory
- MockExamQuestion
- MockExamQuestionFeedback

### mutation
- User
  - register
  - login
- MockExamCategory
  - CRUD

### query
- User
  - me
  - uesrProfile
- MockExamCategory
  - readAllCategories

## 진행예정
- MockExamQuestion CRUD
- MockExamQuestionFeedback CRUD
- MockExam CRUD
- FileUpload controller