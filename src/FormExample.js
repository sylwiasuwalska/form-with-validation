import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Form.css";
import Col from "react-bootstrap/Col";

function FormExample(props) {
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  const validPasswordRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
  const [validated, setValidate] = useState(false);

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false) //If expr1 can be converted to true, returns expr2; else, returns expr1.
    );
    setValidate(valid);
    return valid;
  };
  const initialErrors = {
    name: "Please, provide a name.",
    number: "Number must be 8 characters long.",
    email: "Please provide a valid e-mail.",
    password: "Password must be minimum eight characters, at least one letter and one number.",
    text: "Enter your message.",
    selectOption: "",
    radioBoxOption: "One of these options is required.",
    checkboxOption: "This checkbox is required.",
  };

  const [stateErrors, setErrors] = useState(initialErrors);

  const handleSubmit = (event) => {
    event.preventDefault();
    validateForm(stateErrors);
  };

  const handleChange = (event) => {
    setValidate(false);
    const { name, value } = event.target;
    let errors = stateErrors;

    switch (name) {
      case "name":
        errors.name = value.length < 2 ? "Please, provide name." : "";
        break;
      case "number":
        errors.number =
          value.length < 8 ? "Number must be 8 characters long." : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "Please provide a valid e-mail.";
        break;
      case "password":
        errors.password = validPasswordRegex.test(value)
          ? ""
          : "Password must be minimum eight characters, at least one letter and one number.";
        break;
      case "text":
        errors.text = value.length < 5 ? "Enter your message." : "";
        break;
      case "radioBoxOption":
        errors.radioBoxOption = event.target.checked
          ? ""
          : "One of these options is required.";
        break;
      case "checkBoxOption":
        errors.checkboxOption = event.target.checked
          ? ""
          : "This checkbox is required.";
        break;
      default:
        break;
    }
    //setErrors({errors, [name]: value})
    //setErrors({errors, [name]: value});
    setErrors({ ...errors });
    console.log(errors);
    console.log(name);
    console.log(value);

    // })
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h2>Form</h2>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                isInvalid={!!stateErrors.name}
              />
              {stateErrors.name && (
                <small className="error">{stateErrors.name}</small>
              )}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label htmlFor="number">Number</Form.Label>
              <Form.Control
                type="number"
                name="number"
                onChange={handleChange}
                isInvalid={!!stateErrors.number}
              />
              {stateErrors.number && (
                <small className="error">{stateErrors.number}</small>
              )}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                isInvalid={!!stateErrors.email}
              />
              {stateErrors.email && (
                <small className="error">{stateErrors.email}</small>
              )}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                isInvalid={!!stateErrors.password}
              />
              {stateErrors.password && (
                <small className="error">{stateErrors.password}</small>
              )}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label htmlFor="textarea">Text</Form.Label>
              <Form.Control
                name="text"
                as="textarea"
                rows="4"
                onChange={handleChange}
                isInvalid={!!stateErrors.text}
              />
              {stateErrors.text && (
                <small className="error">{stateErrors.text}</small>
              )}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label htmlFor="select">Select</Form.Label>
              <Form.Control name="select" as="select" onChange={handleChange}>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
                <option>Option 5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Check
                type="radio"
                name="radioBoxOption"
                label="RadioBox Option 1"
                value="radioBoxOption1"
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                name="radioBoxOption"
                label="RadioBox Option 2"
                value="radioBoxOption2"
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                name="radioBoxOption"
                label="RadioBox Option 3"
                value="radioBoxOption3"
                onChange={handleChange}
              />
              {stateErrors.radioBoxOption && (
                <small className="error">{stateErrors.radioBoxOption}</small>
              )}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Check
                type="checkbox"
                name="checkBoxOption"
                label="Checkbox Option"
                onChange={handleChange}
                required
              />
              {stateErrors.checkboxOption && (
                <small className="error">{stateErrors.checkboxOption}</small>
              )}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              {" "}
              <Button
                variant="danger"
                type="reset"
                onClick={() => {setErrors(initialErrors); setValidate(false)}}
              >
                Reset
              </Button>
            </Form.Group>
            <Form.Group as={Col}>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
    </div>
  );
}

export default FormExample;
