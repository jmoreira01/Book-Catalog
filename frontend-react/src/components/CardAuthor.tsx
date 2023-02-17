import "../styles/components/authorCard.css";

export default function CardAuthor(props) {
  return (
    <div className="card md:flex max-w-lg" key={props.id}>
      <div className="flex-grow text-center md:text-left mb-0">
        <h4 className="heading my-0">{props.name}</h4>
        <div>
          <span className="chip ~info mb-1">{props.country}</span>
        </div>
      </div>
    </div>
  );
}
