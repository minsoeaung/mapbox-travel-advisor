import axios from "axios";

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

const options = {
    params: {
        bl_latitude: '11.847676',
        tr_latitude: '12.838442',
        bl_longitude: '109.095887',
        tr_longitude: '109.149359'
    },
    headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
    }
};

const getPlacesData = async () => {
    try {
        const { data: { data } } = await axios.get(URL, options)
        // console.log(data)
    } catch (error) {
        console.log(error)
    }
}

export default getPlacesData