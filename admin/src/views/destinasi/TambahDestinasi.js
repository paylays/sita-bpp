import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Card from '../../components/Card';
import axios from 'axios';

const TambahDestinasi = () => {
  const [formData, setFormData] = useState({
    nama_destinasi: '',
    deskripsi_destinasi: '',
    jam_operasional: '',
    harga_tiket: '',
    fasilitas: '',
    aktivitas: '',
    alamat: '',
    link_gmaps: '',
    kategori_destinasi: '',
  });

  const kategoriList = [
    { id: 1, name: 'Wisata Alam' },
    { id: 2, name: 'Wisata Buatan' },
    { id: 3, name: 'Wisata Sejarah' },
    { id: 4, name: 'Wisata Religi' },
    { id: 5, name: 'Wisata Bahari' },
    { id: 6, name: 'Wisata Belanja' },
    { id: 7, name: 'Wisata Kuliner' },
    { id: 8, name: 'Wisata Olahraga' },
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
        const response = await axios.post('http://localhost:5000/api/destinations/create', formData);
        console.log('Destinasi berhasil ditambahkan:', response.data);

        // Reset form dan validasi
        setFormData({
          nama_destinasi: '',
          deskripsi_destinasi: '',
          jam_operasional: '',
          harga_tiket: '',
          fasilitas: '',
          aktivitas: '',
          alamat: '',
          link_gmaps: '',
          kategori_destinasi: '',
        });
      } catch (error) {
        console.error('Error saat menambahkan destinasi:', error);
      } 
    }
  };  

  return (
      <>
        <div>
            <Row>
              <Col sm="12" lg="12">
                  <Card>
                    <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                          <h4 className="card-title"> Form Tambah Destinasi</h4>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <p>Mohon mengisi data destinasi dengan benar.</p>
                        <Form  onSubmit={handleSubmit}>
                          <Row>
                            <Col md="4" className="mb-3">
                              <Form.Label htmlFor="nama_destinasi">Nama Destinasi</Form.Label>
                              <Form.Control
                                type="text"
                                id="nama_destinasi"
                                name="nama_destinasi"
                                value={formData.nama_destinasi}
                                onChange={handleChange}
                                required
                              />
                            </Col>
                            <Col md="4" className="mb-3">
                              <Form.Label htmlFor="deskripsi_destinasi">Deskripsi</Form.Label>
                              <Form.Control
                                as="textarea"
                                id="deskripsi_destinasi"
                                name="deskripsi_destinasi"
                                value={formData.deskripsi_destinasi}
                                onChange={handleChange}
                                required
                                rows={1}
                              />
                            </Col>
                            <Col md="4" className="mb-3">
                              <Form.Label htmlFor="kategori_destinasi">Kategori Destinasi</Form.Label>
                              <Form.Select
                                id="kategori_destinasi"
                                name="kategori_destinasi"
                                value={formData.kategori_destinasi}
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
                            <Col md="3" className="mb-3">
                              <Form.Label htmlFor="harga_tiket">Harga Tiket</Form.Label>
                              <Form.Control
                                type="text"
                                id="harga_tiket"
                                name="harga_tiket"
                                value={formData.harga_tiket}
                                onChange={handleChange}
                                required
                              />
                            </Col>
                            <Col md="3" className="mb-3">
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
                              <Form.Label htmlFor="aktivitas">Aktivitas</Form.Label>
                              <Form.Control
                                as="textarea"
                                id="aktivitas"
                                name="aktivitas"
                                value={formData.aktivitas}
                                onChange={handleChange}
                                required
                                rows={1}
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

export default TambahDestinasi