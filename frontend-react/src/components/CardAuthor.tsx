import "../styles/components/authorCard.css";

export default function CardAuthor (props) {
  return (
    <div className="author-card" key={props.id}>
          <div className="book-info">
            <h1 className="author-name">{props.name} <br /> </h1>
            <h3>{props.country}</h3>
            </div>
      </div>
  );
}