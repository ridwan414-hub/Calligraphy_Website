import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import redis from "../config/redis.js";


// Redis utility functions
const getOrSetCache = async (key, cb) => {
    try {
        const cachedData = await redis.get(key);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
        const freshData = await cb();
        await redis.setex(key, 3600, JSON.stringify(freshData)); // Cache for 1 hour
        return freshData;
    } catch (error) {
        console.error(`Redis cache error for key ${key}:`, error);
        return cb();
    }
};

const clearCache = async (key) => {
    try {
        await redis.del(key);
    } catch (error) {
        console.error(`Error clearing Redis cache for key ${key}:`, error);
    }
};

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send({
                success: false,
                message: 'Category name is required'
            });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(400).send({
                success: false,
                message: 'Category already exists'
            });
        }
        const category = await new categoryModel({
            name,
            slug: slugify(name)
        }).save();

        await clearCache('allCategories');

        res.status(200).send({
            success: true,
            message: 'Category created successfully',
            category
        });

    } catch (error) {
        console.error(`Error in createCategoryController: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in creating category',
            error
        });
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        if (!name) {
            return res.status(400).send({
                success: false,
                message: 'Category name is required'
            });
        }
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, {
            name,
            slug: slugify(name)
        }, { new: true });

        await clearCache('allCategories');
        await clearCache(`category:${updatedCategory.slug}`);

        res.status(200).send({
            success: true,
            message: 'Category updated successfully',
            updatedCategory
        });

    } catch (error) {
        console.error(`Error in updateCategoryController: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in updating category',
            error
        });
    }
}

export const getCategoriesController = async (req, res) => {
    try {
        const categories = await getOrSetCache('allCategories', async () => {
            return categoryModel.find({});
        });

        res.status(200).send({
            success: true,
            categories
        });

    } catch (error) {
        console.error(`Error in getCategoryController: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in getting categories',
            error
        });
    }
}

export const getCategoryController = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await getOrSetCache(`category:${slug}`, async () => {
            return categoryModel.findOne({ slug });
        });

        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            });
        }
        res.status(200).send({
            success: true,
            category
        });

    } catch (error) {
        console.error(`Error in getCategoryController: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in getting category',
            error
        });
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await categoryModel.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            });
        }

        await clearCache('allCategories');
        await clearCache(`category:${deletedCategory.slug}`);

        res.status(200).send({
            success: true,
            message: 'Category deleted successfully',
            deletedCategory
        });

    } catch (error) {
        console.error(`Error in deleteCategoryController: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in deleting category',
            error
        });
    }
}