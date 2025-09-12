import * as turf from '@turf/turf'

export const calculateDistance = (companyLat, companyLon, userLat, userLon) => {
    try {
        console.log(typeof companyLat, companyLat);
        console.log(typeof companyLon, companyLon);
        console.log(typeof userLat, userLat);
        console.log(typeof userLon, userLon);

        const from = turf.point([companyLon, companyLat])
        const to = turf.point([userLon, userLat])
        const options = { units: 'kilometers' }
        return turf.distance(from, to, options)
    }
    catch (error) {
        console.log(error)
    }
}