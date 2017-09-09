class CommentsController < ApplicationController

  def create
    @thesis = Thesis.find(params[:thesis_id])
    if @thesis.nil?
      logger.error("Internal server error: CommentsController create action 3 lines: @theses is undefined")
      render_500
    end

    @comment = @thesis.comments.create(body: trim_multiple_newlines(comment_params[:body]), user_id: session[:user_id])
    redirect_to thesis_path(@thesis)
  end
  
  private
    def comment_params
      params.require(:comment).permit(:body)
    end

    def trim_multiple_newlines(comment)
      comment.gsub(/\R{2,}/,"\n")
    end
end
