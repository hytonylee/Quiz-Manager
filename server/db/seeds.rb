PASSWORD = 'supersecret'

User.destroy_all
Quiz.destroy_all
Question.destroy_all
Answer.destroy_all
QuizTaken.destroy_all

super_user = User.create(
  first_name: 'Admin',
  last_name: 'User',
  email: 'admin@gmail.com',
  password: PASSWORD,
  is_admin: true
)

  User.create(
    first_name: first_name,
    last_name: last_name,
    email: "#{first_name.downcase}.#{last_name.downcase}@example.com",
    password_digest: "testing",
    is_admin: false,
    total_score: 100,
    number_of_badges: 60,
    created_at: "2018/12/08",
    updated_at: "2018/12/08",
    password: PASSWORD
  )


10.times.each do

  q = Quiz.create(
    name: Faker::Hipster.sentence,
    description: Faker::Hipster.paragraph,
    difficulty: ["Beginner", "Intermediate", "Advanced"].sample,
    quiz_points: 100
  )

  if q.valid?
    10.times.each do
      que = Question.create(
        body: Faker::Hipster.sentence,
        quiz: q
      )

      if que.valid?
        2.times.each do
          Answer.create(
            body: "This is an answer",
            question: que
          )
        end
      end

    end
  end

end

5.times.each do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name

  u = User.create(
    first_name: first_name,
    last_name: last_name,
    email: "#{first_name.downcase}.#{last_name.downcase}@example.com",
    password: PASSWORD
  )
  u.total_score = rand(1000...20000)
  u.number_of_badges = rand(0...8)
  u.save
  10.times.each do
    quiz = Quiz.all.sample
    qt = QuizTaken.create(
      user: u,
      quiz: quiz,
      question: quiz.questions.first
    )
  end
end

# 20.times.each do
#   qt_id = QuizTaken.all.sample.id
#   update_qt(qt_id, "This is an answer")
# end
# 10.times.each do
#   qt_id = QuizTaken.all.sample.id
#   update_qt(qt_id, "This is a wrong answer")
# end

# testins
users = User.all
quizzes = Quiz.all
questions = Question.all
answers = Answer.all


puts Cowsay.say "Created #{users.count} users", :tux
puts Cowsay.say "Created #{quizzes.count} quizzes", :tux
puts Cowsay.say "Created #{questions.count} questions", :tux
puts Cowsay.say "Created #{answers.count} answers", :tux
puts "Login as admin #{super_user.email} and password of '#{PASSWORD}'"
puts "Seeded #{QuizTaken.all.count} quizzes that are taken"


# def update_qt(qt_id, input_string)
#   # Compare user's input string for a question and check if it is found in the answers.
#   @qt = QuizTaken.find_by(id: qt_id)
#   correct_input = !!@qt.question.answers.find { |answer| answer.body === input_string }
#
#   @qt.correct_answers += 1 if correct_input
#
#   if @qt.question_id === @qt.quiz.questions.order(:id).last.id
#     # If this was the last question, calculate results of quiz. For the evaluated
#     # quiz, compare the previous max scor e with the current one. Increase the
#     # user's total score by the difference.
#     previous_array = QuizTaken.where(user_id: @qt.user_id, quiz_id: @qt.quiz_id).map { |qt| qt.score }
#     previous_max = previous_array.max
#
#     correct_answers = @qt.correct_answers
#     total_questions = @qt.quiz.questions.count
#     quiz_points = @qt.quiz.quiz_points
#
#     @qt.score = quiz_points * correct_answers / total_questions
#     @qt.score = quiz_points if @qt.score > quiz_points
#
#     @qt.save
#
#     now_array = QuizTaken.where(user_id: @qt.user_id, quiz_id: @qt.quiz_id).map { |qt| qt.score }
#     now_max = now_array.max
#
#     user = User.find @qt.user_id
#     user.total_score = user.total_score - previous_max + now_max
#     user.number_of_badges += 1 if previous_max != quiz_points && now_max == quiz_points
#     user.save
#
#   else
#     # Else, increase the question index of the evaluated quiz by one.
#     current_question_index = @qt.quiz.questions.order(:id).index{ |question| question.id == @qt.question_id }
#     @qt.question = @qt.quiz.questions.order(:id)[current_question_index + 1]
#     @qt.save
#   end
# end

