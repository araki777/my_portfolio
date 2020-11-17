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
    @q = current_user.tasks.ransack(params[:q])
    @tasks = @q.result(distinct: true).recent.page(params[:page]).per(10)
  end

  def new
    @task = Task.new
  end

  def create
    @task = current_user.tasks.new(task_params)
    if @task.save
      flash[:success] = "タスク「#{@task.title}」を登録しました。"
      redirect_to main_tasks_path
    else
      render :new
    end
  end

  def show
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

  private

  def task_params
    params.require(:task).permit(:title, :description, :priority, :category, :rate, :image)
  end

  def set_task
    @task = current_user.tasks.find(params[:id])
  end
end
