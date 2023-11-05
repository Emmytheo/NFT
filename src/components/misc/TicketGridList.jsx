import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, Stack, Card } from "@mui/material";
import { useListContext, useStore, useTheme, useCreatePath } from "react-admin";
import { useMediaQuery } from "@mui/material";
import { GridCard } from "../Cards/GridCard";
import { TicketCard } from "../Cards/TicketCard";

const useColsForWidth = () => {
  const isXLarge = useMediaQuery((theme) => theme.breakpoints.down("xl"));
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  //
  if (!isXLarge) return "1fr 1fr 1fr 1fr 1fr";
  if (!isLarge) return "1fr 1fr 1fr 1fr";
  if (!isMedium) return "1fr 1fr 1fr";
  if (!isSmall) return "1fr 1fr";
  return "1fr";
};

export const TicketGridList = (props) => {
  const { data } = useListContext();
  const cols = useColsForWidth();
  const createPath = useCreatePath();
  const [user, setUser] = useStore("user");
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  if (!data) return null;

  return (
    <Stack display="grid" gridTemplateColumns={cols} gap="20px 30px">
      {data.map((record) => {
        return (
          <TicketCard
            ticketName={record.event}
            ticketState={"Active"}
            ticketType={record.ticket_type.toUpperCase()}
            price={`₦‎ ${record.ticket_data.ticket_price}`}
            link={createPath({
              resource: "tickets",
              id: record.id,
              type: "show",
            })}
          />
        );
      })}
    </Stack>
  );
};
