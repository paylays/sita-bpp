import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

import Card from "../../components/Card";
import DataTable from "../../components/DataTable";

const Destinasi = () => {
  const [destinations, setDestinations] = useState([]);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDetailId, setSelectedDetailId] = useState("");
  const [dataDetail, setDataDetail] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditId, setSelectedEditId] = useState("");
  const [editData, setEditData] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const [deleteData, setDeleteData] = useState(null);

  //  Mengambil data dari API
  useEffect(() => {
    axios.get("http://localhost:5000/api/destinations")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setDestinations(response.data);
        } else {
        }
      })
      .catch((error) => {
        console.error("Gagal mengambil data destinasi:", error);
        setDestinations([]); // Pastikan tidak null untuk menghindari error
      });
  }, []);
  
  const tableData = destinations.map((item) => [
    item.kategori_destinasi,
    item.nama_destinasi,
    item.deskripsi_destinasi,
    item.alamat,
    item.jam_operasional,
    item.harga_tiket,
    item.fasilitas,
    item.aktivitas,
    item.link_gmaps,
  ]);

  const DataTableOptions = {
    columns: [
      { title: "Kategori Destinasi" },
      { title: "Nama Destinasi" },
      { title: "Deskripsi" },
      { title: "Alamat" },
      { title: "Jam Operasional" },
      { title: "Harga Tiket" },
      { title: "Fasilitas" },
      { title: "Aktivitas" },
      { title: "Link Gmaps" },
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
      .get(`http://localhost:5000/api/destinations/${selectedDetailId}`)
      .then((response) => {
        setDataDetail(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil detail destinasi:", error);
      });
  };

  // Membuka Modal Edit
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
      .get(`http://localhost:5000/api/destinations/${selectedEditId}`)
      .then((response) => {
        setEditData(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data untuk edit:", error);
      });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!selectedEditId || !editData) return;

    axios
      .put(`http://localhost:5000/api/destinations/edit/${selectedEditId}`, editData)
      .then((response) => {
        // Update data destinasi pada state jika diperlukan
        const updatedDest = response.data;
        setDestinations((prevDestinations) =>
          prevDestinations.map((dest) =>
            dest.id === updatedDest.id ? updatedDest : dest
          )
        );
        handleCloseEditModal();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengedit destinasi:", error);
      });
  };


  // Modal Hapus
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
      .get(`http://localhost:5000/api/destinations/${selectedDeleteId}`)
      .then((response) => {
        setDeleteData(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil detail destinasi:", error);
      });
  };

  const handleDeleteConfirm = () => {
    if (!selectedDeleteId) return;
  
    axios
      .delete(`http://localhost:5000/api/destinations/delete/${selectedDeleteId}`)
      .then(() => {
        setDestinations((prevDestinations) =>
          prevDestinations.filter(dest => dest.id !== selectedDeleteId)
        );
        handleCloseDeleteModal();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menghapus destinasi:", error);
      });
  };

  return (
    <>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Data Destinasi</h4>
              </div>
            </Card.Header>
            <Card.Body>
              <p>
              Tabel ini menyajikan data destinasi secara terstruktur 
              untuk membantu admin dalam proses manajemen dan pemantauan destinasi wisata. 
              Informasi seperti nama, lokasi, status operasional, 
              dan review ditampilkan secara ringkas dan dapat 
              disortir untuk memudahkan analisis.
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
      >
        <Modal.Header closeButton>
          <Modal.Title>Detail Destinasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!dataDetail ? (
            <>
              <Form.Group>
                <Form.Label>Pilih Destinasi</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedDetailId}
                  onChange={handleDetailSelectChange}
                >
                  <option value="">-- Pilih ID --</option>
                  {destinations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.kategori_destinasi} | {dest.nama_destinasi}
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
                <strong>Kategori Destinasi:</strong> {dataDetail.kategori_destinasi}
              </p>
              <p>
                <strong>Nama Destinasi:</strong> {dataDetail.nama_destinasi}
              </p>
              <p>
                <strong>Deskripsi:</strong> {dataDetail.deskripsi_destinasi}
              </p>
              <p>
                <strong>Alamat:</strong> {dataDetail.alamat}
              </p>
              <p>
                <strong>Jam Operasional:</strong> {dataDetail.jam_operasional}
              </p>
              <p>
                <strong>Harga Tiket:</strong> {dataDetail.harga_tiket}
              </p>
              <p>
                <strong>Fasilitas:</strong> {dataDetail.fasilitas}
              </p>
              <p>
                <strong>Aktivitas:</strong> {dataDetail.aktivitas}
              </p>
              <p>
                <strong>Link Gmaps:</strong> {dataDetail.link_gmaps}
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
          <Modal.Title>Edit Data Destinasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!editData ? (
            <>
              <Form.Group>
                <Form.Label>Pilih Destinasi untuk diedit</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedEditId}
                  onChange={handleEditSelectChange}
                >
                  <option value="">-- Pilih ID --</option>
                  {destinations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.kategori_destinasi} | {dest.nama_destinasi}
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
                    <Form.Label htmlFor="kategori_destinasi">Kategori Destinasi</Form.Label>
                    <Form.Select
                      id="kategori_destinasi"
                      name="kategori_destinasi"
                      value={editData.kategori_destinasi || ""}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="">Pilih Kategori</option>
                      {kategoriList.map((kategori) => (
                        <option key={kategori.id} value={kategori.name}>
                          {kategori.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>Nama Destinasi</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama_destinasi"
                      value={editData.nama_destinasi || ""}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>Deskripsi Destinasi</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="deskripsi_destinasi"
                      value={editData.deskripsi_destinasi || ""}
                      onChange={handleEditChange}
                      required
                      rows={1}
                    />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="alamat"
                      value={editData.alamat || ""}
                      onChange={handleEditChange}
                      required
                      rows={1}
                    />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>Jam Operasional</Form.Label>
                    <Form.Control
                      type="text"
                      name="jam_operasional"
                      value={editData.jam_operasional || ""}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>Harga Tiket</Form.Label>
                    <Form.Control
                      type="text"
                      name="harga_tiket"
                      value={editData.harga_tiket || ""}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>Fasilitas</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="fasilitas"
                      value={editData.fasilitas || ""}
                      onChange={handleEditChange}
                      required
                      rows={1}
                    />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>Aktivitas</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="aktivitas"
                      value={editData.aktivitas || ""}
                      onChange={handleEditChange}
                      required
                      rows={1}
                    />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>Link Gmaps</Form.Label>
                    <Form.Control
                      type="text"
                      name="link_gmaps"
                      value={editData.link_gmaps || ""}
                      onChange={handleEditChange}
                      required
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
          <Modal.Title>Hapus Destinasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!deleteData ? (
            <>
              <Form.Group>
                <Form.Label>Pilih Destinasi</Form.Label>
                <Form.Control as="select" value={selectedDeleteId} onChange={handleDeleteSelectChange}>
                  <option value="">-- Pilih ID --</option>
                  {destinations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.kategori_destinasi} | {dest.nama_destinasi}
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
              <p><strong>Kategori Destinasi:</strong> {deleteData.kategori_destinasi}</p>
              <p><strong>Nama Destinasi:</strong> {deleteData.nama_destinasi}</p>
              
              <Button variant="danger" onClick={handleDeleteConfirm} className="mt-3">
                Hapus Destinasi
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
  );
};

export default Destinasi;