class UsersController < TasksManagerController
  skip_before_action :login_required, only: [:new, :create]
  before_action :set_user, only: [:show, :edit, :update, :destroy]

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

  def admin_check
    if user_signed_in? && current_user.role == :staff
        redirect_to main_tasks_path
    else
        render action: :edit
        flash[:alert] = "管理者画面です"
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :bg_color_id, :role)
  end
end
