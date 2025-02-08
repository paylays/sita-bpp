import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Card from '../../components/Card';
import axios from 'axios';

const TambahKreasiLokal = () => {
  const [formData, setFormData] = useState({
    kategori_ekraf:'',
    nama_ekraf: '',
    deskripsi_ekraf: '',
    jam_operasional: '',
    harga_produk: '',
    no_whatsapp:'',
    alamat: '',
    link_gmaps: ''
  });

  const kategoriList = [
    { id: 1, name: 'Kuliner' },
    { id: 2, name: 'Kriya' },
    { id: 3, name: 'Fashion' },
    { id: 4, name: 'Seni Rupa' },
    { id: 5, name: 'Seni Pertunjukan' },
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
        const response = await axios.post('http://localhost:5000/api/localcreations/create', formData);
        console.log('Kreasi Lokal berhasil ditambahkan:', response.data);

        // Reset form dan validasi
        setFormData({
          kategori_ekraf:'',
          nama_ekraf: '',
          deskripsi_ekraf: '',
          jam_operasional: '',
          harga_produk: '',
          no_whatsapp:'',
          alamat: '',
          link_gmaps: ''
        });
      } catch (error) {
        console.error('Error saat menambahkan kreasi lokal:', error);
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
                        <h4 className="card-title"> Form Tambah Kreasi Lokal</h4>
                      </div>
                  </Card.Header>
                  <Card.Body>
                      <p>Mohon mengisi data kreasi lokal dengan benar.</p>
                      <Form  onSubmit={handleSubmit}>
                        <Row>
                          <Col md="4" className="mb-3">
                            <Form.Label htmlFor="nama_destinasi">Nama Ekraf</Form.Label>
                            <Form.Control
                              type="text"
                              id="nama_ekraf"
                              name="nama_ekraf"
                              value={formData.nama_ekraf}
                              onChange={handleChange}
                              required
                            />
                          </Col>
                          <Col md="4" className="mb-3">
                            <Form.Label htmlFor="deskripsi_ekraf">Deskripsi</Form.Label>
                            <Form.Control
                              as="textarea"
                              id="deskripsi_ekraf"
                              name="deskripsi_ekraf"
                              value={formData.deskripsi_ekraf}
                              onChange={handleChange}
                              required
                              rows={1}
                            />
                          </Col>
                          <Col md="4" className="mb-3">
                            <Form.Label htmlFor="kategori_ekraf">Kategori Kreasi Lokal</Form.Label>
                            <Form.Select
                              id="kategori_ekraf"
                              name="kategori_ekraf"
                              value={formData.kategori_ekraf}
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
                          <Col md="4" className="mb-3">
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
                          <Col md="4" className="mb-3">
                            <Form.Label htmlFor="jam_operasional">Jam Operasional</Form.Label>
                            <Form.Control
                              type="text"
                              id="jam_operasional"
                              name="jam_operasional"
                              value={formData.jam_operasional}
                              onChange={handleChange}
                              required
                            />
                          </Col>
                          <Col md="4" className="mb-3">
                            <Form.Label htmlFor="harga_produk">Harga Produk</Form.Label>
                            <Form.Control
                              type="text"
                              id="harga_produk"
                              name="harga_produk"
                              value={formData.harga_produk}
                              onChange={handleChange}
                              required
                            />
                          </Col>
                          <Col md="6" className="mb-3">
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

export default TambahKreasiLokal