import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import './Listing.css'

export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
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
    console.log(listing)
}, [params.listingId]);


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
            <div  className="relative w-full overflow-hidden h-[350px]"
            style={{
                background:`url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
  
    </main>
  )

}

