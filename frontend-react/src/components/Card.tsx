import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card"

export default function Cards(props) {
  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      {props.isBook ? (
        <Card.Img variant="top" src={props.image} />
      ) : null}
      <Card.Body>
        <Card.Title>{props.isBook ? props.title : props.name}</Card.Title>
        <Card.Text>
          {props.isBook ? (
            <div>
              <b>ISBN: </b>
              {props.isbn}
              <br></br>
              <b>AUTHOR: </b>
              {props.authorName}
              <br></br>
              <b>PRICE: </b>
              {parseFloat(props.price)
                .toFixed(2)
                .toString()
                .replace(".", ",")}
              €
            </div>
          ) : (
            <div>
              <b>País: </b>
              {props.nacionality}
              <br></br>
              <b>Livros: </b>
              {props.authorTitle}
            </div>
          )}
        </Card.Text>
        </Card.Body>
    </Card>
  );
}