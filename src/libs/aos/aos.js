"use client";
import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function AOSInit() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);
  return null;
}
