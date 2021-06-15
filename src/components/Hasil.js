import React, { Component } from "react";
import { Col, Row, ListGroup, Badge, Button, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleClose();
    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };

    axios.put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data).then((res) => {
      this.props.getListKeranjang();
      swal({
        title: "Update Pesanan!",
        text: "Telah Sukses Update Pesanan",
        icon: "success",
        button: false,
        timer: 2000,
      });
    });
  };

  hapusPesanan = (id) => {
    this.handleClose();

    axios.delete(API_URL + "keranjangs/" + id).then((res) => {
      this.props.getListKeranjang();
      swal({
        title: "Hapus Pesanan!",
        text: "Telah Sukses Hapus Pesanan",
        icon: "error",
        button: false,
        timer: 2000,
      });
    });
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} className="mt-3">
        <h4>
          <strong>Daftar Pesanan</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {keranjangs.map((menuKeranjang) => (
                <ListGroup.Item key={menuKeranjang.id}>
                  <Row>
                    <Col xs={2}>
                      <h4>
                        <Badge pill variant="success">
                          {menuKeranjang.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <p style={{ fontWeight: 700 }}>
                        <strong>{menuKeranjang.product.nama}</strong>
                      </p>
                      <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                      <p>
                        Note : <span>{menuKeranjang.keterangan}</span>
                      </p>
                    </Col>
                    <Col>
                      <strong>Rp. {numberWithCommas(menuKeranjang.total_harga)}</strong>
                      <br />
                      <Button className="float-right primary mt-5 mr-5 btn-shape" onClick={() => this.handleShow(menuKeranjang)}>
                        Edit
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan} />
            </ListGroup>
          </Card>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
