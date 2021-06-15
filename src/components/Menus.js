import React from "react";
import { Col, Card, Button, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow">
        <Card.Img variant="top" src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar} />
        <Card.Body>
          <Card.Title>
            <strong>
              {menu.nama} ({menu.kode})
            </strong>
          </Card.Title>
          <Col>
            <Row>
              <strong>
                <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
              </strong>
            </Row>
            <Row className="float-right">
              <Button className="btn-shape float-right" onClick={() => masukKeranjang(menu)}>
                Add
              </Button>
            </Row>
          </Col>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
