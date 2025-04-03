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
import api from "./../../api";


export default function TableAuthor({ authors, onDeleteAuthor, onEditAuthor }) {

    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [editData, setEditData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');
    const [newAuthorData, setNewAuthorData] = useState({
        name: '',
        last_name: ''
    });

    const filteredAuthors = authors.filter(author => {
        const searchText = searchTerm.toLowerCase();
        return (
            author.name.toLowerCase().includes(searchText) ||
            author.last_name.toLowerCase().includes(searchText)
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAuthors = filteredAuthors.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAuthors.length / itemsPerPage);


    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);


    const handleCreate = () => {
        api.post('/api/author-create/', newAuthorData)
            .then((res) => {
                if (res.status === 201) {
                    onEditAuthor();
                    alert('Autor creado exitosamente');
                    handleCloseModal();
                }
            })
            .catch((error) => alert("Error creando autor: " + error));
    };

    const handleOpenModal = (author, type) => {
        setSelectedAuthor(author);
        setModalType(type);
        if (type === 'edit') setEditData(author);
    };

    const handleCloseModal = () => {
        setSelectedAuthor(null);
        setModalType(null);
        setEditData({});
    };

    const handleCloseModalCreate = () => {
        setSelectedAuthor(null);
        setModalType(null);
        setEditData({});
        setNewAuthorData({ name: '', last_name: '' }); // Añade esta línea
    };


    const handleDelete = () => {
        if (!selectedAuthor) return;

        api.delete(`/api/author-rud/${selectedAuthor.id}/`)
            .then((res) => {
                if (res.status === 204) {
                    console.log("Autor eliminado:", selectedAuthor.id);
                    onDeleteAuthor();
                } else {
                    alert("No se pudo eliminar");
                }
            })
            .catch((error) => alert("Error eliminando autor:" + error));

        handleCloseModal();
    };

    const handleEdit = () => {
        if (!selectedAuthor) return;

        api.patch(`/api/author-rud/${selectedAuthor.id}/`, editData)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Autor actualizado:", res.data);
                    const updatedAuthors = authors.map(author =>
                        author.id === selectedAuthor.id ? res.data : author
                    );
                    onEditAuthor();
                } else {
                    alert("Error al actualizar");
                }
                handleCloseModal();
            })
            .catch((error) => alert("Error updating author:" + error));
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
                    Authors List
                </h2>

                <button
                    className="bg-green-500 rounded-2xl p-2 flex items-center justify-center hover:bg-green-600 hover:text-white font-semibold cursor-pointer"
                    onClick={() => handleOpenModal(null, 'create')}
                >
                    <IoMdAdd size={20} /> Add Author
                </button>

            </div>


            {/* Search Bar */}
            <div className="mb-6">
                <TextField
                    fullWidth
                    label="Search authors..."
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
                                First Name
                            </TableCell>
                            <TableCell className="px-4 py-3 text-left font-semibold text-gray-700">
                                Last Name
                            </TableCell>
                            <TableCell className="px-4 py-3 text-left font-semibold text-gray-700">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y divide-gray-200">
                        {currentAuthors.length > 0 ? (
                            currentAuthors.map((author) => (
                                <TableRow key={author.id} hover className="hover:bg-gray-50">
                                    <TableCell className="px-4 py-3 text-gray-700">
                                        {author.name}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-700">
                                        {author.last_name}
                                    </TableCell>
                                    <TableCell className="px-4 py-3">
                                        <div className="flex space-x-2">
                                            <IconButton
                                                onClick={() => handleOpenModal(author, 'view')}
                                                sx={{
                                                    color: '#3B82F6',
                                                    '&:hover': { bgcolor: 'rgba(59,130,246,0.1)' }
                                                }}
                                            >
                                                <FiEye className="text-lg" />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleOpenModal(author, 'edit')}
                                                sx={{
                                                    color: '#10B981',
                                                    '&:hover': { bgcolor: 'rgba(16,185,129,0.1)' }
                                                }}
                                            >
                                                <FiEdit className="text-lg" />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleOpenModal(author, 'delete')}
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
                                <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                                    No authors found matching your search
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {filteredAuthors.length > itemsPerPage && (
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
                <DialogTitle className="bg-gray-100 p-4 border-b" sx={{ textAlign: 'center' }}>
                    <span className="text-xl font-semibold">Author Details</span>
                </DialogTitle>
                <DialogContent className="p-6 space-y-4">
                    {selectedAuthor && (
                        <>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">First Name</label>
                                <p className="text-gray-800">{selectedAuthor.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                                <p className="text-gray-800">{selectedAuthor.last_name}</p>
                            </div>
                        </>
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
                    <span className="text-xl font-semibold">Edit Author</span>
                </DialogTitle>
                <DialogContent className="p-6 space-y-4">
                    {selectedAuthor && (
                        <>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="name"
                                value={editData.name || ''}
                                onChange={handleInputChange}
                                variant="outlined"
                                className="mb-4"
                                sx={{ marginY: 5 }}
                            />
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="last_name"
                                value={editData.last_name || ''}
                                onChange={handleInputChange}
                                variant="outlined"
                                sx={{ marginBottom: 3 }}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions className="p-4 border-t">
                    <Button
                        onClick={handleCloseModal}
                        sx={{ color: 'gray' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleEdit}
                        className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
                        variant="contained"
                    >
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Modal */}
            <Dialog open={modalType === 'delete'} onClose={handleCloseModal} maxWidth="xs" fullWidth>
                <DialogTitle className="bg-gray-100 p-4 border-b">
                    <span className="text-xl font-semibold">Confirm Deletion</span>
                </DialogTitle>
                <DialogContent className="p-6">
                    {selectedAuthor && (
                        <p className="text-gray-700 text-center">
                            Are you sure you want to delete<br />
                            <strong>{selectedAuthor.name} {selectedAuthor.last_name}</strong>?
                        </p>
                    )}
                </DialogContent>
                <DialogActions className="p-4 border-t justify-center">
                    <Button
                        onClick={handleCloseModal}
                        sx={{
                            color: 'gray',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}  // <- Quita el parámetro
                        variant="contained"
                        sx={{ background: 'red' }}
                    >
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={modalType === 'create'} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                <DialogTitle className="bg-gray-100 p-4 border-b" sx={{textAlign:'center'}}>
                    <span className="text-xl font-semibold">Create New Author</span>
                </DialogTitle>
                <DialogContent className="p-6 space-y-4">
                    <TextField
                        fullWidth
                        label="First Name"
                        name="name"
                        value={newAuthorData.name}
                        onChange={(e) => setNewAuthorData({ ...newAuthorData, name: e.target.value })}
                        variant="outlined"
                        sx={{ marginY: 3 }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="last_name"
                        value={newAuthorData.last_name}
                        onChange={(e) => setNewAuthorData({ ...newAuthorData, last_name: e.target.value })}
                        variant="outlined"
                        sx={{ marginBottom: 3 }}
                        required
                    />
                </DialogContent>
                <DialogActions className="p-4 border-t">
                    <Button
                        onClick={handleCloseModalCreate}
                        sx={{ color: 'gray' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreate}
                        className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded"
                        variant="contained"
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}