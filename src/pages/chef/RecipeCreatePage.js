import React, { useEffect, useState } from 'react';
import "./RecipeCreatePage.css"
import axios from 'axios';
import Banner from './components/Banner';
import Actions from './components/Actions';
import TitleForm from './components/TitleForm';
import CookingTimeForm from './components/CookingTimeForm';
import ImageForm from './components/ImageForm';
import CategoryForm from './components/CategoryForm';
import ChaptersForm from './components/ChaptersForm';
import CaloriesForm from './components/CaloriesForm';
import { CircularProgress } from '@mui/material';
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from 'lucide-react';

const RecipeCreatePage = ({ }) => {
    // const [recipe, setRecipe] = useState(null);
    // const [categories, setCategories] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const { data: courseData } = await axios.get(`/api/courses/${recipeId}`);
    //             const { data: categoriesData } = await axios.get(`/api/categories`);

    //             setRecipe(courseData);
    //             setCategories(categoriesData);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error("Error fetching recipe data:", error);
    //         }
    //     };

    //     fetchData();
    // }, [recipeId]);

    // if (loading) {
    //     return <CircularProgress />;
    // }

    // if (!recipe) {
    //     return <Banner label="Recipe not found" />;
    // }
    const recipeId = 1

    const recipe = {
        id: 1,
        isPublished: false,
        title: "Recipe 1",
        cookingTime: 25,
        categoryId: 1,
        // imageUrl: 'fasfasdf',
        chapters: [{
            id: 1,
            title: "Chop onions",
            isPublished: true
        }, {
            id: 2,
            title: "Cry",
            isPublished: false
        }, {
            id: 3,
            title: "Eat",
            isPublished: false
        }], 
        calories: 292
    }

    const requiredFields = [
        recipe.title,
        recipe.description,
        recipe.imageUrl,
        recipe.categoryId,
        recipe.chapters.some(chapter => chapter.isPublished)
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const isComplete = requiredFields.every(Boolean);

    return (
        <>
            {!recipe.isPublished && <Banner label="This recipe is unpublished. It will not be visible to the public." />}
            <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Recipe setup</h1>
                        <span style={{ fontSize: '14px', color: '#4b5563' }}>Complete all fields ({completedFields}/{totalFields})</span>
                    </div>
                    <Actions disabled={!isComplete} recipeId={recipeId} isPublished={recipe.isPublished} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginTop: '16px' }}>
                    {/* <div>
                        <TitleForm initialData={recipe} recipeId={recipe.id} />
                        <CookingTimeForm initialData={recipe} recipeId={recipe.id} />
                        <ImageForm initialData={recipe} recipeId={recipe.id} />
                        <CategoryForm initialData={recipe} recipeId={recipe.id} />
                    </div> */}
                    <div style={{ border: '1px solid #cbd5e0', borderRadius: '4px', padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ListChecks size={24} />
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Title</h2>
                        </div>
                        <TitleForm initialData={recipe} recipeId={recipe.id} />
                    </div>
                    <div style={{ border: '1px solid #cbd5e0', borderRadius: '4px', padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ListChecks size={24} />
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Cooking Time</h2>
                        </div>
                        <CookingTimeForm initialData={recipe} recipeId={recipe.id} />
                    </div>
                    <div style={{ border: '1px solid #cbd5e0', borderRadius: '4px', padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ListChecks size={24} />
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Image</h2>
                        </div>
                        <ImageForm initialData={recipe} recipeId={recipe.id} />
                    </div>
                    <div style={{ border: '1px solid #cbd5e0', borderRadius: '4px', padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ListChecks size={24} />
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Recipe Steps</h2>
                        </div>
                        <ChaptersForm initialData={recipe} recipeId={recipe.id} />
                    </div>
                     <div style={{ border: '1px solid #cbd5e0', borderRadius: '4px', padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ListChecks size={24} />
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Calories</h2>
                        </div>
                        <CaloriesForm initialData={recipe} recipeId={recipe.id} />
                    </div>
                     <div style={{ border: '1px solid #cbd5e0', borderRadius: '4px', padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ListChecks size={24} />
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Tags</h2>
                        </div>
                        <CategoryForm initialData={recipe} recipeId={recipe.id} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecipeCreatePage;
