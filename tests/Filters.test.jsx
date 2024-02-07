import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Filters from "../src/components/Filters";
import { FiltersProvider } from "../src/context/FiltersContext";
import { ThemeProvider } from "../src/context/ThemeContext";
import categories from "../src/categories.json";

const RenderFilters = () => {
  return (
    <ThemeProvider>
      <FiltersProvider>
        <Filters />
      </FiltersProvider>
    </ThemeProvider>
  );
};

describe("Filters", () => {
  afterEach(cleanup);

  it("should render", () => {
    render(<RenderFilters />);
  });

  it("should render both range input", () => {
    render(<RenderFilters />);

    const rangeInputMin = document.querySelector("#range-min");
    expect(rangeInputMin).toBeDefined();

    const rangeInputMax = document.querySelector("#range-max");
    expect(rangeInputMax).toBeDefined();
  })

  it("should change range input value", () => {
    render(<RenderFilters />);

    const rangeInputMin = document.querySelector("#range-min");

    fireEvent.change(rangeInputMin, {target: { value: 170 }})
    expect(rangeInputMin.value).toBe("170");
  })

  it("should show 4 categories", () => {
    render(<RenderFilters />);
    const screenCategories = document.querySelectorAll("#category-filter");
    expect(screenCategories.length).toBe(categories.length);
  });

  it("should toggle when user clicks on a category", () => {
    render(<RenderFilters />);
    const electronics = screen.getByLabelText("electronics");
    expect(electronics).toBeDefined();
    fireEvent.click(electronics);

    const electronicsCheckBox = screen.getByDisplayValue("electronics");

    expect(electronicsCheckBox.checked).toBe(true);
  });

  it("should toggle when user clicks on several categories", () => {
    render(<RenderFilters />);
    const screenCategories = document.querySelectorAll("#category-filter");
    expect(screenCategories).toBeDefined();

    screenCategories.forEach((category) => {
      fireEvent.click(category);
    });

    categories.forEach((category) => {
      const checkBox = screen.getByDisplayValue(category);
      expect(checkBox.checked).toBe(true);
    });
  });
});
