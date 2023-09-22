/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Grid,
  Heading,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import classes from "./Dashboard.module.css";
import { Chart, ChartItem } from "chart.js/auto";
import { useEffect, useState } from "react";

type StatDetail = {
  title: string;
  value: number;
  target: number;
  timeline: "w" | "m" | "a";
};

const Dashboard: React.FC = () => {
  const [timeline, setTimeline] = useState<"w" | "m" | "a">("a");
  const detail_price: StatDetail[] = [
    {
      title: "Total Sale (weekly)",
      value: 7,
      target: 5,
      timeline: "w",
    },
    {
      title: "Total Sale (monthly)",
      value: 50,
      target: 35,
      timeline: "m",
    },
    {
      title: "Total Sale (Annual)",
      value: 128,
      target: 140,
      timeline: "a",
    },
  ];

  //   const data = [
  //     { year: 2010, count: 10 },
  //     { year: 2011, count: 20 },
  //     { year: 2012, count: 15 },
  //     { year: 2013, count: 25 },
  //     { year: 2014, count: 22 },
  //     { year: 2015, count: 30 },
  //     { year: 2016, count: 28 },

  //   ];

  const dataWeeklyMock = [
    { d: "Mon", price: 1 },
    { d: "Tue", price: 12 },
    { d: "Wed", price: 5 },
    { d: "Thu", price: 9 },
    { d: "Fri", price: 3 },
    { d: "Sat", price: 11 },
    { d: "Sun", price: 8 },
  ];

  const dataMonthlyMock = [
    { w: 1, price: 60 },
    { w: 2, price: 40 },
    { w: 3, price: 30 },
    { w: 4, price: 80 },
  ];
  const dataAnnulMock = [
    { m: 1, price: 120 },
    { m: 2, price: 140 },
    { m: 3, price: 110 },
    { m: 4, price: 150 },
    { m: 5, price: 135 },
    { m: 6, price: 125 },
    { m: 7, price: 145 },
    { m: 8, price: 130 },
    { m: 9, price: 120 },
    { m: 10, price: 125 },
    { m: 11, price: 130 },
    { m: 12, price: 150 },
  ];
  useEffect(() => {
    const wc = document.getElementById("weeklyChart") as ChartItem;
    const mc = document.getElementById("monthlyChart") as ChartItem;
    const ac = document.getElementById("annulChart") as ChartItem;

    new Chart(wc, {
      type: "line",
      data: {
        labels: dataWeeklyMock.map((i) => i.d),
        datasets: [
          {
            label: "price",
            data: dataWeeklyMock.map((i) => i.price),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    new Chart(mc, {
      type: "line",
      data: {
        labels: dataMonthlyMock.map((i) => i.w),
        datasets: [
          {
            label: "price",
            data: dataMonthlyMock.map((i) => i.price),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    new Chart(ac, {
      type: "line",
      data: {
        labels: dataAnnulMock.map((i) => i.m),
        datasets: [
          {
            label: "price",
            data: dataAnnulMock.map((i) => i.price),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <Box w="100%" h="100%" p="1rem">
      <Heading fontFamily={"inherit"} mb="1rem">
        Dashboard
      </Heading>
      <Grid
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(3,1fr)",
          "repeat(3,1fr)",
          "repeat(3,1fr)",
          "repeat(3,1fr)",
        ]}
        gap="1rem"
      >
        {detail_price.map((d, index) => {
          return (
            <Stat
              key={index}
              className={classes.statCard}
              onClick={() => setTimeline(d.timeline)}
            >
              <StatLabel>{d.title}</StatLabel>
              <StatNumber>${d.value}</StatNumber>
              <StatHelpText>
                <StatArrow
                  type={d.value >= d.target ? "increase" : "decrease"}
                />
                {((d.value / d.target) * 100 - 100).toPrecision(3)}%
              </StatHelpText>
            </Stat>
          );
        })}
      </Grid>
      <Box bg="#eee" m="0.5rem" borderRadius={"15px"} w="100%">
        <Text color="#000" textAlign={"center"}>
          {timeline === "a"
            ? "Annul Chart"
            : timeline === "m"
            ? "Monthly Chart"
            : "Weekly Chart"}
        </Text>
        <Box display={timeline === "w" ? "block" : "none"}>
          <canvas id="weeklyChart"></canvas>
        </Box>
        <Box display={timeline === "m" ? "block" : "none"}>
          <canvas id="monthlyChart"></canvas>
        </Box>
        <Box display={timeline === "a" ? "block" : "none"}>
          <canvas id="annulChart"></canvas>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
