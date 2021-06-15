import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Hasil, ListCategories, Menus, NavbarComponent } from "../components";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      kategoriYangDipilih: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios.get(API_URL + "products?category.nama=" + this.state.kategoriYangDipilih).then((res) => {
      const menus = res.data;
      this.setState({ menus });
    });

    this.getListKeranjang();
  }

  //   componentDidUpdate(prevState) {
  //     if (this.state.keranjangs !== prevState.keranjangs) {
  //       axios.get(API_URL + "keranjangs").then((res) => {
  //         const keranjangs = res.data;
  //         this.setState({ keranjangs });
  //       });
  //     }
  //   }

  getListKeranjang = () => {
    axios.get(API_URL + "keranjangs").then((res) => {
      const keranjangs = res.data;
      this.setState({ keranjangs });
    });
  };

  changeCategory = (value) => {
    this.setState({
      kategoriYangDipilih: value,
      menus: [],
    });

    axios.get(API_URL + "products?category.nama=" + value).then((res) => {
      const menus = res.data;
      this.setState({ menus });
    });
  };

  masukKeranjang = (value) => {
    axios.get(API_URL + "keranjangs?product.id=" + value.id).then((res) => {
      if (res.data.length === 0) {
        const keranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
        };

        axios.post(API_URL + "keranjangs", keranjang).then((res) => {
          this.getListKeranjang();
          swal({
            title: "Sukses Masuk Keranjang",
            text: keranjang.product.nama + " Telah Sukses Masuk Keranjang",
            icon: "success",
            button: false,
            timer: 2000,
          });
        });
      } else {
        const keranjang = {
          jumlah: res.data[0].jumlah + 1,
          total_harga: res.data[0].total_harga + value.harga,
          product: value,
        };
        axios.put(API_URL + "keranjangs/" + res.data[0].id, keranjang).then((res) => {
          swal({
            title: "Sukses Masuk Keranjang",
            text: keranjang.product.nama + " Telah Sukses Masuk Keranjang",
            icon: "success",
            button: false,
            timer: 2000,
          });
        });
      }
    });
  };

  render() {
    const { menus, kategoriYangDipilih, keranjangs } = this.state;
    return (
      <div className="mt-4">
        <Container fluid>
          <Row>
            <ListCategories changeCategory={this.changeCategory} kategoriYangDipilih={kategoriYangDipilih} />
            <Col className="mt-3">
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row className="overflow-auto menu">{menus && menus.map((menu) => <Menus key={menu.id} menu={menu} masukKeranjang={this.masukKeranjang} />)}</Row>
            </Col>
            <Hasil keranjangs={keranjangs} {...this.props} getListKeranjang={this.getListKeranjang} />
          </Row>
        </Container>
      </div>
    );
  }
}
