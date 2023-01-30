import { useState } from "react";
import Toast from "../helpers/Toast";
//import { AuthorService } from "../services/AuthorService";

export default function Selects(props) {
  /*const [authors, setAuthors] = useState([]);
  const authorService = new AuthorService();

  const loadAuthors = async () => {
    var response = await authorService.GetAll(1, 100, "", "Nome");

    if (response.success !== true) {
      Toast.Show("error", "Author not found!");
      return;
    }

    if (response.items == null) {
      Toast.Show("error", "Author Unknown!");
      return;
    }
    setAuthors(response.items);
  };

  loadAuthors();*/

  return (
    <div></div>   /*<div>
      <label>Author:</label>
      <br />
      <select
        style={{
          width: "200px",
          padding: "10px",
          fontSize: "1rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
        name="author"
        onChange={props.onChange}
        value={props.value}
      >
        <option>Selecionar</option>
        {authors.map((author) => (
          <option value={author.id} key={author.id}>
            {author.name}
          </option>
        ))}
      </select>
    </div>*/
  );
}
