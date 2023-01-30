import "bootstrap/dist/css/bootstrap.min.css";

export default function CardBook (props) {
  return (
    <div className="book-card" key={props.id}>
          <div className="book-info">
            <span className="book-title">{props.title}</span>
            <span className="book-author">{props.authorName}</span>
            <span className="book-price">{props.price}</span>
          </div>
          <div className="book-image">
            <img src={props.image} alt={props.title} />
          </div>
      </div>
  );
}