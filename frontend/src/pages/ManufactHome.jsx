import React from "react";
import AlertTable from "../components/AlertTable";
import ProductTable from "../components/ProductTable";

function ManufactHome() {
  const addr = {
    street: "9454 Strange Way",
    city: "Wimblestone",
    province: "Saskatchewan",
    zipCode: "S0M 6A3",
  };

  const retailReg = ["Western Canada", "Central Canada"];

  const manufactInfo = {
    name: "Beans4U Food Co.",
    username: "Beans4U",
    email: "communications@beans4u.com",
    address: addr,
    phone: "+1-306-383-8211",
    regions: retailReg,
  };

  return (
    <div>
      <h1>Manufacturer Home Page</h1>
      <div>
        <h3>{manufactInfo.name}</h3>
        <p>
          {manufactInfo.address.street}, {manufactInfo.address.city},
          {manufactInfo.address.province} {manufactInfo.address.zipCode}
        </p>
        <p>@{manufactInfo.username}</p>
        <p>{manufactInfo.email}</p>
        <h2>Retail Regions:</h2>
        <table>
          <tr>
            {retailReg.map((e, i) => {
              return <td>{retailReg[i]} |</td>;
            })}
          </tr>
        </table>
      </div>
      <div>
        <h2>Add New Product</h2>
        <div>
          <label for="prodName">Product Name</label>
          <input type="text" name="prodName"></input>
        </div>
        <div>
          <label for="ingredients">Product Ingredients</label>
          <input type="text" name="ingredients"></input>
        </div>
        <div>
          <label for="prodVariants">Product Variants</label>
          <input type="text" name="prodVariants"></input>
        </div>
        <div>
          <label for="knownAllerg">Known Allergens</label>
          <input type="text" name="knownAllerg"></input>
        </div>
        <div>
          <label for="possibleAllerg">Possible Contaminants</label>
          <input type="text" name="possibleAllerg"></input>
        </div>
        <div>
          <label for="possibleAllerg">Possible Contaminants</label>
          <input type="text" name="possibleAllerg"></input>
        </div>
        <div>
          <label for="retailers">Retailers</label>
          <input type="text" name="retailers"></input>
        </div>
        <button>Add Product</button>
      </div>
      <div>
        <button>Remove a Product</button>
      </div>
      <div>
        <h2>Current Products</h2>
        <ProductTable />
      </div>
      <div>
        <h2>Alerts</h2>
        <AlertTable />
      </div>
    </div>
  );
}

export default ManufactHome;
