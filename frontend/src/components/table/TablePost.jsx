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
    Checkbox,
    FormControlLabel
} from '@mui/material';
import { FiEye, FiEdit, FiTrash } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoMdAdd } from "react-icons/io";
import Switch from '@mui/material/Switch';
import api from '../../api';


export default function TablePost({ posts, refresh }) {
    const [selectedPost, setSelectedPost] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [editData, setEditData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    // Filter posts based on search term
    const filteredPosts = posts.filter(post => {
        const searchText = searchTerm.toLowerCase();
        return (
            post.title.toLowerCase().includes(searchText) ||
            (post.author?.name.toLowerCase().includes(searchText)) ||
            (post.recipient?.name.toLowerCase().includes(searchText)) ||
            (post.institucion?.name.toLowerCase().includes(searchText)) ||
            (post.location?.name.toLowerCase().includes(searchText))
        );
    });

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleOpenModal = (post, type) => {
        setSelectedPost(post);
        setModalType(type);
        if (type === 'edit') setEditData({ ...post, date: new Date(post.date) });
    };

    const handleCloseModal = () => {
        setSelectedPost(null);
        setModalType(null);
        setEditData({});
    };

    const handleDelete = () => {
        console.log(selectedPost.id)
        try {

            api.delete(`/api/post-rud/${selectedPost.slug}/`)
            .then((res)=>{
                if(res.status === 204){
                    refresh()
                }
            });
            
            handleCloseModal();
        } catch (error) {
            console.error('Error deleting Post:', error);
            alert('Error deleting Post: ' + error.message);
        }
    };

    const handleSave = () => {
        console.log('Saved changes:', editData);
        handleCloseModal();
    };

    const handleInputChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    };

    const handleDateChange = (date) => {
        setEditData({
            ...editData,
            date: date
        });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
            <div className="flex items-center justify-between w-full my-5">
                <h2 className="text-2xl font-bold text-gray-800 text-center flex-1">
                    Post  List
                </h2>

                <a href='/admin/post/create/'
                    className="bg-green-500 rounded-2xl p-2 flex items-center justify-center hover:bg-green-600 hover:text-white font-semibold cursor-pointer"

                >
                    <IoMdAdd size={20} /> Add Post
                </a>

            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <TextField
                    fullWidth
                    label="Search posts..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        className: "bg-gray-50 rounded-lg",
                    }}
                />
            </div>

            <div className="overflow-x-auto mb-4">
                <Table className="w-full" sx={{ minWidth: 1000 }}>
                    <TableHead className="bg-gray-50">
                        <TableRow>
                            <TableCell className="px-4 py-3 font-semibold">Title</TableCell>
                            <TableCell className="px-4 py-3 font-semibold">Author</TableCell>
                            <TableCell className="px-4 py-3 font-semibold">Recipient</TableCell>

                            <TableCell className="px-4 py-3 font-semibold">Institution</TableCell>
                            <TableCell className="px-4 py-3 font-semibold">Location</TableCell>
                            <TableCell className="px-4 py-3 font-semibold">Status</TableCell>
                            <TableCell className="px-4 py-3 font-semibold">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentPosts.map((post) => (
                            <TableRow key={post.id} hover>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.author?.name}</TableCell>
                                <TableCell>{post.recipient?.name}</TableCell>
                                <TableCell>{post.institution?.name}</TableCell>
                                <TableCell>{post.sublocation?.name}, {post.sublocation.location.name}</TableCell>

                                <TableCell> <Switch
                                    checked={post.status}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                /></TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <IconButton>
                                            <a href={`/admin/post/${post.slug}`}>
                                                <FiEye className="text-blue-600" />
                                            </a>
                                        </IconButton>
                                        <IconButton >
                                            <a href={`/admin/post/edit/${post.slug}`}>
                                                <FiEdit className="text-green-600" />
                                            </a>
                                        </IconButton>

                                        <IconButton onClick={() => handleOpenModal(post, 'delete')}>
                                            <FiTrash className="text-red-600" />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>

            {/* View Modal */}
            <Dialog open={modalType === 'view'} onClose={handleCloseModal} maxWidth="md">
                <DialogTitle>Post Details</DialogTitle>
                <DialogContent>
                    {selectedPost && (
                        <div className="space-y-4">
                            <div><strong>Title:</strong> {selectedPost.title}</div>
                            <div><strong>Author:</strong> {selectedPost.author?.name}</div>
                            <div><strong>Recipient:</strong> {selectedPost.recipient?.name}</div>
                            <div><strong>Institution:</strong> {selectedPost.institucion?.name}</div>
                            <div><strong>Location:</strong> {selectedPost.location?.name}</div>
                            <div><strong>Date:</strong> {new Date(selectedPost.date).toLocaleDateString()}</div>
                            <div><strong>Status:</strong> {selectedPost.status ? 'Active' : 'Inactive'}</div>
                            <div><strong>Content:</strong> {selectedPost.content}</div>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={modalType === 'edit'} onClose={handleCloseModal} maxWidth="md">
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <TextField
                            label="Title"
                            name="title"
                            value={editData.title || ''}
                            onChange={handleInputChange}
                            fullWidth
                        />

                        <DatePicker
                            selected={editData.date}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            className="w-full p-2 border rounded"
                        />

                        <TextField
                            label="Content"
                            name="content"
                            value={editData.content || ''}
                            onChange={handleInputChange}
                            multiline
                            rows={4}
                            fullWidth
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={editData.status || false}
                                    onChange={handleInputChange}
                                    name="status"
                                />
                            }
                            label="Active Status"
                        />

                        <TextField
                            label="Cite As"
                            name="citeAs"
                            value={editData.citeAs || ''}
                            onChange={handleInputChange}
                            multiline
                            rows={2}
                            fullWidth
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Modal */}
            <Dialog open={modalType === 'delete'} onClose={handleCloseModal}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete post:<br />
                        <strong>{selectedPost?.title}</strong>?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} sx={{ color: 'gray' }}>Cancel</Button>
                    <Button onClick={handleDelete} sx={{ color: 'white', background: 'red' }}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}