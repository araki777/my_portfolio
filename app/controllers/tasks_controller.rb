class TasksController < TasksManagerController
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  def todo
    @q = current_user.tasks.where(done: false).ransack(params[:q])
    @tasks = @q.result(distinct: true).recent.page(params[:page]).per(10)
  end

  def done
    @q = current_user.tasks.where(done: true).ransack(params[:q])
    @tasks = @q.result(distinct: true).recent.page(params[:page]).per(10)
  end

  def new
    @task = Task.new
  end

  def create
    @task = current_user.tasks.new(task_params)
    if @task.save
      flash[:success] = "タスク「#{@task.title}」を登録しました。"
      redirect_to tasks_url
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
      redirect_to tasks_url
    else
      render :edit
    end
  end

  def destroy
    @task.destroy
    flash[:warning] = "タスク「#{@task.title}」を削除しました。"
    redirect_to tasks_url
  end

  private

  def task_params
    params.require(:task).permit(:title, :description, :image)
  end

  def set_task
    @task = current_user.tasks.find(params[:id])
  end
end
