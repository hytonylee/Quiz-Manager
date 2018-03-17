class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  skip_before_action :verify_authenticity_token

  def not_found
    render(
      json: {
        errors: [{
          type: "NotFound"
        }]
      },
      status: :not_found
    )
  end

  private
  def current_user
    token = request.headers["AUTHORIZATION"]

    begin
      payload = JWT.decode(
        token,
        Rails.application.secrets.secret_key_base
      )&.first

      @user ||= User.find_by(id: payload["id"])
      rescue JWT::DecodeError => error
      nil
    end
  end

  helper_method :current_user

  def authenticate_user!
    head :unauthorized unless current_user.present?
  end

  def encode_token(payload = {}, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(
      payload,
      Rails.application.secrets.secret_key_base
    )
  end
end
