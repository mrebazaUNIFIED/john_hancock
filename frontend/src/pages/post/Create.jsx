import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Autocomplete,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    IconButton,
    InputLabel,
    Paper
} from '@mui/material';
import { CloudUpload, AttachFile, Add } from '@mui/icons-material';
import api from '../../api';
import TinyMCEEditor from '../../components/edit/Editor';
import { useNavigate } from "react-router-dom";


const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function CreatePost() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        date: new Date(),
        status: true,
        citeAs: '',
        image: null,
        author: null,
        recipient: null,
        document: null,
        type: null,
        institution: null,
        sublocation: null,
        period: null
    });

    const [options, setOptions] = useState({
        authors: [],
        recipients: [],
        documents: [],
        types: [],
        institutions: [],
        sublocations: [],
        periods: [],
    });

    const [documentModalOpen, setDocumentModalOpen] = useState(false);
    const [newDocument, setNewDocument] = useState({ name: '', file: null });
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const endpoints = [
                    { key: 'authors', url: '/api/author/' },
                    { key: 'recipients', url: '/api/recipient/' },
                    { key: 'types', url: '/api/type/' },
                    { key: 'institutions', url: '/api/institution/' },
                    { key: 'sublocations', url: '/api/sublocation/' },
                    { key: 'periods', url: '/api/period/' },
                ];

                const responses = await Promise.all(
                    endpoints.map(({ url }) => api.get(url))
                );

                const newOptions = {};
                responses.forEach((response, index) => {
                    newOptions[endpoints[index].key] = response.data;
                });

                setOptions(newOptions);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };
        console.log(fetchOptions())
        fetchOptions();
    }, []);

    useEffect(() => {
        if (formData.image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(formData.image);
        } else {
            setImagePreview(null);
        }
    }, [formData.image]);

    useEffect(() => {
        const generatedSlug = formData.title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '');

        setFormData(prev => ({
            ...prev,
            slug: generatedSlug
        }));
    }, [formData.title]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        const relations = ['author', 'recipient', 'type', 'institution', 'sublocation', 'document', 'period'];

        Object.entries(formData).forEach(([key, value]) => {
            if (relations.includes(key) && value?.id) {
                form.append(`${key}_id`, value.id); // 🔹 Agregamos '_id' para que coincida con el serializer
            } else if (key === "date") {
                form.append(key, formatDate(value));
            } else if (key === "image" && value) {
                form.append(key, value);
            } else if (value !== null && typeof value !== "object") {
                form.append(key, value);
            }
        });

        console.log("Datos a enviar:", Object.fromEntries(form.entries()));

        try {
            const response = await api.post("/api/post/create/", form, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Resetear P
            setFormData({
                title: "",
                slug: "",
                content: "",
                date: new Date(),
                status: true,
                citeAs: "",
                image: null,
                author: null,
                recipient: null,
                document: null,
                type: null,
                institution: null,
                sublocation: null,
                period: null,
            });
            navigate("/admin/post");

        } catch (error) {
            console.error("Detalles del error:", {
                data: error.response?.data,
                status: error.response?.status,
            });
            alert(`Error: ${error.response?.data?.message || "Error desconocido"}`);
        }
    };

    const handleCreateDocument = async () => {
        const docForm = new FormData();
        docForm.append('name', newDocument.name);
        docForm.append('path', newDocument.file);
        docForm.append('status', true);

        try {
            const response = await api.post('/api/document/create/', docForm, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Asegurar que estamos asignando el documento con su ID
            setFormData(prev => ({
                ...prev,
                document: { id: response.data.id } // Solo necesitamos el ID para la relación
            }));

            setDocumentModalOpen(false);
            setNewDocument({ name: '', file: null });
            console.log('Documento creado y vinculado exitosamente!');
        } catch (error) {
            console.error('Error creating document:', error);
            alert('Error al crear documento: ' + error.response?.data?.message || error.message);
        }
    };

    const handleDateChange = (e) => {
        const dateString = e.target.value;
        const [year, month, day] = dateString.split('-');
        setFormData({ ...formData, date: new Date(year, month - 1, day) });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Paper elevation={3} className="p-6 rounded-lg bg-white">
                <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create New Post</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className=" gap-4">
                        <TextField
                            label="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            fullWidth
                            required
                            variant="outlined"
                        />

                        <TextField
                            label="Slug"
                            value={formData.slug}
                            fullWidth
                            required
                            variant="outlined"
                            InputProps={{ readOnly: true }}
                            helperText="Slug generado automáticamente desde el título"
                            hidden
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Autocomplete
                            options={options.authors}
                            getOptionLabel={(option) => ` ${option.last_name} ${option.name}`}
                            onChange={(e, value) => setFormData({ ...formData, author: value })}
                            renderInput={(params) => (
                                <TextField {...params} label="Author" required variant="outlined" />
                            )}
                        />

                        <Autocomplete
                            options={options.recipients}
                            getOptionLabel={(option) => ` ${option.last_name} ${option.name}`}
                            onChange={(e, value) => setFormData({ ...formData, recipient: value })}
                            renderInput={(params) => (
                                <TextField {...params} label="Recipient" required variant="outlined" />
                            )}
                        />

                        <div className="col-span-2 flex gap-4 items-center">
                            <InputAdornment position="end" onClick={() => setDocumentModalOpen(true)}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AttachFile />}
                                >
                                    {formData.document ? 'Linked document' : 'Upload Document'}
                                </Button>
                            </InputAdornment>
                            {formData.document && (
                                <span className="text-sm text-green-600">
                                    ✓ Document ready to associate
                                </span>
                            )}
                        </div>

                        <Autocomplete
                            options={options.types}
                            getOptionLabel={(option) => option.type}
                            onChange={(e, value) => setFormData({ ...formData, type: value })}
                            renderInput={(params) => (
                                <TextField {...params} label="Type" required variant="outlined" />
                            )}
                        />

                        <Autocomplete
                            options={options.institutions}
                            getOptionLabel={(option) => option.name}
                            onChange={(e, value) => setFormData({ ...formData, institution: value })}
                            renderInput={(params) => (
                                <TextField {...params} label="Institution" required variant="outlined" />
                            )}
                        />

                        <Autocomplete
                            options={options.sublocations}
                            getOptionLabel={(option) => option.name}
                            onChange={(e, value) => setFormData({ ...formData, sublocation: value })}
                            renderInput={(params) => (
                                <TextField {...params} label="SubLocation" required variant="outlined" />
                            )}
                        />

                        <Autocomplete
                            options={options.periods}
                            getOptionLabel={(option) => option.name}
                            onChange={(e, value) => setFormData({ ...formData, period: value })}
                            renderInput={(params) => (
                                <TextField {...params} label="Period" required variant="outlined" />
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <InputLabel shrink htmlFor="date-picker" className="text-gray-700">
                            Date
                        </InputLabel>
                        <TextField
                            type="date"
                            fullWidth
                            value={formatDate(formData.date)}
                            onChange={handleDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                max: formatDate(new Date()),
                            }}
                            variant="outlined"
                        />
                    </div>

                    <TinyMCEEditor
                        label="Content"
                        value={formData.content}
                        onChange={(content) => setFormData({ ...formData, content })}
                    />

                    <TinyMCEEditor
                        label="Cite As"
                        value={formData.citeAs}
                        onChange={(citeAs) => setFormData({ ...formData, citeAs })}
                        config={{  // Configuración específica para este campo
                            height: 150,
                            toolbar: 'bold italic underline | link',
                            menubar: false
                        }}
                    />

                    <div className="flex flex-col gap-4">


                        <div className="flex flex-col gap-4">
                            <Button
                                variant="contained"
                                component="label"
                                startIcon={<CloudUpload />}
                                className="w-fit"
                                color="primary"
                            >
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </Button>

                            {formData.image && (
                                <span className="text-sm text-gray-600">
                                    Image selected: {formData.image.name}
                                </span>
                            )}

                            {imagePreview && (
                                <div className="mt-2 border rounded-lg p-2 w-fit">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="max-h-40 object-contain rounded"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={!formData.document} // <-- Añade esta prop
                    >
                        Create
                    </Button>
                </form>
            </Paper>

            <Dialog open={documentModalOpen} onClose={() => setDocumentModalOpen(false)}>
                <DialogTitle className="bg-gray-100 p-4 border-b">
                    <span className="text-xl font-semibold">Create New Document</span>
                </DialogTitle>
                <DialogContent className="p-6 space-y-4">
                    <TextField
                        label="Name"
                        fullWidth
                        value={newDocument.name}
                        onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                        variant="outlined"
                        sx={{ marginY: 3 }}
                    />

                    <div className="flex items-center gap-4">
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<AttachFile />}
                            color="primary"
                        >
                            File selected
                            <input
                                type="file"
                                hidden
                                onChange={(e) => setNewDocument({ ...newDocument, file: e.target.files[0] })}
                            />
                        </Button>
                        {newDocument.file && (
                            <span className="text-sm text-gray-600">
                                {newDocument.file.name}
                            </span>
                        )}
                    </div>
                </DialogContent>
                <DialogActions className="p-4 border-t">
                    <Button
                        onClick={() => setDocumentModalOpen(false)}
                        className="text-gray-600"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateDocument}
                        color="primary"
                        variant="contained"
                        disabled={!newDocument.name || !newDocument.file}
                    >
                        Create Document
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}