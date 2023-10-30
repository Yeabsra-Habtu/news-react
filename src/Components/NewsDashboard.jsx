import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
  Container,
  Card,
} from "react-bootstrap";
import axios from "axios";

function App() {
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      let url = "https://linesnews.onrender.com/api/news-datas";
      // Append category and search term to the URL if needed
      if (category) {
        url += `?category=${category}`;
      }
      if (searchTerm) {
        url += `&q=${searchTerm}`;
      }

      try {
        const response = await axios.get(url);
        setNewsData(response.data.data);
      } catch (error) {
        console.error("Error fetching news data: ", error);
      }
    };

    fetchNews();
  }, [category, searchTerm]);

  const handleCategoryClick = (category) => {
    setCategory(category);
    setSearchTerm("");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setCategory("");
    setSearchTerm(event.target.search.value);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-4">
            News App
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary">
                  Categories
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleCategoryClick("world")}>
                    World
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategoryClick("business")}>
                    Business
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategoryClick("technology")}>
                    Technology
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategoryClick("sports")}>
                    Sports
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategoryClick("entertainment")}>
                    Entertainment
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>

            <Form onSubmit={handleSearch} className="d-flex">
              <FormControl
                type="text"
                placeholder="Search"
                className="me-2"
                name="search"
              />

              <Button variant="outline-primary" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12} md={3}>
            <h5>Categories</h5>
            <Nav className="flex-column">
              <Nav.Link onClick={() => handleCategoryClick("world")}>
                World
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("business")}>
                Business
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("technology")}>
                Technology
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("sports")}>
                Sports
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("entertainment")}>
                Entertainment
              </Nav.Link>
            </Nav>
          </Col>

          <Col xs={12} md={9}>
            <Row>
              {newsData.map((newsItem) => (
                <Col key={newsItem.id} xs={12} md={6} lg={4}>
                  <Card className="mb-3">
                    <Card.Img variant="top" src={newsItem.attributes.newsIcon} />
                    <Card.Body>
                      <Card.Title>{newsItem.attributes.headline}</Card.Title>
                      <Card.Text>
                        <strong>Hashtags:</strong> {newsItem.attributes.hashtags}
                        <br />
                        <strong>Source:</strong> {newsItem.attributes.newsSource}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
