import { Link } from "react-router-dom";
import Moment from "react-moment";
import { MdLocationOn } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import './ListingItem.css'

export default function ListingItem({ listing, id, onDelete }) {


  return (
    <li className="card">
      <Link to={`/category/${listing.type}/${id}`} className="card-link">
        <img src={listing.imgUrls[0]} alt="" />
        <Moment fromNow className="moment">{listing.timestamp?.toDate()}</Moment>

        <div className="card-details-container">
            <div className="location">
                <MdLocationOn style={{color: "green", fontSize: "20px"}}/>
                <p>{listing.address}</p>
            </div>
            <p className="card-name">{listing.name}</p>
            <p className="card-offer">${listing.offer ? 
            listing.discountedPrice .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  
            {listing.type === "rent" && "/ month"}
            </p>

            <div className="bed-bath">
                <div>
                    <p>{listing.bedrooms > 1 ?
                     `${listing.bedrooms}Beds` : "1 Bed"}</p>
                </div>
                <div>
                    <p>{listing.bathrooms > 1 ? 
                    `${listing.bathrooms}Baths` : "1 Bath"}</p>
                </div>
            </div>
        </div>
      </Link>
      {onDelete && (
        <FaTrash className="trash-icon"
        onClick={()=>onDelete(listing.id)}
        />
      
       )}
    </li>
  );
}
