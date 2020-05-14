import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import "./Form.css";
import Col from "react-bootstrap/Col";

function FormExample(props) {
    const validEmailRegex =
        RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const validPasswordRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)

    const validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            // if we have an error string set valid to false
            (val) => val.length > 0 && (valid = false) //If expr1 can be converted to true, returns expr2; else, returns expr1.
        );
        setValidate(valid);
    }

    const [stateErrors, setErrors] = useState({
        name: "",
        number: "Number must be 8 characters long.",
        email: "Provide a valid e-mail.",
        password: "Password must be minimum eight characters, at least one letter and one number.",
        text: "Enter your message.",
        selectOption: "",
        radioOption: "",
        checkboxOption: "",
    });
    const [validated, setValidate] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(stateErrors)) {
            console.info('Valid Form')
        } else {
            console.error('Invalid Form')
        }
    };

    const handleChange = (event) => {

        const {name, value} = event.target;
        let errors = stateErrors;

        switch (name) {
            case 'name':
                errors.name =
                    value.length < 2
                        ? 'Please provide name.'
                        : '';
                break;
            case 'number':
                errors.number =
                    value.length < 8
                        ? 'Number must be 8 characters long.'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Please provide a valid e-mail.';
                break;
            case 'password':
                errors.password =
                    validPasswordRegex.test(value)
                        ? ''
                        : 'Password must be minimum eight characters, at least one letter and one number.';
                break;
            case 'text':
                errors.text =
                    value.length < 1
                        ? 'Enter your message.'
                        : '';
                break;
            case 'radioBoxOption':
                errors.radioBoxOption =
                    value === true
                        ? ''
                        : 'Check radio option';
                break;
            case 'checkBoxOption':
                errors.checkboxOption =
                    value === undefined
                        ? 'Check checkbox option'
                        : '';
                break;
            default:
                break;
        }
        //setErrors({errors, [name]: value})
        //setErrors({errors, [name]: value});
        setErrors({...errors})
        console.log(errors)
        console.log(name)
        console.log(value)
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
                            {/*{stateErrors.name &&*/}
                            {/*<span className='error'>{stateErrors.name}</span>}*/}
                          <Form.Control.Feedback >
                            Looks ok.
                          </Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                            {stateErrors.name}
                          </Form.Control.Feedback>

                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="number">Number</Form.Label>
                            <Form.Control
                                type="number"
                                name="number"
                                onChange={handleChange}
                                required
                            />
                          <Form.Control.Feedback type="invalid">
                            {stateErrors.number}
                          </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                onChange={handleChange}
                                required
                            />
                          <Form.Control.Feedback type="invalid">
                            {stateErrors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={handleChange}
                                required
                            />
                          <Form.Control.Feedback type="invalid">
                            {stateErrors.password}
                          </Form.Control.Feedback>
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
                            />
                          <Form.Control.Feedback type="invalid">
                            {stateErrors.text}
                          </Form.Control.Feedback>
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
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Check
                                type="checkbox"
                                name="checkboxOption"
                                label="Checkbox Option"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            {" "}
                            <Button variant="danger" type="reset">
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
