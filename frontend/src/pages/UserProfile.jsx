import React from "react";

const UserProfile = () => {
  const userAllergens = ["Peanuts", "Shellfish", "Strawberries"];

  const userCollectNames = ["Favourite desserts", "Sunscreen", "Safe soap"];

  const userInfo = {
    username: "fishfreefriend",
    email: "janetb@yahoo.com",
    retailReg: "Atlantic Canada",
  };

  return (
    <>
      <h1>User Profile Page</h1>
      <div>
        <h5>{userInfo.email}</h5>
        <h4>Logged in as @{userInfo.username}</h4>
        <p>Current retail region: {userInfo.retailReg}</p>
      </div>
      <div>
        <h2>Allergens</h2>
        <table>
          <thead />
          <tbody>
            <tr>
              {userAllergens.map((e, i) => {
                return <td key={i}>{userAllergens[i]}</td>;
              })}
            </tr>
          </tbody>
          <tfoot />
        </table>
      </div>
      <div>
        <button>Add New User Allergen</button>
        <button>Remove User Allergen</button>
        <input type="text" placeholder="Allergen"></input>
      </div>
      <div>
        <h2>Collections</h2>
        <select>
          {userCollectNames.map((e, i) => {
            return (
              <option key={i} value={userCollectNames[i]}>
                {userCollectNames[i]}
              </option>
            );
          })}
        </select>
        <button>View Collection</button>
      </div>
      <div>
        <p>See a product you'd like to report?</p>
        <a href=".">Submit a report here</a>
      </div>
      <div>
        <a href=".">Log Out</a>
      </div>
    </>
  );
};

export default UserProfile;
