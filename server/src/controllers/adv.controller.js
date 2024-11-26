import { Adv } from '../models/adv.model.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


//             new adv
const newAdv = asyncHandler(async (req,res) => {
    const { type, dealType, price, title, description, houseType 
        ,carType ,landType } = req.body

    if (
        [type, dealType, price, title, description, houseType 
            ,carType ,landType].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All upload fields are required to upload")
    }

    const thumbnailLocalPaths = await req.files?.thumbnails.map(file => file.path) || [];

    let adVidLocalPath;
    if (req.files && Array.isArray(req.files.adVidLocalPath) && req.files.adVidLocalPath.length > 0) {
        adVidLocalPath = req.files.adVidLocalPath[0].path
    }

    if(!thumbnailLocalPaths.length === 0) throw new ApiError(400, "thumbnail is required")

    const thumbnails = await uploadOnCloudinary(thumbnailLocalPaths)
    const adVid = await uploadOnCloudinary(adVidLocalPath)

    if (!thumbnails) {
        throw new ApiError(400, "thumbnail file is required")
    }


    const advData = ({
        type,
        dealType,
        price,
        title,
        description,
        houseType,
        carType, 
        landType,
        thumbnails: [thumbnails.url],
        advid: adVid?.url || "",
        
    });
    if (houseType !== null) {
        advData.houseType = houseType;
    }
    if (carType !== null) {
        advData.carType = carType;
    }
    if (landType !== null) {
        advData.landType = landType;
    }
    
    const adv = await Adv.create(advData);

    if (!adv) {
        throw new ApiError(500, "Something went wrong while uploading ad")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "Ad uploaded Successfully")
    )

})



const getAllAdvs = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, type, dealType, search } = req.query;

   
    const filter = {};
    if (type) filter.type = type;
    if (dealType) filter.dealType = dealType;
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 } 
    };

    // Query advertisements using filter and options
    const advs = await Adv.paginate(filter, options);
    res.json(advs);
});

//    Get advertisement by ID
// route(   GET /api/v1/:id

const getAdvById = asyncHandler(async (req, res) => {
    const adv = await Adv.findById(req.params.id);
    if (!adv) {
        throw new ApiError(404, 'Advertisement not found');
    }
    res.json(adv);
});


// @desc    Delete an advertisement by ID
// @route   DELETE /api/advs/:id
// @access  Private (authenticated users only)
const deleteAdv = asyncHandler(async (req, res) => {
    // Find the advertisement by ID
    const adv = await Adv.findById(req.params.id);
    if (!adv) {
        throw new ApiError(404, 'Advertisement not found');
    }

    // Check if the requesting user is the owner of the advertisement
    if (adv.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, 'You are not authorized to delete this advertisement');
    }

    // If the requesting user is the owner, remove the advertisement
    await adv.remove();
    res.json({ message: 'Advertisement deleted successfully' });
});


export { getAllAdvs, getAdvById, newAdv, updateAdv, deleteAdv };
