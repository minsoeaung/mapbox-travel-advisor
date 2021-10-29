import axios from "axios";

import data from "./data"

const getPlacesData = async (type, ne, sw, source) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
            , {
                params: {
                    bl_latitude: sw.lat,
                    tr_latitude: ne.lat,
                    bl_longitude: sw.lng,
                    tr_longitude: ne.lng
                },
                headers: {
                    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
                },
                cancelToken: source.token
            })

        return data;
    } catch (err) {
        if (axios.isCancel(err))
            console.log("cancelled request")
    }
}

export default getPlacesData