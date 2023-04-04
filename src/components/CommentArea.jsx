import { useState, useEffect } from "react";
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";

let CommentArea = (props) => {
  let [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.asin]);

  let fetchComments = async () => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJjMmQ3MDBlNzg3MDAwMTRkODkzNzgiLCJpYXQiOjE2ODA2MTY4MTYsImV4cCI6MTY4MTgyNjQxNn0.RM5ZqHurjdUU37OM3j96dDbdt7JKCIcmC55cbX91suQ",
          },
        }
      );

      if (response.ok) {
        const commentsArr = await response.json();
        console.log("data retrieved, setState imminent....");

        setComments(commentsArr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AddComment asin={props.asin} fetchComments={fetchComments} />
      <CommentsList comments={comments} />
    </div>
  );
};

export default CommentArea;
