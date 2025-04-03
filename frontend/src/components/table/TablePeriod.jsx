import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Pagination,
  Autocomplete
} from '@mui/material';
import { FiEye, FiEdit, FiTrash } from 'react-icons/fi';
import { IoMdAdd } from "react-icons/io";
import api from "../../api";

export default function TablePeriod({ periods, refresh }) {
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [addPreviewImage, setAddPreviewImage] = useState(null);
  const [newPeriodData, setNewPeriodData] = useState({
    name: '',
    year_start: null,
    year_end: null,
    imageFile: null
  });



  // Generar años desde 1700 hasta 2100
  const years = Array.from({ length: 2100 - 1700 + 1 }, (_, i) => 1700 + i);

  // Filtrado y paginación
  const filteredPeriods = periods.filter(period =>
    period.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPeriods = filteredPeriods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPeriods.length / itemsPerPage);

  useEffect(() => setCurrentPage(1), [searchTerm]);

  // Convertir fecha a año
  const dateToYear = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date) ? null : date.getFullYear();
  };

  // Manejadores de eventos
  const handleOpenModal = (period, type) => {
    setSelectedPeriod(period);
    setModalType(type);
    if (type === 'edit') {
      setEditData({
        ...period,
        year_start: period.year_start.substring(0, 4),  // Cambia aquí
        year_end: dateToYear(period.year_end)       // Y aquí
      });
      setPreviewImage(period.image);
    }
  };

  const handleOpenAddModal = () => {
    setModalType('add');
    setNewPeriodData({
      name: '',
      year_start: null,
      year_end: null,
      imageFile: null
    });
    setAddPreviewImage(null);
  };

  const handleAddImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAddPreviewImage(URL.createObjectURL(file));
      setNewPeriodData(prev => ({
        ...prev,
        imageFile: file
      }));
    }
  };

  const handleAddPeriod = async () => {
    try {
      if (!newPeriodData.name || !newPeriodData.year_start || !newPeriodData.year_end) {
        alert("Por favor complete todos los campos requeridos");
        return;
      }

      const formData = new FormData();
      formData.append('name', newPeriodData.name);
      formData.append('year_start', `${newPeriodData.year_start}-01-01`);
      formData.append('year_end', `${newPeriodData.year_end}-12-31`);

      if (newPeriodData.imageFile) {
        formData.append('image', newPeriodData.imageFile);
      }

      await api.post('/api/period/create/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      refresh();
      setModalType(null);
      setNewPeriodData({
        name: '',
        year_start: null,
        year_end: null,
        imageFile: null
      });
      setAddPreviewImage(null);
    } catch (error) {
      console.error('Error adding period:', error);
      alert("Error al agregar el período: " + error.message);
    }
  };

  const handleCloseModal = () => {
    setSelectedPeriod(null);
    setModalType(null);
    setEditData({});
    setPreviewImage(null);
  };

  const handleDelete = async () => {
    try {
      api.delete(`/api/period-rud/${selectedPeriod.id}/`)
        .then((res) => {
          if (res.status === 204) {
            refresh();
          } else {
            alert("Not delete");
          }
        });
      refresh();
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting period:', error);
    }
  };

  const handleSave = () => {
    try {
      const formData = new FormData();
      formData.append('name', editData.name);
      formData.append('year_start', `${editData.year_start}-01-01`);
      formData.append('year_end', `${editData.year_end}-12-31`);

      if (editData.imageFile) {
        formData.append('image', editData.imageFile);
      }

      api.patch(`/api/period-rud/${editData.id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
        if (res.status === 200) {
          console.log("Period actualizado:", res.data);
          refresh();
        }
      });


      handleCloseModal();
    } catch (error) {
      console.error('Error updating period:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setEditData(prev => ({
        ...prev,
        imageFile: file
      }));
    }
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handlePageChange = (event, value) => setCurrentPage(value);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex items-center justify-between w-full my-5">
        <h2 className="text-2xl font-bold text-gray-800 text-center flex-1">
          Period  List
        </h2>

        <button
          className="bg-green-500 rounded-2xl p-2 flex items-center justify-center hover:bg-green-600 hover:text-white font-semibold cursor-pointer"
          onClick={handleOpenAddModal}
        >
          <IoMdAdd size={20} /> Add Period
        </button>

      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <TextField
          fullWidth
          label="Search periods..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ className: "bg-gray-50 rounded-lg" }}
        />
      </div>

      {/* Tabla de periodos */}
      <div className="overflow-x-auto mb-4">
        <Table sx={{ minWidth: 600 }}>
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Start Year</TableCell>
              <TableCell>End Year</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPeriods.map((period) => (
              <TableRow key={period.id} hover>
                <TableCell>{period.name}</TableCell>
                <TableCell>{period.year_start.substring(0, 4)}</TableCell>
                <TableCell>{period.year_end && (
                  (() => {
                    const [year, month, day] = period.year_end.split("-");
                    return month === "12" && day === "31"
                      ? parseInt(year) + 1
                      : year;
                  })()
                )}</TableCell>
                <TableCell>
                  <img
                    src={period.image}
                    alt="Period"
                    className="h-12 w-12 object-cover rounded"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <IconButton
                      onClick={() => handleOpenModal(period, 'view')}
                      sx={{ color: '#3B82F6', '&:hover': { bgcolor: 'rgba(59,130,246,0.1)' } }}
                    >
                      <FiEye />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenModal(period, 'edit')}
                      sx={{ color: '#10B981', '&:hover': { bgcolor: 'rgba(16,185,129,0.1)' } }}
                    >
                      <FiEdit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenModal(period, 'delete')}
                      sx={{ color: '#EF4444', '&:hover': { bgcolor: 'rgba(239,68,68,0.1)' } }}
                    >
                      <FiTrash />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      {filteredPeriods.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#3B82F6',
                '&:hover': { backgroundColor: 'rgba(59,130,246,0.1)' },
                '&.Mui-selected': {
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  '&:hover': { backgroundColor: '#2563eb' }
                }
              }
            }}
          />
        </div>
      )}

      {/* Modal de Vista */}
      <Dialog open={modalType === 'view'} onClose={handleCloseModal} fullWidth maxWidth="xs">
        <DialogTitle className="bg-gray-100 p-4 border-b">
          <span className="text-xl font-semibold">Period Details</span>
        </DialogTitle>
        <DialogContent className="p-6 space-y-4">
          {selectedPeriod && (
            <>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <p className="text-gray-800">{selectedPeriod.name}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Start Year</label>
                <p className="text-gray-800">{selectedPeriod.year_start.substring(0, 4)}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">End Year</label>
                <p className="text-gray-800">{selectedPeriod.year_end && (
                  (() => {
                    const [year, month, day] = selectedPeriod.year_end.split("-");
                    return month === "12" && day === "31"
                      ? parseInt(year) + 1
                      : year;
                  })()
                )}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Image</label>
                <img
                  src={selectedPeriod.image}
                  alt="Period"
                  className="h-24 w-24 object-cover rounded"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions className="p-4 border-t">
          <Button onClick={handleCloseModal} sx={{ color: 'gray' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Edición */}
      <Dialog open={modalType === 'edit'} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle className="bg-gray-100 p-4 border-b" sx={{ textAlign: 'center' }}>
          <span className="text-xl font-semibold">Edit Period</span>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={editData.name || ''}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ marginBottom: 3, marginTop: 3 }}
          />

          <Autocomplete
            options={years.map(y => y.toString())} // Convertir números a strings
            value={editData.year_start?.toString() || ''}
            onChange={(_, value) => setEditData({ ...editData, year_start: parseInt(value) || null })}
            getOptionLabel={(option) => option.toString()} // Asegurar que siempre retorne string
            isOptionEqualToValue={(option, value) => option === value?.toString()}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Start Year"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 3 }}
              />
            )}
          />

          <Autocomplete
            options={years.map(y => y.toString())} // Convertir números a strings
            value={editData.year_end?.toString() || ''}
            onChange={(_, value) => setEditData({ ...editData, year_end: parseInt(value) || null })}
            getOptionLabel={(option) => option.toString()} // Asegurar que siempre retorne string
            isOptionEqualToValue={(option, value) => option === value?.toString()}
            renderInput={(params) => (
              <TextField
                {...params}
                label="End Year"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 3 }}
              />
            )}
          />

          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="image-upload"
              className="hidden"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Button
                variant="outlined"
                component="span"
                className="mb-2"
              >
                Upload New Image
              </Button>
            </label>

            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {editData.imageFile?.name || 'Current Image'}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions className="p-4 border-t">
          <Button
            onClick={handleCloseModal}
            sx={{ color: 'gray', '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' } }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            sx={{
              backgroundColor: '#3B82F6',
              color: 'white',
              '&:hover': { backgroundColor: '#2563eb' }
            }}
            variant="contained"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Eliminación */}
      <Dialog open={modalType === 'delete'} onClose={handleCloseModal} fullWidth maxWidth="xs">
        <DialogTitle className="bg-gray-100 p-4 border-b">
          <span className="text-xl font-semibold">Confirm Deletion</span>
        </DialogTitle>
        <DialogContent className="p-6">
          <p className="text-gray-700 text-center">
            Are you sure you want to delete<br />
            <strong>{selectedPeriod?.name}</strong>?
          </p>
        </DialogContent>
        <DialogActions className="p-4 border-t justify-center">
          <Button
            onClick={handleCloseModal}
            sx={{ color: 'gray', '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' } }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            sx={{
              backgroundColor: '#EF4444',
              color: 'white',
              '&:hover': { backgroundColor: '#DC2626' }
            }}
            variant="contained"
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={modalType === 'add'} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle className="bg-gray-100 p-4 border-b" sx={{ textAlign: 'center' }}>
          <span className="text-xl font-semibold">Add New Period</span>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={newPeriodData.name || ''}
            onChange={(e) => setNewPeriodData({ ...newPeriodData, name: e.target.value })}
            variant="outlined"
            sx={{ marginBottom: 3, marginTop: 3 }}
          />

          <Autocomplete
            options={years.map(y => y.toString())}
            value={newPeriodData.year_start?.toString() || ''}
            onChange={(_, value) => setNewPeriodData({ ...newPeriodData, year_start: value ? parseInt(value) : null })}
            getOptionLabel={(option) => option.toString()}
            isOptionEqualToValue={(option, value) => option === value?.toString()}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Start Year"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 3 }}
              />
            )}
          />

          <Autocomplete
            options={years.map(y => y.toString())}
            value={newPeriodData.year_end?.toString() || ''}
            onChange={(_, value) => setNewPeriodData({ ...newPeriodData, year_end: value ? parseInt(value) : null })}
            getOptionLabel={(option) => option.toString()}
            isOptionEqualToValue={(option, value) => option === value?.toString()}
            renderInput={(params) => (
              <TextField
                {...params}
                label="End Year"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 3 }}
              />
            )}
          />

          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleAddImageChange}
              id="add-image-upload"
              className="hidden"
            />
            <label htmlFor="add-image-upload" className="cursor-pointer">
              <Button
                variant="outlined"
                component="span"
                className="mb-2"
              >
                Upload Image
              </Button>
            </label>

            {addPreviewImage && (
              <div className="mt-2">
                <img
                  src={addPreviewImage}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {newPeriodData.imageFile?.name || 'Selected Image'}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions className="p-4 border-t">
          <Button
            onClick={handleCloseModal}
            sx={{ color: 'gray', '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' } }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddPeriod}
            sx={{
              backgroundColor: '#3B82F6',
              color: 'white',
              '&:hover': { backgroundColor: '#2563eb' }
            }}
            variant="contained"
          >
            Add Period
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}