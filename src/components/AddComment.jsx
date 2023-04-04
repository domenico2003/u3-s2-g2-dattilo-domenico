import { useState } from "react";
import { Button, Form } from "react-bootstrap";

let AddComment = (props) => {
  // state = {
  //   commentObj: {
  //     comment: "",
  //     rate: "1",
  //     elementId: this.props.asin,
  //   },
  // };

  let [rate, setRate] = useState("1");
  let [comment, setComment] = useState("");

  let sendComment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/",
        {
          method: "POST",
          body: JSON.stringify({
            comment,
            rate,
            elementId: props.asin,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJjMmQ3MDBlNzg3MDAwMTRkODkzNzgiLCJpYXQiOjE2ODA2MTY4MTYsImV4cCI6MTY4MTgyNjQxNn0.RM5ZqHurjdUU37OM3j96dDbdt7JKCIcmC55cbX91suQ",
          },
        }
      );
      if (response.ok) {
        props.fetchComments();
        setRate("1");
        setComment("");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Form onSubmit={sendComment}>
      <Form.Group className="mb-3" controlId="comment">
        <Form.Label>Commento</Form.Label>
        <Form.Control
          type="text"
          placeholder="Inserisci il commento"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="comment">
        <Form.Label>Voto</Form.Label>
        <Form.Select
          value={rate}
          onChange={(e) => {
            setRate(e.target.value);
          }}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Select>
      </Form.Group>

      <Button type="submit" variant="primary">
        Invia commento
      </Button>
    </Form>
  );
};

export default AddComment;
