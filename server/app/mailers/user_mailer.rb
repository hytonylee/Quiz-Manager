class UserMailer < ApplicationMailer
  def notify_user(user)
    @user = user

    mail(
      to: @user.email,
      # to: email,
      subject: 'Reset password'
    )
  end
end
