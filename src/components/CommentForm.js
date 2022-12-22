import React from 'react';

function CommentForm(props) {
  const { id } = props;

  return (
    <div>
      <form
        method="POST"
        action={`http://localhost:3001/post/${id}/new_comment`}
      >
        <fieldset>
          <legend>New Comment</legend>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title" required />
          </div>
          <div className="form-group">
            <label htmlFor="content">Comment:</label>
            <input type="text" name="content" id="content" required />
          </div>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default CommentForm;
