"use client";
import React from "react";
import { HeroParallax } from "../../../ui/hero-parallax";

export default function Portfolio() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "Eshraqgroup",
    thumbnail:
      "/websites/eshraqgroup.jpg",
  },
  {
    title: "American Accreditation Association",
    thumbnail:
      "/websites/aaa-accreditation.jpg",
  },
  {
    title: "Maevafashion",
    thumbnail:
      "/websites/maevafashion.jpg",
  },
  {
    title: "Wall street english",
    thumbnail:
      "/websites/wallstreetenglish.jpg",
  },

  {
    title: "Sousetravel",
    thumbnail:
      "/websites/sousetravel.jpg",
  },
  {
    title: "Inspeedglobal",
    thumbnail:
      "/websites/inspeedglobal.jpg",
  },
  {
    title: "Megalife",
    thumbnail:
      "/websites/megalife.jpg",
  },
  {
    title: "Wall street english",
    thumbnail:
      "/websites/wse.jpg",
  },
  {
    title: "VIP Africa",
    thumbnail:
      "/websites/vipafrica.jpg",
  },

  {
    title: "American Accreditation Association",
    thumbnail:
      "/websites/aaa-accreditation-landing-page.jpg",
  },
  {
    title: "Hero Games",
    thumbnail:
      "/websites/herogames.jpg",
  },
  {
    title: "The Nordiccenter Organization",
    thumbnail:
      "/websites/nordic.png",
  },
  {
    title: "E Free Invoice",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];
