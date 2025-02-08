import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Card from '../../components/Card';
import axios from 'axios';

const TambahAcara = () => {
  const [formData, setFormData] = useState({
    penyelenggara_acara: '',
    judul_acara: '',
    deskripsi_acara: '',
    status_acara: 'upcoming',
    tanggal_mulai_acara: '',
    tanggal_selesai_acara: '',
    waktu_acara: '',
    gambar_acara: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData(prev => ({
        ...prev,
        [name]: files[0], 
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    const data = new FormData();
    data.append("penyelenggara_acara", formData.penyelenggara_acara);
    data.append("judul_acara", formData.judul_acara);
    data.append("deskripsi_acara", formData.deskripsi_acara);
    data.append("status_acara", formData.status_acara);
    data.append("tanggal_mulai_acara", formData.tanggal_mulai_acara);
    data.append("tanggal_selesai_acara", formData.tanggal_selesai_acara);
    data.append("waktu_acara", formData.waktu_acara);
    if (formData.gambar_acara) {
      data.append("gambar_acara", formData.gambar_acara);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/events/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Event berhasil ditambahkan:", response.data);

      // Reset form dan validasi
      setFormData({
        penyelenggara_acara: '',
        judul_acara: '',
        deskripsi_acara: '',
        status_acara: 'upcoming',
        tanggal_mulai_acara: '',
        tanggal_selesai_acara: '',
        waktu_acara: '',
        gambar_acara: null,
      });
      
    } catch (error) {
      console.error('Error saat menambahkan event:', error);
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
                      <h4 className="card-title"> Form Tambah Acara</h4>
                    </div>
                </Card.Header>
                <Card.Body>
                    <p>Mohon mengisi data acara dengan benar.</p>
                    <Form  onSubmit={handleSubmit}>
                      <Row>
                      <Col md="4" className="mb-3">
                          <Form.Label htmlFor="penyelenggara_acara">Penyelenggara Acara</Form.Label>
                          <Form.Control
                            type="text"
                            id="penyelenggara_acara"
                            name="penyelenggara_acara"
                            value={formData.penyelenggara_acara}
                            onChange={handleChange}
                            required
                          />
                        </Col>
                        <Col md="4" className="mb-3">
                          <Form.Label htmlFor="judul_acara">Judul Acara</Form.Label>
                          <Form.Control
                            type="text"
                            id="judul_acara"
                            name="judul_acara"
                            value={formData.judul_acara}
                            onChange={handleChange}
                            required
                          />
                        </Col>
                        <Col md="4" className="mb-3">
                          <Form.Label htmlFor="status_acara">Status Acara</Form.Label>
                          <Form.Control
                            as="select"
                            id="status_acara"
                            name="status_acara"
                            value={formData.status_acara}
                            onChange={handleChange}
                            required
                          >
                            <option value="upcoming">Upcoming</option>
                            <option value="past">Past</option>
                          </Form.Control>
                        </Col>
                        <Col md="12" className="mb-3">
                          <Form.Label htmlFor="deskripsi_acara">Deskripsi Acara</Form.Label>
                          <Form.Control
                            as="textarea"
                            id="deskripsi_acara"
                            name="deskripsi_acara"
                            value={formData.deskripsi_acara}
                            onChange={handleChange}
                            rows={5}
                          />
                        </Col>
                        <Col md="4" className="mb-3">
                          <Form.Label htmlFor="tanggal_mulai_acara">Tanggal Mulai Acara</Form.Label>
                          <Form.Control
                            type="date"
                            id="tanggal_mulai_acara"
                            name="tanggal_mulai_acara"
                            value={formData.tanggal_mulai_acara}
                            onChange={handleChange}
                            required
                          />
                        </Col>
                        <Col md="4" className="mb-3">
                          <Form.Label htmlFor="tanggal_selesai_acara">Tanggal Selesai Acara</Form.Label>
                          <Form.Control
                            type="date"
                            id="tanggal_selesai_acara"
                            name="tanggal_selesai_acara"
                            value={formData.tanggal_selesai_acara}
                            onChange={handleChange}
                            required
                          />
                        </Col>
                        <Col md="4" className="mb-3">
                          <Form.Label htmlFor="waktu_acara">Waktu Acara</Form.Label>
                          <Form.Control
                            type="time"
                            id="waktu_acara"
                            name="waktu_acara"
                            value={formData.waktu_acara}
                            onChange={handleChange}
                            required
                          />
                        </Col>
                        <Col md="12" className="mb-3">
                          <Form.Label htmlFor="gambar_acara">Gambar Acara</Form.Label>
                          <Form.Control
                            type="file"
                            id="gambar_acara"
                            name="gambar_acara"
                            accept="image/*"
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

export default TambahAcara