import Hotel from "../models/Hotels.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
// update
export const updateHotel = async (req, res, next) => {
  const updateHotel = await Hotel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  try {
    res.status(200).json(updateHotel);
  } catch (err) {
    next(err);
  }
};
//DELETE
export const deleteHotel = async (req, res, next) => {
  await Hotel.findByIdAndDelete(req.params.id);
  try {
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};
// GET
export const getHotel = async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);
  try {
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
//GET ALL
export const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
