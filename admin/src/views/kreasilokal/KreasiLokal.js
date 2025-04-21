import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

import Card from "../../components/Card";
import DataTable from "../../components/DataTable";

const KreasiLokal = () => {
  const [localcreations, setLocalCreations] = useState([]);

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
    axios.get("http://localhost:5000/api/localcreations")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setLocalCreations(response.data);
        } else {
        }
      })
      .catch((error) => {
        console.error("Gagal mengambil data kreasi lokal:", error);
        setLocalCreations([]); 
      });
  }, []);

  const categoryColors = {
    "Kuliner": "rgba(229, 62, 62, 0.5)", 
    "Kriya": "rgba(49, 130, 206, 0.5)", 
    "Fashion": "rgba(56, 161, 105, 0.5)", 
    "Seni Rupa": "rgba(214, 158, 46, 0.5)", 
    "Seni Pertunjukan": "rgba(128, 90, 213, 0.5)" 
  };

  
  const tableData = localcreations.map((item) => [
    new Date(item.createdAt).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, 
    }),
    `<span class="badge shaped-pill" 
      style="background-color: ${categoryColors[item.kategori_ekraf] || 'gray'}; color: white;">
      ${item.kategori_ekraf}
    </span>`,
    item.nama_ekraf,
    `<div style="white-space: normal; width: 600px; max-height: 200px; overflow: auto;">${item.deskripsi_ekraf}</div>`,
    `<div style="white-space: normal; width: 400px;">${item.alamat}</div>`,
    item.jam_operasional,
    item.harga_produk,
    item.no_whatsapp,
    `<div style="white-space: normal; width: 300px; max-height: 200px; overflow: auto;">${item.link_gmaps}</div>`,
    item.gambar_kreasilokal 
    ? `<img src="http://localhost:5000/uploads/${item.gambar_kreasilokal}" alt="Gambar Kreasi Lokal" width="100"/>`
    : "Tidak ada gambar",
    item.link_instagram,
    item.link_youtube,
    item.link_facebook,
  ]);

  const DataTableOptions = {
    columns: [
      { title: "Tanggal Rilis" },
      { title: "Kategori Kreasi Lokal" },
      { title: "Nama Kreasi Lokal" },
      { title: "Deskripsi" },
      { title: "Alamat" },
      { title: "Jam Operasional" },
      { title: "Harga Produk" },
      { title: "No Whatsapp" },
      { title: "Link Gmaps" },
      { title: "Gambar Kreasi Lokal" },
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
      .get(`http://localhost:5000/api/localcreations/${selectedDetailId}`)
      .then((response) => {
        const eventData = response.data
        setDataDetail({
          ...eventData,
          gambar_kreasilokal: eventData.gambar_kreasilokal
            ? `http://localhost:5000/uploads/${eventData.gambar_kreasilokal}`
            : null,
        });
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil detail kreasi lokal:", error);
      });
  };

  // Membuka Modal Edit
  const kategoriList = [
    { id: 1, name: 'Kuliner' },
    { id: 2, name: 'Kriya' },
    { id: 3, name: 'Fashion' },
    { id: 4, name: 'Seni Rupa' },
    { id: 5, name: 'Seni Pertunjukan' },
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
      .get(`http://localhost:5000/api/localcreations/${selectedEditId}`)
      .then((response) => {
        setEditData(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data untuk edit:", error);
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
    
    if (editData.gambar_kreasilokal instanceof File) {
      formData.append("gambar_kreasilokal", editData.gambar_kreasilokal);
    }

    Object.keys(editData).forEach((key) => {
      if (key !== "gambar_kreasilokal") { 
        formData.append(key, editData[key] || ""); 
      }
    });

    try {
      const response = await axios.put(
        `http://localhost:5000/api/localcreations/edit/${selectedEditId}`, 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updateLocalCreation = response.data;

      setLocalCreations((prevLocalCreations) =>
        prevLocalCreations.map((localcreation) =>
          localcreation.id === updateLocalCreation.id ? updateLocalCreation : localcreation
        )
      );

      handleCloseEditModal();
      window.location.reload();

    } catch (error) {
      console.error("Terjadi kesalahan saat mengedit data kreasi lokal:", error);
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
      .get(`http://localhost:5000/api/localcreations/${selectedDeleteId}`)
      .then((response) => {
        setDeleteData(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil detail kreasi lokal:", error);
      });
  };

  const handleDeleteConfirm = () => {
    if (!selectedDeleteId) return;
  
    axios
      .delete(`http://localhost:5000/api/localcreations/delete/${selectedDeleteId}`)
      .then(() => {
        setLocalCreations((prevLocalCreations) =>
          prevLocalCreations.filter(dest => dest.id !== selectedDeleteId)
        );
        handleCloseDeleteModal();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menghapus destinasi:", error);
      });
  };

  return(
    <>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Data Kreasi Lokal</h4>
              </div>
            </Card.Header>
            <Card.Body>
              <p>
              Tabel ini menyajikan data kreasi lokal secara terstruktur 
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
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Detail Kreasi Lokal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!dataDetail ? (
            <>
              <Form.Group>
                <Form.Label>Pilih Kreasi Lokal</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedDetailId}
                  onChange={handleDetailSelectChange}
                >
                  <option value="">-- Pilih ID --</option>
                  {localcreations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.kategori_ekraf} | {dest.nama_ekraf}
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
                <strong>Kategori Ekraf:</strong> {dataDetail.kategori_ekraf}
              </p>
              <p>
                <strong>Nama Ekraf:</strong> {dataDetail.nama_ekraf}
              </p>
              <Col md="12" className="mb-3">
                <p><strong>Deskripsi:</strong></p>
                <Form.Control
                  as="textarea"
                  id="deskripsi_ekraf"
                  name="deskripsi_ekraf"
                  value={dataDetail.deskripsi_ekraf}
                  rows={5}
                  style={{ resize: "vertical" }}
                  readOnly
                />
              </Col>
              <p>
                <strong>Alamat:</strong> {dataDetail.alamat}
              </p>
              <p>
                <strong>Jam Operasional:</strong> {dataDetail.jam_operasional}
              </p>
              <p>
                <strong>Harga Produk:</strong> {dataDetail.harga_produk}
              </p>
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
                  rows={5}
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
                <strong>Gambar Kreasi Lokal:</strong> 
                {dataDetail?.gambar_kreasilokal && (
                  <img
                    src={dataDetail.gambar_kreasilokal}
                    alt="Gambar Kreasi Lokal"
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
          <Modal.Title>Edit Data Kreasi Lokal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!editData ? (
            <>
              <Form.Group>
                <Form.Label>Pilih Kreasi Lokal untuk diedit</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedEditId}
                  onChange={handleEditSelectChange}
                >
                  <option value="">-- Pilih ID --</option>
                  {localcreations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.kategori_ekraf} | {dest.nama_ekraf}
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
                    <Form.Label htmlFor="kategori_ekraf">Kategori Ekraf</Form.Label>
                    <Form.Select
                      id="kategori_ekraf"
                      name="kategori_ekraf"
                      value={editData.kategori_ekraf || ""}
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
                    <Form.Label>Nama Kreasi Lokal</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama_ekraf"
                      value={editData.nama_ekraf || ""}
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
                      name="deskripsi_ekraf"
                      value={editData.deskripsi_ekraf || ""}
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
                <Col md="4">
                  <Form.Group>
                    <Form.Label>Harga Produk</Form.Label>
                    <Form.Control
                      type="text"
                      name="harga_produk"
                      value={editData.harga_produk || ""}
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
                    <Form.Label>Upload Gambar Kreasi Lokal</Form.Label>
                    <Form.Control
                      type="file"
                      name="gambar_kreasilokal"
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
          <Modal.Title>Hapus Kreasi Lokal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!deleteData ? (
            <>
              <Form.Group>
                <Form.Label>Pilih Kreasi Lokal</Form.Label>
                <Form.Control as="select" value={selectedDeleteId} onChange={handleDeleteSelectChange}>
                  <option value="">-- Pilih ID --</option>
                  {localcreations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.kategori_ekraf} | {dest.nama_ekraf}
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
              <p><strong>Kategori Kreasi Lokal:</strong> {deleteData.kategori_ekraf}</p>
              <p><strong>Nama Kreasi Lokal:</strong> {deleteData.nama_ekraf}</p>
              
              <Button variant="danger" onClick={handleDeleteConfirm} className="mt-3">
                Hapus Kreasi Lokal
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

export default KreasiLokal