"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.ohiostatepizzas.com";

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zip, setZip] = useState(null);
  // Fetch menu items for a given ZIP
  const fetchMenuItemsByZip = async (zipCode) => {
    try {
      setLoading(true);
      if (!zipCode) {
        console.log("No zip provided.");
        setZip(null);
        setMenuItems([]);
        setLoading(false);
        return;
      }

      localStorage.setItem("userLocationZip", zipCode);
      setZip(zipCode);

      const res = await axios.get(`${API_URL}/api/location/items-by-zip/${zipCode}`);
      const data = res?.data
      console.log(data)

      setMenuItems(Array.isArray(data?.menuItems) ? data.menuItems : []);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  // On mount, load ZIP from localStorage
  useEffect(() => {
    const storedZip = localStorage.getItem("userLocationZip");
    if (storedZip) {
      setZip(storedZip);
    } else {
      setLoading(false);
    }
  }, []);

  // Whenever ZIP changes, fetch new items
  useEffect(() => {
    if (zip) {
      fetchMenuItemsByZip(zip);
    } else {
      setMenuItems([]);
      setLoading(false);
    }
  }, [zip]);

  return (
    <MenuContext.Provider value={{ menuItems, loading, zip, fetchMenuItemsByZip, setZip }}>
      {children}
    </MenuContext.Provider>
  );
};
