import { useState } from "react";
import Toast from "../helpers/Toast";
import { AuthorService } from "../services/AuthorService";

export default function Selects(props){
    const [authors, setAuthors] = useState([]);
    const authorService = new AuthorService();
    
    const getAuthors = async () => {
        var response = await authorService.GetAll(1, 100,"", "Nome");
        
        if (response.success !== true) {
            Toast.Show("error", "Erro ao carregar o autor!");
            return;
        }

        if (response.items == null) {
            Toast.Show("error", "Autor não existe!");
            return;
        }
        setAuthors(response.items);
    };

    getAuthors();
    
    return(
        <div>
            <label>Author </label> <br />
                
                <select
                className="custom-input"
                    style={{width: "465px", borderRadius: "5px", borderColor: "lightgray", height: "40px",}}
                    name="authorId"
                    onChange={props.onChange}
                    value={props.value}>

                    <option>select</option>
                    {authors.map((author) => (
                        <option value={author.id} key={author.id}>
                            {author.name}
                        </option>
                    ))}

                </select>
                <br /><br />
        </div>
    );
}

