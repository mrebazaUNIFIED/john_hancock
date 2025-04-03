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
    Pagination
} from '@mui/material';
import { FiEye, FiEdit, FiTrash } from 'react-icons/fi';
import { IoMdAdd } from "react-icons/io";
import api from "../../api";

export default function TableInstitution({ institutions, refresh }) {
    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [editData, setEditData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');
    const [newInstitution, setNewInstitution] = useState({ name: '' });

    // Filter institutions based on search term
    const filteredInstitutions = institutions.filter(institution => {
        const searchText = searchTerm.toLowerCase();
        return institution.name.toLowerCase().includes(searchText);
    });

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInstitutions = filteredInstitutions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredInstitutions.length / itemsPerPage);

    // Reset to first page when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleOpenModal = (institution, type) => {
        setSelectedInstitution(institution);
        setModalType(type);
        if (type === 'edit') setEditData(institution);
    };

    const handleOpenAddModal = () => {
        setModalType('add');
        setNewInstitution({ name: '' });
    };

    const handleCloseModal = () => {
        setSelectedInstitution(null);
        setModalType(null);
        setEditData({});
        setNewInstitution({ name: '' });
    };

    const handleDelete = async () => {
        try {
            api.delete(`/api/institution-rud/${selectedInstitution.id}/`);
            refresh();
            handleCloseModal();
        } catch (error) {
            console.error('Error deleting institution:', error);
            alert("Error deleting institution: " + error.message);
        }
    };

    const handleSave = async () => {
        try {
            await api.patch(`/api/institution-rud/${editData.id}/`, {
                name: editData.name
            });
            refresh();
            handleCloseModal();
        } catch (error) {
            console.error('Error updating institution:', error);
            alert("Error updating institution: " + error.message);
        }
    };

    const handleCreate = async () => {
        try {
            await api.post('/api/institution/create/', {
                name: newInstitution.name
            });
            refresh();
            handleCloseModal();
        } catch (error) {
            console.error('Error creating institution:', error);
            alert("Error creating institution: " + error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleNewInstitutionChange = (e) => {
        setNewInstitution({ ...newInstitution, [e.target.name]: e.target.value });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
            <div className="flex items-center justify-between w-full my-5">
                <h2 className="text-2xl font-bold text-gray-800 text-center flex-1">
                    Institutions List
                </h2>

                <button
                    className="bg-green-500 rounded-2xl p-2 flex items-center justify-center hover:bg-green-600 hover:text-white font-semibold cursor-pointer"
                    onClick={handleOpenAddModal}
                >
                    <IoMdAdd size={20} /> Add Institution
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <TextField
                    fullWidth
                    label="Search institutions..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        className: "bg-gray-50 rounded-lg",
                    }}
                />
            </div>

            <div className="overflow-x-auto mb-4">
                <Table className="w-full" sx={{ minWidth: 600 }}>
                    <TableHead className="bg-gray-50">
                        <TableRow>
                            <TableCell className="px-4 py-3 text-left font-semibold text-gray-700">
                                Name
                            </TableCell>
                            <TableCell className="px-4 py-3 text-left font-semibold text-gray-700">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y divide-gray-200">
                        {currentInstitutions.length > 0 ? (
                            currentInstitutions.map((institution) => (
                                <TableRow key={institution.id} hover className="hover:bg-gray-50">
                                    <TableCell className="px-4 py-3 text-gray-700">
                                        {institution.name}
                                    </TableCell>
                                    <TableCell className="px-4 py-3">
                                        <div className="flex space-x-2">
                                            <IconButton
                                                onClick={() => handleOpenModal(institution, 'view')}
                                                sx={{
                                                    color: '#3B82F6',
                                                    '&:hover': { bgcolor: 'rgba(59,130,246,0.1)' }
                                                }}
                                            >
                                                <FiEye className="text-lg" />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleOpenModal(institution, 'edit')}
                                                sx={{
                                                    color: '#10B981',
                                                    '&:hover': { bgcolor: 'rgba(16,185,129,0.1)' }
                                                }}
                                            >
                                                <FiEdit className="text-lg" />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleOpenModal(institution, 'delete')}
                                                sx={{
                                                    color: '#EF4444',
                                                    '&:hover': { bgcolor: 'rgba(239,68,68,0.1)' }
                                                }}
                                            >
                                                <FiTrash className="text-lg" />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} className="text-center py-4 text-gray-500">
                                    No institutions found matching your search
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {filteredInstitutions.length > itemsPerPage && (
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

            {/* View Modal */}
            <Dialog open={modalType === 'view'} onClose={handleCloseModal} maxWidth="xs" fullWidth>
                <DialogTitle className="bg-gray-100 p-4 border-b">
                    <span className="text-xl font-semibold">Institution Details</span>
                </DialogTitle>
                <DialogContent className="p-6 space-y-4">
                    {selectedInstitution && (
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Name</label>
                            <p className="text-gray-800">{selectedInstitution.name}</p>
                        </div>
                    )}
                </DialogContent>
                <DialogActions className="p-4 border-t">
                    <Button
                        onClick={handleCloseModal}
                        className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded"
                        sx={{ color: 'gray' }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={modalType === 'edit'} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                <DialogTitle className="bg-gray-100 p-4 border-b">
                    <span className="text-xl font-semibold">Edit Institution</span>
                </DialogTitle>
                <DialogContent className="p-6 space-y-4">
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={editData.name || ''}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{ marginY: 3 }}
                    />
                </DialogContent>
                <DialogActions className="p-4 border-t">
                    <Button
                        onClick={handleCloseModal}
                        className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded mr-2"
                        sx={{ color: 'gray' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
                        variant="contained"
                    >
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Modal */}
            <Dialog open={modalType === 'add'} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                <DialogTitle className="bg-gray-100 p-4 border-b">
                    <span className="text-xl font-semibold">Add New Institution</span>
                </DialogTitle>
                <DialogContent className="p-6 space-y-4">
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={newInstitution.name || ''}
                        onChange={handleNewInstitutionChange}
                        variant="outlined"
                        sx={{ marginY: 3 }}
                    />
                </DialogContent>
                <DialogActions className="p-4 border-t">
                    <Button
                        onClick={handleCloseModal}
                        className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded mr-2"
                        sx={{ color: 'gray' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreate}
                        className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
                        variant="contained"
                    >
                        Create Institution
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Modal */}
            <Dialog open={modalType === 'delete'} onClose={handleCloseModal} maxWidth="xs" fullWidth>
                <DialogTitle className="bg-gray-100 p-4 border-b">
                    <span className="text-xl font-semibold">Confirm Deletion</span>
                </DialogTitle>
                <DialogContent className="p-6">
                    {selectedInstitution && (
                        <p className="text-gray-700 text-center">
                            Are you sure you want to delete<br />
                            <strong>{selectedInstitution.name}</strong>?
                        </p>
                    )}
                </DialogContent>
                <DialogActions className="p-4 border-t justify-center">
                    <Button
                        onClick={handleCloseModal}
                        className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded mr-3"
                        sx={{ color: 'gray' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded"
                        variant="contained"
                        sx={{ background: 'red' }}
                    >
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}