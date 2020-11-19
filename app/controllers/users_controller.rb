class UsersController < TasksManagerController
  skip_before_action :login_required, only: [:new, :create]
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :correct_user, only: [:edit, :update, :destroy]

  def index
    @users = User.all
  end

  def show
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params.merge(bg_color_id: 1))
    if @user.save
      session[:user_id] = @user.id
      flash[:success] = "ユーザー「#{@user.name}」でログインしました。"
      redirect_to main_tasks_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @user.update(user_params)
      flash[:success] = "ユーザー「#{@user.name}」を更新しました。"
      redirect_to users_url
    else
      render :edit
    end
  end

  def destroy
    @user.destroy
    flash[:wraning] = "ユーザー「#{@user.name}」を削除しました。"
    redirect_to users_url
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :bg_color_id)
  end

  def correct_user
    user = User.find(params[:id])
    redirect_to root_url if current_user != user
  end
end
