import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

import Card from "../../components/Card";
import DataTable from "../../components/DataTable";

const Akomodasi = () => {
  const [accomodations, setAccomodations] = useState([]);

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
    axios.get("http://localhost:5000/api/accomodations")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAccomodations(response.data);
        } else {
        }
      })
      .catch((error) => {
        console.error("Gagal mengambil data akomodasi:", error);
        setAccomodations([]); 
      });
  }, []);

  const tableData = accomodations.map((item) => [
    item.kategori_akomodasi,
    item.nama_akomodasi,
    item.deskripsi_akomodasi,
    item.alamat,
    item.jumlah_kamar_tersedia,
    item.harga_kamar,
    item.fasilitas,
    item.no_whatsapp,
    item.link_gmaps,
  ]);

  const DataTableOptions = {
    columns: [
      { title: "Kategori Akomodasi" },
      { title: "Nama Akomodasi" },
      { title: "Deskripsi" },
      { title: "Alamat" },
      { title: "Jumlah Kamar Tersedia" },
      { title: "Harga Kamar" },
      { title: "Fasilitas" },
      { title: "No Whatsapp" },
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
      .get(`http://localhost:5000/api/accomodations/${selectedDetailId}`)
      .then((response) => {
        setDataDetail(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil detail akomodasi:", error);
      });
  };

  // Membuka Modal Edit
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
      .get(`http://localhost:5000/api/accomodations/${selectedEditId}`)
      .then((response) => {
        setEditData(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data untuk edit data akomodasi:", error);
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
      .put(`http://localhost:5000/api/accomodations/edit/${selectedEditId}`, editData)
      .then((response) => {
        const updatedDest = response.data;
        setAccomodations((prevAccomodations) =>
          prevAccomodations.map((dest) =>
            dest.id === updatedDest.id ? updatedDest : dest
          )
        );
        handleCloseEditModal();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengedit data akomodasi:", error);
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
      .get(`http://localhost:5000/api/accomodations/${selectedDeleteId}`)
      .then((response) => {
        setDeleteData(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil detail data akomodasi:", error);
      });
  };

  const handleDeleteConfirm = () => {
    if (!selectedDeleteId) return;
  
    axios
      .delete(`http://localhost:5000/api/accomodations/delete/${selectedDeleteId}`)
      .then(() => {
        setAccomodations((prevAccomodations) =>
          prevAccomodations.filter(dest => dest.id !== selectedDeleteId)
        );
        handleCloseDeleteModal();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menghapus data akomodasi:", error);
      });
  };


  return (
    <>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Data Akomodasi</h4>
              </div>
            </Card.Header>
            <Card.Body>
              <p>
              Tabel ini menyajikan akomodasi secara terstruktur 
              untuk membantu admin dalam proses manajemen dan pemantauan ekonomi kreatif. 
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
          <Modal.Title>Detail Akomodasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!dataDetail ? (
            <>
              <Form.Group>
                <Form.Label>Pilih Akomodasi</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedDetailId}
                  onChange={handleDetailSelectChange}
                >
                  <option value="">-- Pilih ID --</option>
                  {accomodations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.kategori_akomodasi} | {dest.nama_akomodasi}
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
                <strong>Kategori Akomodasi:</strong> {dataDetail.kategori_akomodasi}
              </p>
              <p>
                <strong>Nama Akomodasi:</strong> {dataDetail.nama_akomodasi}
              </p>
              <p>
                <strong>Deskripsi:</strong> {dataDetail.deskripsi_akomodasi}
              </p>
              <p>
                <strong>Alamat:</strong> {dataDetail.alamat}
              </p>
              <p>
                <strong>Jumlah Kamar Tersedia:</strong> {dataDetail.jumlah_kamar_tersedia}
              </p>
              <p>
                <strong>Harga Kamar:</strong> {dataDetail.harga_kamar}
              </p>
              <p>
                <strong>Fasilitas:</strong> {dataDetail.fasilitas}
              </p>
              <p>
                <strong>No Whatsapp:</strong> {dataDetail.no_whatsapp}
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
          <Modal.Title>Edit Data Akomodasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!editData ? (
            <>
              <Form.Group>
                <Form.Label>Pilih Akomodasi untuk diedit</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedEditId}
                  onChange={handleEditSelectChange}
                >
                  <option value="">-- Pilih ID --</option>
                  {accomodations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.kategori_akomodasi} | {dest.nama_akomodasi}
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
                    <Form.Label htmlFor="kategori_akomodasi">Kategori Akomodasi</Form.Label>
                    <Form.Select
                      id="kategori_akomodasi"
                      name="kategori_akomodasi"
                      value={editData.kategori_akomodasi || ""}
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
                    <Form.Label>Nama Akomodasi</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama_akomodasi"
                      value={editData.nama_akomodasi || ""}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>Deskripsi</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="deskripsi_akomodasi"
                      value={editData.deskripsi_akomodasi || ""}
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
                    <Form.Label>Jumlah Kamar Tersedia</Form.Label>
                    <Form.Control
                      type="text"
                      name="jumlah_kamar_tersedia"
                      value={editData.jumlah_kamar_tersedia || ""}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>Harga Kamar</Form.Label>
                    <Form.Control
                      type="text"
                      name="harga_kamar"
                      value={editData.harga_kamar || ""}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>No Whatsapp</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="fasilitas"
                      value={editData.fasilitas || ""}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>Fasilitas</Form.Label>
                    <Form.Control
                      type="text"
                      name="no_whatsapp"
                      value={editData.no_whatsapp || ""}
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
          <Modal.Title>Hapus Akomodasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!deleteData ? (
            <>
              <Form.Group>
                <Form.Label>Pilih Akomodasi</Form.Label>
                <Form.Control as="select" value={selectedDeleteId} onChange={handleDeleteSelectChange}>
                  <option value="">-- Pilih ID --</option>
                  {accomodations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.kategori_akomodasi} | {dest.nama_akomodasi}
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
              <p><strong>Kategori Akomodasi:</strong> {deleteData.kategori_akomodasi}</p>
              <p><strong>Nama Akomodasi:</strong> {deleteData.nama_akomodasi}</p>
              
              <Button variant="danger" onClick={handleDeleteConfirm} className="mt-3">
                Hapus Akomodasi
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

export default Akomodasi