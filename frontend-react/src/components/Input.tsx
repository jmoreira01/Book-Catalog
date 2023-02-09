import AuthorSelect from "./AuthorSelect";

const Input = (props) => {
  return (
    <div className="custom-input-container">
      {props.isBook ? (
        <div>
          <div className="custom-input-label">Isbn:</div>
          <input
            type="number"
            className="custom-input"
            name="isbn"
            onChange={props.onChange}
            value={props.isbn}
          />
          <div className="custom-input-label">Title:</div>
          <input
            type="text"
            className="custom-input"
            name="title"
            onChange={props.onChange}
            value={props.title}
          />
          <AuthorSelect
                        value={props.name}
                        onChange={props.onChange}
                    />
          <div className="custom-input-label">Price:</div>
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
          <div className="custom-input-label">Name:</div>
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
            name="country"
            onChange={props.onChange}
            value={props.country}
          />
        </div>
      )}
    </div>
  );
};

export default Input;