import { usePropertyStore } from "@/store/usePropertyStore";

const OwnerPredictPricePage = () => {
  const { name, description, propertyType, numberOfRoom, size, image, ownershipCertificate, furnished, address } = usePropertyStore();

  return (
    <div>
      <h1>{name}</h1>
      <h1>{description}</h1>
      <h1>{propertyType}</h1>
      <h1>{numberOfRoom}</h1>
      <h1>{size}</h1>
      <h1>{furnished ? "Yes" : "No"}</h1>
      <h1>{address.area}</h1>
    </div>
  );
};

export default OwnerPredictPricePage;
