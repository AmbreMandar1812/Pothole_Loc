import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase.config";

const About = () => {
  const [potholes, setPotholes] = useState(null);
  const [len,setLen] = useState(false)

  useEffect(() => {
    const fetchPotholes = async () => {
      try {
        const potholeRef = collection(db, "potholes");
        const q = query(potholeRef);
        const querysnap = await getDocs(q);
        let potholeData = [];
        querysnap.forEach((doc) => {
          potholeData.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPotholes(potholeData);
        setLen(true)
      } catch (error) {
        console.error("Error fetching potholes: ", error);
      }
    };
    fetchPotholes();
  }, []);

  return (
    <div className="relative w-full bg-white flex flex-col">
      <div
        className="w-full overflow-x-auto"
        style={{
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s",
        }}
      >
        {potholes ? (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th
                  className="px-4 py-2 sm:px-6 sm:py-3 text-center text-lg"
                  style={{
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "box-shadow 0.3s",
                  }}
                >
                  Latitude
                </th>
                <th
                  className="px-4 py-2 sm:px-6 sm:py-3 text-center text-lg"
                  style={{
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "box-shadow 0.3s",
                  }}
                >
                  Longitude
                </th>
              </tr>
            </thead>
            <tbody>
              {potholes.map((data) => (
                <tr key={data.id}>
                  <td className="px-4 py-2 sm:px-6 sm:py-3 text-center">
                    {data.data.location && data.data.location._lat
                      ? data.data.location._lat
                      : "No Latitude Data"}
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-3 text-center">
                    {data.data.location && data.data.location._long
                      ? data.data.location._long
                      : "No Longitude Data"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-4 text-center">No Potholes</p>
        )}
      </div>
        
    </div>
  );


};

export default About;
