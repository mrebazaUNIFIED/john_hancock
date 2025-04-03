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
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Tabs,
    Tab
} from '@mui/material';
import { FiEye, FiEdit, FiTrash, FiPlus } from 'react-icons/fi';
import { IoMdAdd } from "react-icons/io";
import api from '../../api';

const LocationManagement = () => {
    const [tabValue, setTabValue] = useState(0);
    const [locations, setLocations] = useState([]);
    const [sublocations, setSublocations] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [editData, setEditData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, [tabValue]);

    const fetchData = async () => {
        try {
            if (tabValue === 0) {
                const response = await api.get('/api/location/');
                setLocations(response.data);
            } else {
                const response = await api.get('/api/sublocation/');
                setSublocations(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const filteredItems = tabValue === 0
        ? locations.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : sublocations.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const handleOpenModal = (item, type) => {
        setSelectedItem(item);
        setModalType(type);
        if (type === 'edit') setEditData(item);
        else if (type === 'create') setEditData(tabValue === 0 ? { name: '' } : { name: '', location: '' });
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        setModalType(null);
        setEditData({});
    };

    const handleSave = async () => {
        try {
            if (tabValue === 0) { // Locations
                if (modalType === 'edit') {
                    await api.patch(`/api/location-rud/${selectedItem.id}/`, editData);
                } else {
                    await api.post('/api/location/create/', editData);
                }
            } else { // Sublocations
                const data = {
                    name: editData.name,
                    location: editData.location
                };

                if (modalType === 'edit') {
                    await api.patch(`/api/sublocation-rud/${selectedItem.id}/`, data);
                } else {
                    await api.post('/api/sublocation/create/', data);
                }
            }
            fetchData();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleDelete = async () => {
        try {
            if (tabValue === 0) {
                await api.delete(`/api/location-rud/${selectedItem.id}/`);
            } else {
                await api.delete(`/api/sublocation-rud/${selectedItem.id}/`);
            }
            fetchData();
            handleCloseModal();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleInputChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
            <Tabs value={tabValue} onChange={(e, newValue) => {
                setTabValue(newValue);
                setCurrentPage(1);
                setSearchTerm('');
            }}>
                <Tab label="Locations" />
                <Tab label="Sublocations" />
            </Tabs>

            <div className="flex items-center justify-between my-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    {tabValue === 0 ? 'Locations' : 'Sublocations'} Management
                </h2>
                <button
                    className="bg-green-500 rounded-2xl p-2 flex items-center justify-center hover:bg-green-600 hover:text-white font-semibold cursor-pointer"
                    onClick={() => handleOpenModal(null, 'create')}
                >
                    <IoMdAdd size={20} /> {tabValue === 0 ? 'Location' : 'Sublocation'}
                </button>


              
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <TextField
                    fullWidth
                    label={`Search ${tabValue === 0 ? 'locations' : 'sublocations'}...`}
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto mb-4">
                <Table>
                    <TableHead className="bg-gray-50">
                        <TableRow>
                            {tabValue === 1 && <TableCell>Location</TableCell>}
                            <TableCell>Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map(item => (
                            <TableRow key={item.id}>
                                {tabValue === 1 && (
                                    <TableCell>{item.location?.name}</TableCell>
                                )}
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <IconButton onClick={() => handleOpenModal(item, 'view')} sx={{ color: '#3B82F6', '&:hover': { bgcolor: 'rgba(59,130,246,0.1)' } }}>
                                            <FiEye />
                                        </IconButton>
                                        <IconButton onClick={() => handleOpenModal(item, 'edit')} sx={{ color: '#10B981', '&:hover': { bgcolor: 'rgba(16,185,129,0.1)' } }}>
                                            <FiEdit />
                                        </IconButton>
                                        <IconButton onClick={() => handleOpenModal(item, 'delete')} sx={{ color: '#EF4444', '&:hover': { bgcolor: 'rgba(239,68,68,0.1)' } }}>
                                            <FiTrash />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {filteredItems.length > itemsPerPage && (
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, page) => setCurrentPage(page)}
                    color="primary"
                />
            )}

            {/* Modals */}
            <Dialog open={modalType === 'view'} onClose={handleCloseModal}>
                <DialogTitle className="bg-gray-100 p-4 border-b" sx={{ textAlign: 'center' }}>{selectedItem?.name} Details</DialogTitle>
                <DialogContent>
                    <p>Name: {selectedItem?.name}</p>
                    {tabValue === 1 && <p>Location: {selectedItem?.location?.name}</p>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={['edit', 'create'].includes(modalType)} onClose={handleCloseModal}>
                <DialogTitle className="bg-gray-100 p-4 border-b" sx={{ textAlign: 'center' }}>{modalType === 'edit' ? 'Edit' : 'Create'} {tabValue === 0 ? 'Location' : 'Sublocation'}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={editData.name || ''}
                        onChange={handleInputChange}
                        margin="normal"
                    />

                    {tabValue === 1 && (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Location</InputLabel>
                            <Select
                                name="location"
                                value={editData.location || ''}
                                onChange={handleInputChange}
                                label="Location"
                            >
                                {locations.map(location => (
                                    <MenuItem key={location.id} value={location.id}>
                                        {location.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={modalType === 'delete'} onClose={handleCloseModal}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete {selectedItem?.name}?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LocationManagement;