// src/pages/OwnerCreatePropertyPage.tsx
import axios from "axios";
import { useState } from "react";

interface Address {
  lat: number;
  lon: number;
  streetName: string;
  buildingName: string;
  area: string;
  town: string;
  state: string;
  country: string;
}

interface PropertyResponse {
  price: number;
  confidenceScore: number;
  name: string;
}

const OwnerCreatePropertyPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState(0);
  const [size, setSize] = useState(0);
  const [furnished, setFurnished] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [ownershipCertificate, setOwnershipCertificate] = useState<File | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [propertyResponse, setPropertyResponse] = useState<PropertyResponse | null>(null);

  const [address, setAddress] = useState<Address>({
    lat: 5.4164,
    lon: 100.3327,
    streetName: "",
    buildingName: "",
    area: "",
    town: "",
    state: "",
    country: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token tidak ditemukan");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("propertyType", propertyType); // enum valid
      formData.append("numberOfRooms", numberOfRooms.toString());
      formData.append("size", size.toString());
      formData.append("furnished", furnished ? "true" : "false");

      images.forEach((file) => {
        formData.append("images", file);
      });

      if (ownershipCertificate) {
        formData.append("ownershipCertificate", ownershipCertificate);
      }

      // nested address
      formData.append("address[lat]", address.lat.toString());
      formData.append("address[lon]", address.lon.toString());
      formData.append("address[streetName]", address.streetName);
      formData.append("address[buildingName]", address.buildingName);
      formData.append("address[area]", address.area);
      formData.append("address[town]", address.town);
      formData.append("address[state]", address.state);
      formData.append("address[country]", address.country);

      // debug sebelum post
      console.log("FormData Preview:");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await axios.post(
        "http://localhost:3000/api/owner/property",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Success:", res.data);
      
      // Set response data and show modal
      setPropertyResponse({
        price: res.data.data.price,
        confidenceScore: res.data.data.confidenceScore,
        name: res.data.data.name
      });
      setShowModal(true);
      
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      alert("Gagal membuat property");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setPropertyResponse(null);
  };

  return (
    <div>
      <h2>Create Property</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Property Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Property Type:</label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">-- pilih --</option>
            <option value="Condo">Condo</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Apartment">Apartment</option>
            <option value="Office">Office</option>
            <option value="House">House</option>
          </select>
        </div>

        <div>
          <label>Number of Rooms:</label>
          <input
            type="number"
            value={numberOfRooms}
            onChange={(e) => setNumberOfRooms(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Size (m²):</label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Furnished:</label>
          <input
            type="checkbox"
            checked={furnished}
            onChange={(e) => setFurnished(e.target.checked)}
          />
        </div>

        <div>
          <label>Images:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setImages(Array.from(e.target.files));
              }
            }}
          />
        </div>

        <div>
          <label>Ownership Certificate:</label>
          <input
            type="file"
            onChange={(e) =>
              setOwnershipCertificate(e.target.files?.[0] || null)
            }
          />
        </div>

        <fieldset>
          <legend>Address</legend>
          <div>
            <label>Street Name:</label>
            <input
              type="text"
              value={address.streetName}
              onChange={(e) =>
                setAddress({ ...address, streetName: e.target.value })
              }
            />
          </div>

          <div>
            <label>Building Name:</label>
            <input
              type="text"
              value={address.buildingName}
              onChange={(e) =>
                setAddress({ ...address, buildingName: e.target.value })
              }
            />
          </div>

          <div>
            <label>Area:</label>
            <input
              type="text"
              value={address.area}
              onChange={(e) => setAddress({ ...address, area: e.target.value })}
            />
          </div>

          <div>
            <label>Town:</label>
            <input
              type="text"
              value={address.town}
              onChange={(e) => setAddress({ ...address, town: e.target.value })}
            />
          </div>

          <div>
            <label>State:</label>
            <input
              type="text"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
            />
          </div>

          <div>
            <label>Country:</label>
            <input
              type="text"
              value={address.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
            />
          </div>
        </fieldset>

        <button type="submit">Submit</button>
      </form>

      {images.length > 0 && (
        <div>
          <h4>Preview Images:</h4>
          {images.map((file, idx) => (
            <p key={idx}>{file.name}</p>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && propertyResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center">
              <div className="mb-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Property Created Successfully!
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">{propertyResponse.name}</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estimated Price:</span>
                    <span className="font-semibold text-green-600 text-lg">
                      ${propertyResponse.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Confidence Score:</span>
                    <div className="flex items-center">
                      <span className="font-semibold text-blue-600 text-lg mr-2">
                        {propertyResponse.confidenceScore.toFixed(1)}%
                      </span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${propertyResponse.confidenceScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={closeModal}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerCreatePropertyPage;
