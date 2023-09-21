import {
  Box,
  Grid,
  Heading,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import classes from "./Dashboard.module.css";

type StatDetail = {
  title: string;
  value: number;
  target: number;
  type: "report" | "price";
};

const Dashboard: React.FC = () => {
  const detail_price: StatDetail[] = [
    {
      title: "Total Sale (daily)",
      value: 7,
      target: 5,
      type: "price",
    },
    {
      title: "Total Sale (weekly)",
      value: 50,
      target: 35,
      type: "price",
    },
    {
      title: "Total Sale (monthly)",
      value: 128,
      target: 140,
      type: "price",
    },
  ];

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
            <Stat key={index} className={classes.statCard}>
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
    </Box>
  );
};

export default Dashboard;
