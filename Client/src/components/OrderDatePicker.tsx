import React from "react";
import { getOverbookedDates } from "../api/orderApi";
import dayjs from "dayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Box } from "@mui/material";

const OrderDatePicker = ({ value, onChange }: any) => {
  const [overbookedDates, setOverbookedDates] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchOverbookedDates = async () => {
      try {
        const dates = await getOverbookedDates();
        setOverbookedDates(
          dates.map((date: Date) => new Date(date).toISOString().split("T")[0])
        );
      } catch (error) {
        console.error("Error fetching overbooked dates:", error);
      }
    };
    fetchOverbookedDates();
  }, []);

  const isDateOverbooked = (dateString: string): boolean => {
    const localDateString = dayjs(dateString).format("YYYY-MM-DD");
    return overbookedDates.includes(localDateString);
  };

  return (
    <Box sx={{ width: "100%", marginBottom: "1.5rem" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["MobileDatePicker"]}>
          <DemoItem label="Delivery Date">
            <MobileDatePicker
              sx={{ width: "100%" }}
              shouldDisableDate={isDateOverbooked}
              value={value}
              onChange={onChange}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
};

export default OrderDatePicker;
