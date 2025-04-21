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

  const categoryColors = {
    "Agen Perjalanan Wisata": "rgba(255, 99, 71, 0.5)",
    "Biro Perjalanan Wisata": "rgba(30, 144, 255, 0.5)",
    "Guest House": "rgba(60, 179, 113, 0.5)",
    "Homestay": "rgba(255, 165, 0, 0.5)",
    "Hotel Bintang 1": "rgba(218, 112, 214, 0.5)",
    "Hotel Bintang 2": "rgba(0, 191, 255, 0.5)",
    "Hotel Bintang 3": "rgba(34, 139, 34, 0.5)",
    "Hotel Bintang 4": "rgba(255, 215, 0, 0.5)", 
    "Hotel Bintang 5": "rgba(178, 34, 34, 0.5)",
    "Hotel Non-Bintang": "rgba(169, 169, 169, 0.5)",
    "Vila": "rgba(70, 130, 180, 0.5)"
  };

  const tableData = accomodations.map((item) => [
    new Date(item.createdAt).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, 
    }),
    `<span class="badge shaped-pill" 
      style="background-color: ${categoryColors[item.kategori_akomodasi] || 'gray'}; color: white;">
      ${item.kategori_akomodasi}
    </span>`,
    item.nama_akomodasi,
    `<div style="white-space: normal; width: 600px; max-height: 200px; overflow: auto;">${item.deskripsi_akomodasi}</div>`,
    `<div style="white-space: normal; width: 400px;">${item.alamat}</div>`,
    item.jumlah_kamar_tersedia,
    item.harga_kamar,
    item.fasilitas,
    item.no_whatsapp,
    `<div style="white-space: normal; width: 300px; max-height: 200px; overflow: auto;">${item.link_gmaps}</div>`,
    item.gambar_akomodasi 
    ? `<img src="http://localhost:5000/uploads/${item.gambar_akomodasi}" alt="Gambar Akomodasi" width="100"/>`
    : "Tidak ada gambar",
    item.link_instagram,
    item.link_youtube,
    item.link_facebook,
  ]);

  const DataTableOptions = {
    columns: [
      { title: "Tanggal Rilis" },
      { title: "Kategori Akomodasi" },
      { title: "Nama Akomodasi" },
      { title: "Deskripsi" },
      { title: "Alamat" },
      { title: "Jumlah Kamar Tersedia" },
      { title: "Harga Kamar" },
      { title: "Fasilitas" },
      { title: "No Whatsapp" },
      { title: "Link Gmaps" },
      { title: "Gambar Akomodasi" },
      { title: "Instagram URL" },
      { title: "Youtube URL" },
      { title: "Facebook URL" },
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
        const eventData = response.data
        setDataDetail({
          ...eventData,
          gambar_akomodasi: eventData.gambar_akomodasi
            ? `http://localhost:5000/uploads/${eventData.gambar_akomodasi}`
            : null,
        });
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil detail akomodasi:", error);
      });
  };

  // Membuka Modal Edit
  const kategoriList = [
    { id: 1, name: 'Agen Perjalanan Wisata' },
    { id: 2, name: 'Biro Perjalanan Wisata' },
    { id: 3, name: 'Guest House' },
    { id: 4, name: 'Homestay' },
    { id: 5, name: 'Hotel Bintang 1' },
    { id: 6, name: 'Hotel Bintang 2' },
    { id: 7, name: 'Hotel Bintang 3' },
    { id: 8, name: 'Hotel Bintang 4' },
    { id: 9, name: 'Hotel Bintang 5' },
    { id: 10, name: 'Hotel Non-Bintang' },
    { id: 11, name: 'Vila' },
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
    
    if (editData.gambar_akomodasi instanceof File) {
      formData.append("gambar_akomodasi", editData.gambar_akomodasi);
    }

    Object.keys(editData).forEach((key) => {
      if (key !== "gambar_akomodasi") { 
        formData.append(key, editData[key] || ""); 
      }
    });

    try {
      const response = await axios.put(
        `http://localhost:5000/api/accomodations/edit/${selectedEditId}`, 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      const updateAccomodation = response.data;

      setAccomodations((prevAccomodations) =>
        prevAccomodations.map((accomodation) =>
          accomodation.id === updateAccomodation.id ? updateAccomodation : accomodation
        )
      );

      handleCloseEditModal();
      window.location.reload();

    } catch (error) {
        console.error("Terjadi kesalahan saat mengedit data akomodasi:", error);
    };
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
          prevAccomodations.filter(accomodation => accomodation.id !== selectedDeleteId)
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
              untuk membantu admin dalam proses manajemen dan pemantauan data akomodasi. 
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
        size="lg"
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
                <strong>Tanggal Rilis:</strong>{" "}
                {dataDetail.createdAt
                  ? new Date(dataDetail.createdAt).toLocaleString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })
                  : ""}
              </p>
              <p>
                <strong>Kategori Akomodasi:</strong> {dataDetail.kategori_akomodasi}
              </p>
              <p>
                <strong>Nama Akomodasi:</strong> {dataDetail.nama_akomodasi}
              </p>
              <Col md="12" className="mb-3">
                <p><strong>Deskripsi:</strong></p>
                <Form.Control
                  as="textarea"
                  id="deskripsi_akomodasi"
                  name="deskripsi_akomodasi"
                  value={dataDetail.deskripsi_akomodasi}
                  rows={5}
                  style={{ resize: "vertical" }}
                  readOnly
                />
              </Col>
              <p>
                <strong>Alamat:</strong> {dataDetail.alamat}
              </p>
              <p>
                <strong>Jumlah Kamar Tersedia:</strong> {dataDetail.jumlah_kamar_tersedia}
              </p>
              <p>
                <strong>Harga Kamar:</strong> {dataDetail.harga_kamar}
              </p>
              <Col md="12" className="mb-3">
                <p><strong>Fasilitas:</strong></p>
                <Form.Control
                  as="textarea"
                  id="fasilitas"
                  name="fasilitas"
                  value={dataDetail.fasilitas}
                  rows={2}
                  style={{ resize: "vertical" }}
                  readOnly
                />
              </Col>
              <p>
                <strong>No Whatsapp:</strong> {dataDetail.no_whatsapp}
              </p>
              <Col md="12" className="mb-3">
                <p><strong>Link Gmaps:</strong></p>
                <Form.Control
                  as="textarea"
                  id="link_gmaps"
                  name="link_gmaps"
                  value={dataDetail.link_gmaps}
                  rows={2}
                  style={{ resize: "vertical" }}
                  readOnly
                />
              </Col>
              <p>
                <strong>Instagram URL:</strong> {dataDetail.link_instagram}
              </p>
              <p>
                <strong>Youtube URL:</strong> {dataDetail.link_youtube}
              </p>
              <p>
                <strong>Facebook URL:</strong> {dataDetail.link_facebook}
              </p>
              <p>
                <strong>Gambar Akomodasi:</strong> 
                {dataDetail?.gambar_akomodasi && (
                  <img
                    src={dataDetail.gambar_akomodasi}
                    alt="Gambar Akomodasi"
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
                  {accomodations.map((accomodation) => (
                    <option key={accomodation.id} value={accomodation.id}>
                      {accomodation.kategori_akomodasi} | {accomodation.nama_akomodasi}
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
                <Col md="12">
                  <Form.Group>
                    <Form.Label>Deskripsi</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="deskripsi_akomodasi"
                      value={editData.deskripsi_akomodasi || ""}
                      onChange={handleEditChange}
                      required
                      rows={5}
                    />
                  </Form.Group>
                </Col>
                <Col md="12">
                  <Form.Group>
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="alamat"
                      value={editData.alamat || ""}
                      onChange={handleEditChange}
                      required
                      rows={2}
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
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
                <Col md="4">
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
                <Col md="4">
                  <Form.Group>
                    <Form.Label>No Whatsapp</Form.Label>
                    <Form.Control
                      type="text"
                      name="no_whatsapp"
                      value={editData.no_whatsapp || ""}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md="12">
                  <Form.Group>
                    <Form.Label>Fasilitas</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="fasilitas"
                      value={editData.fasilitas || ""}
                      onChange={handleEditChange}
                      required
                      rows={2}
                    />
                  </Form.Group>
                </Col>
                <Col md="12">
                  <Form.Group>
                    <Form.Label>Link Gmaps</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="link_gmaps"
                      value={editData.link_gmaps || ""}
                      onChange={handleEditChange}
                      required
                      rows={2}
                    />
                  </Form.Group>
                </Col>
                <Col md="12">
                  <Form.Group>
                    <Form.Label>Upload Gambar Akomodasi</Form.Label>
                    <Form.Control
                      type="file"
                      name="gambar_akomodasi"
                      onChange={handleEditChange}
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>Instagram URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="link_instagram"
                      value={editData.link_instagram || ""}
                      onChange={handleEditChange}
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>Youtube URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="link_youtube"
                      value={editData.link_youtube || ""}
                      onChange={handleEditChange}
                    />
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group>
                    <Form.Label>Facebook URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="link_facebook"
                      value={editData.link_facebook || ""}
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