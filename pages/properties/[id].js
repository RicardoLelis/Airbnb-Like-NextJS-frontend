import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import axios from "axios"
import RootLayout from "@/app/layout"
import Image from "next/image"
import { MapPinIcon, CurrencyDollarIcon, HomeIcon, InformationCircleIcon, UserCircleIcon  } from "@heroicons/react/24/solid"


function PropertyDetails() {
  const router = useRouter()
  const {id} = router.query
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (id && token) {
      axios.get(`http://localhost:8000/api/properties/${id}`, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then((res) => {
        setProperty(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <RootLayout>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="w-full max-w-3xl p-4 bh-white rounded-md shadow-md ">
          <div className="flex justify-center ">
            <Image
              className="rounded-lg shadow-lg"
              src={property.photos[0].url}
              alt={property.photos[0].alt_text}
              width={1000}
              height={600}
            />
          </div>
          <div className="mt-4 text-center">
            <h1 className="text-xl font-semibold text-gray-700">{property.title}</h1>
            <p className="mt-2 text-mtext-gray-600">{property.description}</p>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <MapPinIcon className="h-6 mb-1 inline-block"></MapPinIcon>
              <span className="text-m font-light text-gray-700">{property.location}</span>
            </div>
            <div>
              <CurrencyDollarIcon className="h-6 mb-1 inline-block"></CurrencyDollarIcon>
              <span className="text-xl font-light text-gray-700">{property.price}</span>
            </div>
          </div>
            <div className="mt-4">
              <UserCircleIcon className="h-6 mb-1 inline-block"></UserCircleIcon>
              <span className="text-m text-gray-700">{property.host.username}</span>
            </div>
            <div className="mt-4">
              <HomeIcon className="h-6 mb-1 inline-block"></HomeIcon>
              <span className="text-m text-gray-700">Property Type: {property.property_type.name}</span>
            </div>
            <div className="mt-4">
              <InformationCircleIcon className="h-6 mb-1 inline-block"></InformationCircleIcon>
              Amenities - {property.amenities.map(amenity => {
                return <span key={amenity.id} className="text-m mt-4 text-gray-700">Property Type: {amenity.name}</span>

              })}
            </div>
            <div className="mt-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Now</button>
            </div>
          </div>
        </div>
    </RootLayout>
  )
}

export default PropertyDetails;
