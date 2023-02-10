import { useState } from "react";
import { Button } from "reactstrap";
import { AuthorService } from "../../services/AuthorService";
import {
  AuthorCreateDTO,
  CreateAuthorDTOSchema,
} from "../../models/authors/AuthorCreateDTO";
import { useNavigate } from "react-router-dom";
import Toast from "../../helpers/Toast";
import "../../styles/authorCreation.css";
import Input from "../../components/Input";

export default function AuthorCreate() {
  const [author, setAuthor] = useState(new AuthorCreateDTO());
  const navigate = useNavigate();
  const authorService = new AuthorService();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor({
      ...author,
      [name]: value,
    });
  };

  const newAuthor = async () => {
    const responseValidate = CreateAuthorDTOSchema.validate(author, {
      allowUnknown: true,
    });

    if (responseValidate.error) {
      Toast.Show("error", responseValidate.error.message);
      return;
    }
    const response = await authorService.Create(author);
    if (!response.success) {
      Toast.Show("error", response.message);
      return;
    }
    Toast.Show("success", response.message);
    navigate(-1);
  };

  return (
    <div className="newAuthorContainer">
      <h2>Author Creation</h2>
      <div className="form-group">
        <Input onChange={handleChange} />
        <Button variant="outline-success" onClick={newAuthor}>
          Add
        </Button>{" "}
        <Button variant="outline-danger" onClick={() => navigate(-1)}>
          Go Back
        </Button>{" "}
      </div>
    </div>
  );
}
