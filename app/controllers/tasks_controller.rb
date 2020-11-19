class TasksController < TasksManagerController
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  Category_Name = {
    1 => "プログラミング",
    2 => "料理",
    3 => "運動",
    4 => "仕事"
  }

  Priority_Name = {
    1 => "高",
    2 => "中",
    3 => "低"
  }

  Rate_Name = {
    0 => "0%", 1 => "10%", 2 => "20%", 3 => "30%", 4 => "40%", 5 => "50%",
    6 => "60%", 7 => "70%", 8 => "80%", 9 => "90%", 10 => "100%"
  }

  def main
    @q = current_user.tasks.where.not(rate: 10).ransack(params[:q])
    @tasks = @q.result(distinct: true).order(created_at: :DESC).page(params[:page]).per(10)
  end

  def new
    @task = Task.new
  end

  def create
    @task = current_user.tasks.new(task_params)
    is_parent_record = current_user.tasks.exists?(parent_task_id: nil, id: @task.parent_task_id)
    if is_parent_record || (@task.parent_task_id == nil)
      @task.save
      flash[:success] = "タスク「#{@task.title}」を登録しました。"
      redirect_to main_tasks_path
    else
      render :new
    end
  end

  def show
    @children_task = current_user.tasks.where(parent_task_id: params[:id])
  end

  def edit
  end

  def update
    if @task.update(task_params)
      flash[:success] = "タスク「#{@task.title}」を更新しました！"
      redirect_to main_tasks_path
    else
      render :edit
    end
  end

  def destroy
    @task.destroy
    flash[:warning] = "タスク「#{@task.title}」を削除しました。"
    redirect_to main_tasks_path
  end

  def search
    selection = params[:task][:keyword]
    @q = current_user.tasks.ransack(params[:q])
    @tasks = case selection
    when 'new'
      @q.result(distinct: true).order(created_at: :DESC).page(params[:page]).per(10)
    when 'old'
      @q.result(distinct: true).order(created_at: :ASC).page(params[:page]).per(10)
    when 'priority'
      @q.result(distinct: true).order(priority: :ASC).page(params[:page]).per(10)
    when 'rate'
      @q.result(distinct: true).order(rate: :DESC).page(params[:page]).per(10)
    end
  end

  def configuration
  end

  def configuration_update
    if current_user.update(bg_color_id: params[:bg_color_id])
      flash[:success] = "壁紙を適用しました"
    else
      flash[:warning] = "壁紙を適用できませんでした"
    end

    redirect_to configuration_tasks_path
  end

  private

  def task_params
    params.require(:task).permit(:title, :description, :priority, :category, :rate, :parent_task_id, :image)
  end

  def set_task
    @task = current_user.tasks.find(params[:id])
  end
end
