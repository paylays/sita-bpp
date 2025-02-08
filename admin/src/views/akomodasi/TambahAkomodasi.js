import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Card from '../../components/Card';
import axios from 'axios';

const TambahAkomodasi = () => {
  const [formData, setFormData] = useState({
    kategori_akomodasi: '',
    nama_akomodasi: '',
    deskripsi_akomodasi: '',
    jumlah_kamar_tersedia: '',
    harga_kamar: '',
    fasilitas: '',
    no_whatsapp: '',
    alamat: '',
    link_gmaps: '',
  });

  const kategoriList = [
    { id: 1, name: 'Agen Perjalanan Wisata' },
    { id: 1, name: 'Biro Perjalanan Wisata' },
    { id: 1, name: 'Guest House' },
    { id: 1, name: 'Homestay' },
    { id: 2, name: 'Hotel Bintang 1' },
    { id: 3, name: 'Hotel Bintang 2' },
    { id: 4, name: 'Hotel Bintang 3' },
    { id: 5, name: 'Hotel Bintang 4' },
    { id: 6, name: 'Hotel Bintang 5' },
    { id: 7, name: 'Hotel Non-Bintang' },
    { id: 9, name: 'Vila' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (form.checkValidity()) {
      try {
        const response = await axios.post('http://localhost:5000/api/accomodations/create', formData);
        console.log('Akomodasi berhasil ditambahkan:', response.data);

        // Reset form dan validasi
        setFormData({
          kategori_akomodasi: '',
          nama_akomodasi: '',
          deskripsi_akomodasi: '',
          jumlah_kamar_tersedia: '',
          harga_kamar: '',
          fasilitas: '',
          no_whatsapp: '',
          alamat: '',
          link_gmaps: '',
        });
      } catch (error) {
        console.error('Error saat menambahkan akomodasi:', error);
      } 
    }
  };


  return(
    <>
      <div>
          <Row>
            <Col sm="12" lg="12">
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                      <div className="header-title">
                        <h4 className="card-title"> Form Tambah Akomodasi</h4>
                      </div>
                  </Card.Header>
                  <Card.Body>
                      <p>Mohon mengisi data akomodasi dengan benar.</p>
                      <Form  onSubmit={handleSubmit}>
                        <Row>
                          <Col md="4" className="mb-3">
                            <Form.Label htmlFor="nama_akomodasi">Nama Akomodasi</Form.Label>
                            <Form.Control
                              type="text"
                              id="nama_akomodasi"
                              name="nama_akomodasi"
                              value={formData.nama_akomodasi}
                              onChange={handleChange}
                              required
                            />
                          </Col>
                          <Col md="4" className="mb-3">
                            <Form.Label htmlFor="deskripsi_akomodasi">Deskripsi</Form.Label>
                            <Form.Control
                              as="textarea"
                              id="deskripsi_akomodasi"
                              name="deskripsi_akomodasi"
                              value={formData.deskripsi_akomodasi}
                              onChange={handleChange}
                              required
                              rows={1}
                            />
                          </Col>
                          <Col md="4" className="mb-3">
                            <Form.Label htmlFor="kategori_akomodasi">Kategori Akomodasi</Form.Label>
                            <Form.Select
                              id="kategori_akomodasi"
                              name="kategori_akomodasi"
                              value={formData.kategori_akomodasi}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Pilih Kategori</option>
                              {kategoriList.map((kategori) => (
                                <option key={kategori.id} value={kategori.name}>
                                  {kategori.name}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                          <Col md="3" className="mb-3">
                            <Form.Label htmlFor="alamat">Alamat</Form.Label>
                            <Form.Control
                              as="textarea"
                              id="alamat"
                              name="alamat"
                              value={formData.alamat}
                              onChange={handleChange}
                              required
                              rows={1}
                            />
                          </Col>
                          <Col md="3" className="mb-3">
                            <Form.Label htmlFor="jumlah_kamar_tersedia">Jumlah Kamar Tersedia</Form.Label>
                            <Form.Control
                              type="text"
                              id="jumlah_kamar_tersedia"
                              name="jumlah_kamar_tersedia"
                              value={formData.jumlah_kamar_tersedia}
                              onChange={handleChange}
                              required
                            />
                          </Col>
                          <Col md="3" className="mb-3">
                            <Form.Label htmlFor="harga_kamar">Harga Kamar</Form.Label>
                            <Form.Control
                              type="text"
                              id="harga_kamar"
                              name="harga_kamar"
                              value={formData.harga_kamar}
                              onChange={handleChange}
                              required
                            />
                          </Col>
                          <Col md="3" className="mb-3">
                            <Form.Label htmlFor="no_whatsapp">No. Whatsapp</Form.Label>
                            <Form.Control
                              type="text"
                              id="no_whatsapp"
                              name="no_whatsapp"
                              value={formData.no_whatsapp}
                              onChange={handleChange}
                              required
                            />
                          </Col>
                          <Col md="6" className="mb-3">
                            <Form.Label htmlFor="fasilitas">Fasilitas</Form.Label>
                            <Form.Control
                              as="textarea"
                              id="fasilitas"
                              name="fasilitas"
                              value={formData.fasilitas}
                              onChange={handleChange}
                              required
                              rows={1}
                            />
                          </Col>
                          <Col md="6" className="mb-3">
                            <Form.Label htmlFor="link_gmaps">Link Gmaps</Form.Label>
                            <Form.Control
                              type="text"
                              id="link_gmaps"
                              name="link_gmaps"
                              value={formData.link_gmaps}
                              onChange={handleChange}
                              required
                            />
                          </Col>
                        </Row>
                        <Form.Group>
                          <Button 
                            type="submit"
                          >Simpan
                          </Button>
                        </Form.Group>
                      </Form>
                  </Card.Body>
                </Card>
            </Col>
          </Row>
      </div>
    </>
  )
}

export default TambahAkomodasi