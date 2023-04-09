import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { FaShare, FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import ContactLandLord from "../../components/ContactLandLord";
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'


export default function Listing() {
  const params = useParams();
  const auth = getAuth();
  const [listing, setListing] = useState(null);
  const [contactLandlord, setContactLandlord] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listing", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
      }
    }
    fetchListing();
  }, [params.listingId]);
  
  console.log(listing);
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        // autoplay={{ delay: 3000 }}
      >
        {listing?.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[350px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Copy button */}
      <div
        className="fixed top-[13%] right-[3%] z-10
       bg-white cursor-pointer border-2 border-gray-500
       rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-600" />
      </div>
      {shareLinkCopied && (
        <p
          className="fixed top-[20%] right-[5%]
         font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2"
        >
          Link copied
        </p>
      )}

      {/* //Listing Details */}
      <div
        className="m-4 flex flex-col md:flex-row max-w-6xl
       lg:mx-auto p-4 rounded-lg bg-white lg:space-x-5"
      >
        <div className="w-full">
          <p className="text-[22px] font-bold mb-7 text-blue-900">
            {listing?.name} - $
            {listing?.offer ? 
            listing?.discountedPrice.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : listing?.regularPrice.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}

            {listing?.type === "rent" ? " / month" : ""}
          </p>
          <div className="flex font-semibold mt-6 mb-3">
            <MdLocationOn
              style={{ color: "green", fontSize: "20px", marginRight: "5px" }}
            />
            <p>{listing?.address}</p>
          </div>
          <div>
            <p
              className="bg-red-500 max-w-[150px] 
            p-1 text-center text-[16px] text-white rounded-md"
            >
              {listing?.type === "rent" ? "Rent" : "Sale"}
            </p>
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description: </span>
            {listing?.description}
          </p>

          <ul className="flex space-x-3 lg:space-x-10 font-semibold">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="tx-lg mr-1" />
              {+listing?.bedrooms > 1 ? `${+listing?.bedrooms}Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="tx-lg mr-1" />
              {+listing?.bathrooms > 1 ? `${+listing?.bathrooms}Baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="tx-lg mr-1" />
              {+listing?.parking ? "Parking Spot" : "No parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="tx-lg mr-1" />
              {+listing?.furnished ? "Furnished" : "No furnished"}
            </li>
          </ul>

          {listing?.userRef == auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandlord(true)}
                className="px-7 py-3 bg-bluecolor
              text-white font-medium rounded hover:bg-bluehover-color w-full"
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandlord && (
            <ContactLandLord userRef={listing?.userRef} listing={listing} />
          )}
        </div>

        {/* //Map ================*/}
        <div className="w-full h-[210px] md:h-[300px] z-10 overflow-x-hidden ">
          <MapContainer
            center={(listing?.geolocation.lat, listing?.geolocation.lng)}
            zoom={13}
            scrollWheelZoom={false}
            style={{height: "100%" , width: "100%"}}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={(listing?.geolocation.lat, listing?.geolocation.lng)}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
