import Select from "./Select";

const Input = (props) => {
  return (
    <div className="custom-input-container">
      {props.isBook ? (
        <div>
          <div className="custom-input-label">ISBN:</div>
          <input
            type="number"
            className="custom-input"
            name="isbn"
            onChange={props.onChange}
            value={props.isbn}
          />
          <div className="custom-input-label">TITLE:</div>
          <input
            type="text"
            className="custom-input"
            name="title"
            onChange={props.onChange}
            value={props.title}
          />
          <div className="custom-input-label">AUTHOR:</div>
          <input
            type="text"
            className="custom-input"
            name="author"
            onChange={props.onChange}
            value={props.author}
          />
          <Select value={props.id} onChange={props.onChange} />
          <div className="custom-input-label">PRICE:</div>
          <input
            type="number"
            className="custom-input"
            name="price"
            onChange={props.onChange}
            value={props.price}
          />
        </div>
      ) : (
        <div>
          <div className="custom-input-label">Nome:</div>
          <input
            type="text"
            className="custom-input"
            name="name"
            onChange={props.onChange}
            value={props.name}
          />
          <div className="custom-input-label">Country:</div>
          <input
            type="text"
            className="custom-input"
            name="nacionality"
            onChange={props.onChange}
            value={props.nacionality}
          />
        </div>
      )}
    </div>
  );
};

export default Input;