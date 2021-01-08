import React from 'react'
import {
    Col,
    Row,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Jumbotron
} from 'reactstrap';

const axios = require('axios')

export default class MainPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            red: '',
            green: '',
            blue: '',
            refColour: null,
            subColour: null,
            delta: null,
            perception: null,
        }
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (e) => {
        let request = {
            rgb: [this.state.red, this.state.green, this.state.blue]
        }
        try {
            let colourData = await axios.post('http://localhost:5000/arses/sendRGB', request)
            console.log(colourData.data)
            this.setState({
                delta: colourData.data.delta,
                refColour: colourData.data.referenceColour,
                subColour: colourData.data.subjectColour,
                perception: colourData.data.perception
            })
            console.log(this.state)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">Colour Calculator</h1>
                    <p className="lead">For to help</p>
                </Jumbotron>
                <Container>
                    <Form>
                        <Row form>
                            <Col md={3}></Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label for="exampleCity">R</Label>
                                    <Input type="number" name="red" id="red" onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label for="exampleState">G</Label>
                                    <Input type="number" name="green" id="green" onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label for="exampleZip">B</Label>
                                    <Input type="number" name="blue" id="blue" onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={3}></Col>
                        </Row>
                        <br></br>
                        <Button color="success" onClick={this.handleSubmit}>Check colour</Button>
                    </Form>
                    <br></br>
                    <Container>
                        Subject Colour: {this.state.subColour ? this.state.subColour.toString() : null}
                        <br></br>
                        Closest Ref Colour: {this.state.refColour ? this.state.refColour.toString() : null}
                        <br></br>
                        Delta: {this.state.delta ? this.state.delta.toFixed(4) : null}
                        <br></br>
                        Intepretation of delta: {this.state.perception ? this.state.perception : null}
                    </Container>
                </Container>
            </div>
        )
    }
}