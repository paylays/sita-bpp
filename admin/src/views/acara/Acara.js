import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

import Card from "../../components/Card";
import DataTable from "../../components/DataTable";

const Acara = () => {
  const [events, setEvents] = useState([]);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDetailId, setSelectedDetailId] = useState("");
  const [dataDetail, setDataDetail] = useState(null);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditId, setSelectedEditId] = useState("");
  const [editData, setEditData] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const [deleteData, setDeleteData] = useState(null);

  // Mengambil Data dari API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          console.error("Respons bukan array:", response.data);
          setEvents([]);
        }
      } catch (error) {
        console.error("Gagal mengambil data acara:", error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);
  
  const tableData = events.map((item) => [
    new Date(item.createdAt).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, 
    }),
    item.penyelenggara_acara,
    item.judul_acara,
    `<span class="badge shaped-pill bg-${item.status_acara === "upcoming" ? "warning" : "success"}">
      ${item.status_acara}
    </span>`,
    new Date(item.tanggal_mulai_acara).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    new Date(item.tanggal_selesai_acara).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    item.waktu_acara ? item.waktu_acara.slice(0, 5) : "",
    `<div style="white-space: normal; width: 600px; max-height: 200px; overflow: auto;">${item.deskripsi_acara}</div>`,
    item.gambar_acara 
      ? `<img src="http://localhost:5000/uploads/${item.gambar_acara}" alt="Gambar Acara" width="100"/>`
      : "Tidak ada gambar",
  ]);

  const DataTableOptions = {
    columns: [
      { title: "Tanggal Rilis" },
      { title: "Penyelenggara Acara" },
      { title: "Judul Acara" },
      { title: "Status" },
      { title: "Tanggal Mulai" },
      { title: "Tanggal Selesai" },
      { title: "Waktu Acara" },
      { title: "Deskripsi Acara" },
      { title: "Gambar Acara" },
    ],
    data: tableData,
  };

  // Fungsi Membuka Modal Detail
  const handleShowDetailModal = () => {
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedDetailId("");
    setDataDetail(null);
  };

  const handleDetailSelectChange = (e) => {
    setSelectedDetailId(e.target.value);
  };

  const handleFetchDetail = () => {
    if (!selectedDetailId) return;
    axios
      .get(`http://localhost:5000/api/events/${selectedDetailId}`)
      .then((response) => {
        const eventData = response.data;
        setDataDetail({
          ...eventData,
          gambar_acara: eventData.gambar_acara
            ? `http://localhost:5000/uploads/${eventData.gambar_acara}`
            : null,
        })
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil detail acara:", error);
      });
  };

  // Fungsi Membuka Modal Edit
  const handleShowEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedEditId("");
    setEditData(null);
  };

  const handleEditSelectChange = (e) => {
    setSelectedEditId(e.target.value);
  };

  const handleFetchEditDetail = () => {
    if (!selectedEditId) return;
    axios
      .get(`http://localhost:5000/api/events/${selectedEditId}`)
      .then((response) => {
        setEditData(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data untuk edit data acara:", error);
      });
  };

  const handleEditChange = (e) => {
    const { name, value, type, files } = e.target;

    setEditData((prevData) => ({
        ...prevData,
        [name]: type === "file" ? files[0] : value,
    }));
};

  const handleEditSubmit = async (e) => {
      e.preventDefault();
      if (!selectedEditId || !editData) return;

      const formData = new FormData();

      if (editData.gambar_acara instanceof File) {
          formData.append("gambar_acara", editData.gambar_acara);
      }

      Object.keys(editData).forEach((key) => {
        if (key !== "gambar_acara") { 
          formData.append(key, editData[key] || ""); 
        }
      });

      try {
      const response = await axios.put(
        `http://localhost:5000/api/events/edit/${selectedEditId}`, 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedEvent = response.data;

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );

      handleCloseEditModal();
      } catch (error) {
          console.error("Terjadi kesalahan saat mengedit data acara:", error);
      }
  };
  

  // Fungsi Membuka Modal Hapus
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedDeleteId("");
    setDeleteData(null);
  };

  const handleDeleteSelectChange = (e) => {
    setSelectedDeleteId(e.target.value);
  };
  
  const handleFetchDeleteDetail = () => {
    if (!selectedDeleteId) return;
    
    axios
      .get(`http://localhost:5000/api/events/${selectedDeleteId}`)
      .then((response) => {
        setDeleteData(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil detail acara:", error);
      });
  };

  const handleDeleteConfirm = () => {
    if (!selectedDeleteId) return;
  
    axios
      .delete(`http://localhost:5000/api/events/delete/${selectedDeleteId}`)
      .then(() => {
        setEvents((prevEvents) =>
          prevEvents.filter(event => event.id !== selectedDeleteId)
        );
        handleCloseDeleteModal();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menghapus data acara:", error);
      });
  };

  return(
    <>

      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Data Acara</h4>
              </div>
            </Card.Header>
            <Card.Body>
              <p>
              Tabel ini menyajikan acara secara terstruktur 
              untuk membantu admin dalam proses manajemen dan 
              pemantauan acara yang akan datang dan sudah terlaksana. 
              Informasi seperti judul acara, deskripsi acara, tanggal, dan waktu
              ditampilkan secara ringkas dan dapat disortir untuk memudahkan analisis.
              </p>
              <div className="d-flex justify-content-center">
                <Button type="button" variant="info" className="ms-2" onClick={handleShowDetailModal}>Detail</Button>
                <Button type="button" variant="warning" className="ms-2" onClick={handleShowEditModal}>Ubah</Button>
                <Button type="button" variant="danger" className="ms-2" onClick={handleShowDeleteModal}>Hapus</Button>
              </div>
              <div className="table-responsive border-bottom my-3">
                <DataTable
                  data={DataTableOptions.data}
                  columns={DataTableOptions.columns}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    
      {/* Modal Detail */}
      <Modal
        show={showDetailModal}
        onHide={handleCloseDetailModal}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Detail Acara</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!dataDetail ? (
            <>
              <Form.Group>
                <Form.Label>Pilih Acara</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedDetailId}
                  onChange={handleDetailSelectChange}
                >
                  <option value="">-- Pilih ID --</option>
                  {events.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.penyelenggara_acara} | {dest.judul_acara} | {dest.status_acara}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleFetchDetail}
                disabled={!selectedDetailId}
                className="mt-3"
              >
                Cari Detail
              </Button>
            </>
          ) : (
            <div>
              <p>
                <strong>Tanggal Rilis:</strong>{" "}
                {dataDetail.createdAt
                  ? new Date(dataDetail.createdAt).toLocaleString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })
                  : ""}
              </p>
              <p>
                <strong>Penyelenggara Acara:</strong> {dataDetail.penyelenggara_acara}
              </p>
              <p>
                <strong>Judul Acara:</strong> {dataDetail.judul_acara}
              </p>
              <Col md="12" className="mb-3">
                <p><strong>Deskripsi Acara:</strong></p>
                <Form.Control
                  as="textarea"
                  id="deskripsi_acara"
                  name="deskripsi_acara"
                  value={dataDetail.deskripsi_acara}
                  rows={5}
                  style={{ resize: "vertical" }}
                  readOnly
                />
              </Col>
              <p>
                <strong>Status:</strong> {dataDetail.status_acara}
              </p>
              <p>
                <strong>Tanggal Mulai:</strong>{" "}
                {dataDetail.tanggal_mulai_acara
                  ? new Date(dataDetail.tanggal_mulai_acara).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </p>
              <p>
                <strong>Tanggal Selesai:</strong>{" "}
                {dataDetail.tanggal_selesai_acara
                  ? new Date(dataDetail.tanggal_selesai_acara).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </p>
              <p>
                <strong>Waktu Acara:</strong> {dataDetail.waktu_acara}
              </p>
              <p>
                <strong>Gambar Acara:</strong> 
                {dataDetail?.gambar_acara && (
                  <img
                    src={dataDetail.gambar_acara}
                    alt="Gambar Acara"
                    style={{ width: "100%", objectFit: "cover", marginTop: "20px"}}
                  />
                )}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailModal}>
            Close
          </Button>
          {dataDetail && (
            <Button variant="primary" onClick={() => setDataDetail(null)}>
              Back
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Modal Edit dan Update */}
      <Modal
        show={showEditModal}
        onHide={handleCloseEditModal}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Data Acara</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!editData ? (
            <>
              <Form.Group>
                <Form.Label>Pilih Acara untuk diedit</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedEditId}
                  onChange={handleEditSelectChange}
                >
                  <option value="">-- Pilih ID --</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.penyelenggara_acara} | {event.judul_acara} | {event.status_acara}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleFetchEditDetail}
                disabled={!selectedEditId}
                className="mt-3"
              >
                Cari Data
              </Button>
            </>
          ) : (
            <Form onSubmit={handleEditSubmit}>
              <Row className="g-3">
                <Col md="6">
                  <Form.Group>
                    <Form.Label>Tanggal Rilis </Form.Label>
                    <Form.Control
                      type="text"
                      name="createdAt"
                      value=
                      {editData.createdAt
                        ? new Date(editData.createdAt).toLocaleString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                          })
                        : ""}
                      onChange={handleEditChange}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md="4" className="mb-3">
                  <Form.Label htmlFor="status_acara">Status Acara</Form.Label>
                  <Form.Control
                    as="select"
                    id="status_acara"
                    name="status_acara"
                    value={editData.status_acara}
                    onChange={handleEditChange}
                    required
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                  </Form.Control>
                </Col>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>Penyelenggara Acara</Form.Label>
                    <Form.Control
                      type="text"
                      name="penyelenggara_acara"
                      value={editData.penyelenggara_acara || ""}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>Judul Acara</Form.Label>
                    <Form.Control
                      type="text"
                      name="judul_acara"
                      value={editData.judul_acara || ""}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md="12">
                  <Form.Group>
                    <Form.Label>Deskripsi Acara</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="deskripsi_acara"
                      value={editData.deskripsi_acara || ""}
                      onChange={handleEditChange}
                      required
                      rows={5}
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>Tanggal Mulai</Form.Label>
                    <Form.Control
                      type="date"
                      id="tanggal_mulai_acara"
                      name="tanggal_mulai_acara"
                      value={
                        editData.tanggal_mulai_acara
                        ? new Date(editData.tanggal_mulai_acara).toISOString().split("T")[0]
                        : ""
                      }
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>Tanggal Selesai</Form.Label>
                    <Form.Control
                      type="date"
                      id="tanggal_selesai_acara"
                      name="tanggal_selesai_acara"
                      value={
                        editData.tanggal_selesai_acara
                        ? new Date(editData.tanggal_selesai_acara).toISOString().split("T")[0] // Konversi ke YYYY-MM-DD
                        : ""
                      }
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>Waktu Acara</Form.Label>
                    <Form.Control
                      type="time"
                      name="waktu_acara"
                      value={editData.waktu_acara || ""}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md="12">
                  <Form.Group>
                    <Form.Label>Upload Gambar Acara</Form.Label>
                    <Form.Control
                      type="file"
                      name="gambar_acara"
                      onChange={handleEditChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit" className="mt-3">
                Simpan
              </Button>
              <Button
                variant="secondary"
                onClick={() => setEditData(null)}
                className="mt-3 ms-2"
              >
                Back
              </Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Delete */}
      <Modal 
        show={showDeleteModal} 
        onHide={handleCloseDeleteModal} 
        backdrop="static" 
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Hapus Acara</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!deleteData ? (
            <>
              <Form.Group>
                <Form.Label>Pilih Acara</Form.Label>
                <Form.Control as="select" value={selectedDeleteId} onChange={handleDeleteSelectChange}>
                  <option value="">-- Pilih ID --</option>
                  {events.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.penyelenggara_acara} | {dest.judul_acara} | {dest.status_acara}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button
                variant="primary"
                onClick={handleFetchDeleteDetail}
                disabled={!selectedDeleteId}
                className="mt-3"
              >
                Cari Data
              </Button>
            </>
          ) : (
            <div>
              <p><strong>Penyelenggara Acara:</strong> {deleteData.penyelenggara_acara}</p>
              <p><strong>Judul Acara</strong> {deleteData.judul_acara}</p>
              <p><strong>Status</strong> {deleteData.status_acara}</p>
              
              <Button variant="danger" onClick={handleDeleteConfirm} className="mt-3">
                Hapus Acara
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Acara