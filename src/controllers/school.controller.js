import connectToDb from '../db/db.js';
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addSchool = asyncHandler(async (req, res) => {
    const { name, address, longitude, latitude } = req.body;

    // Validate required fields
    if (!name || !address || longitude === undefined || latitude === undefined) {
        throw new ApiError(400, "All fields are required");
    }

    // Validate data types
    if (typeof name !== 'string' || typeof address !== 'string') {
        throw new ApiError(400, "Name and Address must be strings");
    }

    if (typeof longitude !== 'number' || typeof latitude !== 'number') {
        throw new ApiError(400, "Longitude and Latitude must be numbers");
    }

    const db = await connectToDb();

    const [existingSchool] = await db.execute(
        "SELECT * FROM schools WHERE name = ? AND address = ?",
        [name, address]
    );

    console.log(existingSchool);

    if (existingSchool.length > 0) {
        throw new ApiError(400, "School already exists");
    }

    await db.execute(
        "INSERT INTO schools (name, address, longitude, latitude) VALUES (?, ?, ?, ?)",
        [name, address, longitude, latitude]
    );

    return res
        .status(201)
        .json(
            new ApiResponse(201, "School added successfully")
        );
});

const listSchools = asyncHandler(async (req, res) => {
    const { longitude, latitude } = req.query;

    // Validate required query params
    if (longitude === undefined || latitude === undefined) {
        throw new ApiError(400, "Longitude and Latitude query parameters are required");
    }

    const lon = parseFloat(longitude);
    const lat = parseFloat(latitude);

    // Validate data types
    if (isNaN(lon) || isNaN(lat)) {
        throw new ApiError(400, "Longitude and Latitude must be valid numbers");
    }

    const db = await connectToDb();

    const [schools] = await db.execute(
        "SELECT * FROM schools"
    );

    // Calculate distance using Haversine formula
    const schoolsWithDistance = schools.map((school) => {
        const distance = getDistance(
            lat,
            lon,
            school.latitude,
            school.longitude
        );
        return { ...school, distanceInKM: distance };
    });

    // Sort by distance
    schoolsWithDistance.sort((a, b) => a.distanceInKM - b.distanceInKM);

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Schools fetched successfully", schoolsWithDistance)
        );
});

// Helper function to calculate distance (Haversine Formula)
function getDistance(lat1, lon1, lat2, lon2) {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in KM

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in KM
}

export { addSchool, listSchools };
