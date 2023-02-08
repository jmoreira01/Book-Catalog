import "bootstrap/dist/css/bootstrap.min.css";

export default function CardAuthor (props) {
  return (
    <div className="author-card" key={props.id}>
          <div className="book-info">
            <span className="author-name">{props.name}</span>
            <span className="author-country">{props.country}</span>
            <span className="author-title">{props.authorTitle}</span>
          </div>
      </div>
  );
}