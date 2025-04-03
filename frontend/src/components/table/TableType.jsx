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
import { FiEye, FiEdit, FiTrash, FiPlus } from 'react-icons/fi';
import api from '../../api';
import { IoMdAdd } from "react-icons/io";

export default function TableType({ types, refresh }) {
    const [selectedType, setSelectedType] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [editData, setEditData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTypes = types.filter(typeItem => {
        const searchText = searchTerm.toLowerCase();
        return typeItem.type.toLowerCase().includes(searchText);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTypes = filteredTypes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredTypes.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleOpenModal = (typeItem, type) => {
        setSelectedType(typeItem);
        setModalType(type);
        if (type === 'edit') {
            setEditData(typeItem);
        } else if (type === 'create') {
            setEditData({ type: '' });
        }
    };

    const handleCloseModal = () => {
        setSelectedType(null);
        setModalType(null);
        setEditData({});
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/api/type/${selectedType.id}/`);
            refresh();
            handleCloseModal();
        } catch (error) {
            console.error('Error deleting type:', error);
            alert('Error deleting type: ' + error.message);
        }
    };

    const handleSave = async () => {
        try {
            if (modalType === 'edit') {
                await api.patch(`/api/type/${selectedType.id}/`, editData);
            } else {
                await api.post('/api/type/create/', editData);
            }
            refresh();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving type:', error);
            alert('Error saving type: ' + error.message);
        }
    };

    const handleInputChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
            <div className="flex items-center justify-between w-full my-5">
                <h2 className="text-2xl font-bold text-gray-800 text-center flex-1">
                    Type  List
                </h2>

                <button
                    className="bg-green-500 rounded-2xl p-2 flex items-center justify-center hover:bg-green-600 hover:text-white font-semibold cursor-pointer"
                    onClick={() => handleOpenModal(null, 'create')}
                >
                    <IoMdAdd size={20} /> Add Type
                </button>

            </div>


            {/* Search Bar */}
            <div className="mb-6">
                <TextField
                    fullWidth
                    label="Search types..."
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
                                Type
                            </TableCell>
                            <TableCell className="px-4 py-3 text-left font-semibold text-gray-700">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y divide-gray-200">
                        {currentTypes.length > 0 ? (
                            currentTypes.map((typeItem) => (
                                <TableRow key={typeItem.id} hover className="hover:bg-gray-50">
                                    <TableCell className="px-4 py-3 text-gray-700">
                                        {typeItem.type}
                                    </TableCell>
                                    <TableCell className="px-4 py-3">
                                        <div className="flex space-x-2">
                                            <IconButton
                                                onClick={() => handleOpenModal(typeItem, 'view')}
                                                sx={{
                                                    color: '#3B82F6',
                                                    '&:hover': { bgcolor: 'rgba(59,130,246,0.1)' }
                                                }}
                                            >
                                                <FiEye className="text-lg" />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleOpenModal(typeItem, 'edit')}
                                                sx={{
                                                    color: '#10B981',
                                                    '&:hover': { bgcolor: 'rgba(16,185,129,0.1)' }
                                                }}
                                            >
                                                <FiEdit className="text-lg" />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleOpenModal(typeItem, 'delete')}
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
                                    No types found matching your search
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {filteredTypes.length > itemsPerPage && (
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
                    <span className="text-xl font-semibold">Type Details</span>
                </DialogTitle>
                <DialogContent className="p-6 space-y-4">
                    {selectedType && (
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Type</label>
                            <p className="text-gray-800">{selectedType.type}</p>
                        </div>
                    )}
                </DialogContent>
                <DialogActions className="p-4 border-t">
                    <Button
                        onClick={handleCloseModal}
                        sx={{ color: 'gray' }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Create/Edit Modal */}
            <Dialog open={['edit', 'create'].includes(modalType)} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                <DialogTitle className="bg-gray-100 p-4 border-b">
                    <span className="text-xl font-semibold">
                        {modalType === 'edit' ? 'Edit' : 'Create'} Type
                    </span>
                </DialogTitle>
                <DialogContent className="p-6 space-y-4">
                    <TextField
                        fullWidth
                        label="Type"
                        name="type"
                        value={editData.type || ''}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{ marginY: 3 }}
                    />
                </DialogContent>
                <DialogActions className="p-4 border-t">
                    <Button
                        onClick={handleCloseModal}
                        sx={{ color: 'gray' }}
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
                        {modalType === 'edit' ? 'Save Changes' : 'Create Type'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Modal */}
            <Dialog open={modalType === 'delete'} onClose={handleCloseModal} maxWidth="xs" fullWidth>
                <DialogTitle className="bg-gray-100 p-4 border-b">
                    <span className="text-xl font-semibold">Confirm Deletion</span>
                </DialogTitle>
                <DialogContent className="p-6">
                    {selectedType && (
                        <p className="text-gray-700 text-center">
                            Are you sure you want to delete<br />
                            <strong>{selectedType.type}</strong>?
                        </p>
                    )}
                </DialogContent>
                <DialogActions className="p-4 border-t justify-center">
                    <Button
                        onClick={handleCloseModal}
                        sx={{ color: 'gray' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        sx={{
                            backgroundColor: '#EF4444',
                            '&:hover': { backgroundColor: '#DC2626' }
                        }}
                        variant="contained"
                    >
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}