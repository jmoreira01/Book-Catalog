import Select from "./Select";

export default function Input(props) {
  return (
    <div>
      {props.isBook ? (
        <div className="form-group">
          <label>ISBN:</label>
          <input
            type="number"
            className="form-control"
            name="isbn"
            onChange={props.onChange}
            value={props.isbn}
          />
          <br />
          <label>TITLE:</label>
          <input
            type="text"
            className="form-control"
            name="title"
            onChange={props.onChange}
            value={props.title}
          />
          <br />
          <label>AUTHOR:</label>
          <input
            type="text"
            className="form-control"
            name="author"
            onChange={props.onChange}
            value={props.author}
          />
          <br />
          <Select value={props.id} onChange={props.onChange} />
          <br />
          <label>PRICE:</label>
          <input
            type="number"
            className="form-control"
            name="price"
            onChange={props.onChange}
            value={props.price}
          />
        </div>
      ) : (
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={props.onChange}
            value={props.name}
          />
          <br />
          <label>País:</label>
          <input
            type="text"
            className="form-control"
            name="nacionality"
            onChange={props.onChange}
            value={props.nacionality}
          />
          <br />
          <label>Imagem:</label>
          <input
            type="text"
            className="form-control"
            name="image"
            onChange={props.onChange}
            value={props.image}
          />
        </div>
      )}
    </div>
  );
}