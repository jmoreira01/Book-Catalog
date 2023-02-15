import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import Toast from "../../helpers/Toast";
import { AuthorDTO } from "../../models/authors/AuthorDTO";
import { AuthorEditDTO, EditAuthorDTOSchema } from "../../models/authors/AuthorEditDTO";
import { AuthorService } from "../../services/AuthorService";
import "../../styles/authors/authorEdit.css"

const AuthorEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [author, setAuthor] = useState<AuthorDTO>({} as AuthorDTO);
    const authorService = new AuthorService();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthor({
            ...author,
            [name]: value,
        });
    };
    
    useEffect(() => {
        loadAuthor(parseInt(id));
    }, [id]);
    
    const loadAuthor = async (id) => {
        const response = await authorService.GetById(id);
        if (!response.success) {
            Toast.Show("error", "Error loading author");
            return;
        }
        
        if (!response.obj) {
            Toast.Show("error", "Author does not exist");
            return;
        }
        setAuthor(response.obj);
    };
    
    const updateAuthor = async () => {
        const responseValidate = EditAuthorDTOSchema.validate(author, {
            allowUnknown: true,
        });
        
        if (responseValidate.error) {
            Toast.Show("error", responseValidate.error.message);
            return;
        }
        
        const updatedAuthor: AuthorEditDTO = {
            id: parseInt(id),
            name: author.name,
            country: author.country,
        };

        const response = await authorService.Edit(updatedAuthor);
        if (!response.success) {
            Toast.Show("error", response.message);
            return;
        }
        
        Toast.Show("success", response.message);
        navigate(-1);
    };
    
    const deleteAuthor = async (id) => {
        const response = await authorService.DeleteAuthor(id);
        if (!response.success) {
            Toast.Show("error", response.message);
            return;
        }
        Toast.Show("success", response.message);
        navigate(-1);
    };

return (
        <div className="author-edit-container">
          <div className="author-edit-field">
            <label>Id:</label>
            <input type="number" value={id} readOnly />
          </div>
          <div className="author-edit-field">
            <label>Name:</label>
            <input type="text" name="name" value={author.name} onChange={handleChange} />
          </div>
          <div className="author-edit-field">
            <label>Country:</label>
            <input type="text" name="country" value={author.country} onChange={handleChange} />
          </div>
          <div className="author-edit-actions">
            <Button onClick={updateAuthor}>Save</Button>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
            <Button onClick={() => deleteAuthor(parseInt(id))}>Delete</Button>
          </div>
        </div>
      );
      };

export default AuthorEdit;