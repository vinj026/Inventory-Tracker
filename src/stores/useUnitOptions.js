import { defineStore } from "pinia";
import { reactive } from "vue";
export const useUnitOptStore = defineStore("unit", () => {
  const unitOptions = reactive([
    {
      category: "Quantity Units",
      units: [
        { label: "Pieces (pcs)", value: "pcs" },
        { label: "Unit", value: "unit" },
        { label: "Box", value: "box" },
        { label: "Pack", value: "pack" },
        { label: "Dozen", value: "dozen" },
        { label: "Gross", value: "gross" },
        { label: "Carton", value: "carton" },
        { label: "Bottle", value: "bottle" },
        { label: "Bag", value: "bag" },
      ],
    },
    {
      category: "Weight Units",
      units: [
        { label: "Milligram (mg)", value: "mg" },
        { label: "Gram (g)", value: "g" },
        { label: "Kilogram (kg)", value: "kg" },
        { label: "Ton", value: "ton" },
      ],
    },
    {
      category: "Volume Units",
      units: [
        { label: "Milliliter (ml)", value: "ml" },
        { label: "Liter (l)", value: "l" },
        { label: "Gallon (gal)", value: "gal" },
        { label: "Barrel (bbl)", value: "bbl" },
      ],
    },
    {
      category: "Length Units",
      units: [
        { label: "Millimeter (mm)", value: "mm" },
        { label: "Centimeter (cm)", value: "cm" },
        { label: "Meter (m)", value: "m" },
        { label: "Inch", value: "inch" },
        { label: "Feet (ft)", value: "ft" },
      ],
    },
    {
      category: "Area & Volume Units",
      units: [
        { label: "Square Meter (m²)", value: "m²" },
        { label: "Cubic Meter (m³)", value: "m³" },
        { label: "Square Feet (ft²)", value: "ft²" },
        { label: "Cubic Feet (ft³)", value: "ft³" },
      ],
    },
    {
      category: "Digital Units",
      units: [
        { label: "Megabyte (MB)", value: "MB" },
        { label: "Gigabyte (GB)", value: "GB" },
        { label: "Terabyte (TB)", value: "TB" },
      ],
    },
    {
      category: "Special/Industry Units",
      units: [
        { label: "Sheet", value: "sheet" },
        { label: "Roll", value: "roll" },
        { label: "Spool", value: "spool" },
        { label: "Bar", value: "bar" },
        { label: "Rod", value: "rod" },
        { label: "Pair", value: "pair" },
        { label: "Set", value: "set" },
        { label: "Lot", value: "lot" },
      ],
    },
  ]);
  return { unitOptions };
});
