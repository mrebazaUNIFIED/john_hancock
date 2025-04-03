import { Editor } from '@tinymce/tinymce-react';
import { Box, InputLabel, FormControl } from '@mui/material';

const TinyMCEEditor = ({ label, value, onChange }) => {
    return (
        <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel shrink sx={{ mb: 1, color: 'text.primary',fontSize:18 }}>
                {label}
            </InputLabel>
            <Box sx={{
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                '& .tox-tinymce': { 
                    borderRadius: 1,
                    border: 'none !important' 
                },
                marginTop:3
            }}>
                <Editor
                    apiKey='1hus3dvscd36zw6iul9mtg2nc31pgx7ffymz89rlepf4xm49'
                    value={value}
                    onEditorChange={onChange}
                    init={{
                        height: 300,
                        menubar: false,
                        statusbar: false,
                        skin: 'oxide', 
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'blocks | ' +
                            'bold italic underline | ' +
                            'alignleft aligncenter alignright alignjustify | ' +
                            'bullist numlist | ' +
                          
                            'undo redo',
                        content_style: `
                            body { 
                                font-family: 'Roboto', sans-serif; 
                                font-size: 14px; 
                                color: rgba(0, 0, 0, 0.87);
                                margin: 8px;
                            }
                            table { border-collapse: collapse; width: 100%; }
                            td, th { border: 1px solid #ddd; padding: 8px; }
                            img { max-width: 100%; height: auto; }
                        `,
                       
                        // Configuraciones adicionales para limpiar la UI
                        branding: false,
                        promotion: false,
                        elementpath: false
                    }}
                />
            </Box>
        </FormControl>
    );
};

export default TinyMCEEditor;