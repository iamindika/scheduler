import React from "react";

import { act, render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("Application renders without crashing", () => {
  render(<Application />);
});

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    act(() => {
      fireEvent.click(getByText("Tuesday"));
    });
    
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { getByText, getAllByAltText, getByPlaceholderText, container } = render(<Application />);
  
    await waitForElement(() => getByText("Archie Cohen"));
    
    await act(async () => {
      fireEvent.click(getAllByAltText("Add")[0])
      await waitForElement(() => getByPlaceholderText("Enter Student Name"));
      fireEvent.change(getByPlaceholderText("Enter Student Name"), {
        target: { value: "Lydia Miller-Jones" }
      });
      const interviewers = container.getElementsByClassName("interviewers__item")
      fireEvent.click(interviewers[0]);
      fireEvent.click(getByText("Save"));
      await waitForElement(() => getByText("Saving"))
      await waitForElement(() => getByText("Lydia Miller-Jones"));
      const dayList = container.getElementsByClassName("day-list__item");
      expect(dayList[0]).toHaveTextContent("Monday");
      expect(dayList[0]).toHaveTextContent("no spots remaining");
    });
  });
})

