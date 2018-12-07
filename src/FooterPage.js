import React from "react";
import { Col, Container, Row, Footer } from "mdbreact";

class FooterPage extends React.Component {
    render() {
        return (
        <Footer color="black" className="font-small pt-4 mt-4">
            <Container fluid className="text-center text-md-left">
                <Row>
                    <Col md="6">
                        <h5 className="title">Made By:</h5>
                        <p>Chai Gangavarapu, Kyler Sakumoto, Ash Israni, Brandon Hong</p>
                    </Col>
                    <Col md="6">
                        <h5 className="title">Contact Information:</h5>
                        <p><a href="mailto:chaitanya.gangavarapu@gmail.com">chaitanya.gangavarapu@gmail.com</a></p>
                    </Col>
                </Row>
            </Container>
            <div className="footer-copyright text-center py-3">
                <Container fluid>
                    &copy; {new Date().getFullYear()} Copyright:{" Spotify Stats"}
                </Container>
            </div>
        </Footer>
        );
    }
}

export default FooterPage;