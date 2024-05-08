import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { FaEdit, FaBook, FaPlus } from "react-icons/fa";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
// Modal components
import { FormControl, InputLabel, Input, Modal } from '@mui/material';

// Mock data for recipes
let rows = [
    { id: 1, title: 'Recipe 1', category: 'Dessert', published: 'Draft' },
    { id: 2, title: 'Recipe 2', category: 'Main Course', published: 'Published' },
    // Add more mock data here
];

const RecipesTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newRecipeTitle, setNewRecipeTitle] = useState('');
    const [newRecipeCategory, setNewRecipeCategory] = useState('');

    const handleNewRecipe = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveRecipe = () => {
        const newRecipeId = rows.length + 1;
        const newRecipe = {
            id: newRecipeId,
            title: newRecipeTitle,
            category: newRecipeCategory,
            published: 'Draft' // Assuming new recipes are always in Draft state
        };
        rows = [...rows, newRecipe];
        setIsModalOpen(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                startIcon={<FaPlus />}
                style={{
                    background: 'var(--inverse)',
                    float: 'right',
                    padding: '1em',
                    margin: '1em',
                    color: 'var(--primary)',
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'bold',
                    borderRadius: "var(--border-radius)",
                    textTransform: "None",
                    '&:hover': {
                        background: 'var(--primary)', 
                        color: 'var(--inverse)', 
                    }
                }}
                onClick={handleNewRecipe}
            >
                Add New Recipe
            </Button>
            <TableContainer component={Paper} style={{ padding: '2em' }}>
                <Table style={{ minWidth: 650 }} aria-label="recipes table">
                    <TableHead style={{ backgroundColor: 'var(--inverse)' }}>
                        <TableRow >
                            <TableCell style={{ fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">Category</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">Published</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    <span>
                                        <FaBook /> {row.title}
                                    </span>
                                </TableCell>
                                <TableCell align="right">{row.category}</TableCell>
                                <TableCell align="right">
                                    <Badge
                                        color={row.published === 'Published' ? 'success' : 'info'}
                                        badgeContent={row.published}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton component={Link} to={`/recipes/${row.id}`} aria-label="edit">
                                        <FaEdit />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal for adding new recipe */}
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="new-recipe-modal"
                aria-describedby="modal-to-add-new-recipe"
            >
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '2rem', borderRadius: '5px', maxWidth: '500px', width: '100%' }}>
                        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Name Your Recipe!</h1>
                        <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>What would you like to call your recipe?</p>
                        <form onSubmit={handleSaveRecipe} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                                <InputLabel>Recipe Title</InputLabel>
                                <Input
                                    value={newRecipeTitle}
                                    onChange={(e) => setNewRecipeTitle(e.target.value)}
                                />
                            </FormControl>
                            <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    label="Category"
                                    value={newRecipeCategory}
                                    onChange={(e) => setNewRecipeCategory(e.target.value)}
                                    style={{ fontFamily: 'var(--font-family)' }}
                                >
                                    <MenuItem value="Dessert">Dessert</MenuItem>
                                    <MenuItem value="Main Course">Main Course</MenuItem>
                                    {/* Add more categories as needed */}
                                </Select>
                            </FormControl>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <Button type="button" variant="contained" sx={{
                                    background: 'var(--inverse)', color: 'var(--primary)', textTransform: "none", fontWeight: 'bold', '&:hover': {
                                        background: 'var(--inverse)', 
                                        color: 'var(--primary)', 
                                    }
                                }} onClick={handleCloseModal}>Cancel</Button>
                                <Button type="submit" variant="contained" sx={{
                                    background: 'var(--primary)', color: 'var(--inverse)', textTransform: "none", fontWeight: 'bold', '&:hover': {
                                        background: 'var(--primary-hover)', 
                                        color: 'var(--inverse)', 
                                    }
                                }}>Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default RecipesTable;
