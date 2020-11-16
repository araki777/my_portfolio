class UsersController < TasksManagerController
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
    @user = User.new(user_params)
    if @user.save
      flash[:success] = "ユーザー「#{@user.name}」を登録しました。"
      redirect_to users_url
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
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def correct_user
    user = User.find(params[:id])
    redirect_to root_url if current_user != user
  end
end
