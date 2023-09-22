/* eslint-disable react-hooks/exhaustive-deps */
import {
  Badge,
  Box,
  FormControl,
  Grid,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { Pagination } from "antd";
import { useState, useEffect } from "react";
import classes from "./Inventory.module.css";
import mockItems, { Item } from "../../assets/Mock/Items";
import { useForm, Controller } from "react-hook-form";
import { search } from "ss-search";

const Inventory: React.FC = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { control, watch } = useForm();
  const [filterItems, setFilterItems] = useState(mockItems);

  const searchInput = watch("searchInput") || "";

  const onSearch = () => {
    const value = searchInput;
    const searchField = ["title"];
    const result = search(mockItems, searchField, value) as Item[];
    setFilterItems(result);
  };

  useEffect(() => {
    onSearch();
  }, [searchInput]);

  return (
    <Box>
      <Heading fontFamily={"inherit"}>Inventory</Heading>
      <Box>
        <Box mb="0.5rem">
          <Controller
            name="searchInput"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <FormControl>
                <Text>Search Items</Text>
                <Input type="text" {...field} placeholder="search . . ." />
              </FormControl>
            )}
          />
        </Box>
        <Grid
          templateColumns={[
            "repeat(2,1fr)",
            "repeat(2,1fr)",
            "repeat(3,1fr)",
            "repeat(4,1fr)",
            "repeat(5,1fr)",
          ]}
          gap={"1rem"}
        >
          {filterItems
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((i, index) => {
              return (
                <Box key={index} className={classes.itemCard} h="250px">
                  <Image
                    src={i.img}
                    fallbackSrc="/img/empty.jpg"
                    h="180px"
                    w="100%"
                    objectFit={"cover"}
                  />
                  <Box p="0.5rem">
                    <Badge
                      className={classes.itemTitle}
                      textTransform={"capitalize"}
                    >
                      {i.title}
                    </Badge>
                    <Box
                      display="flex"
                      w="100%"
                      justifyContent={"space-between"}
                      alignItems={"flex-end"}
                    >
                      <Text fontSize={"12px"} color="#aaa">
                        Stock : {i.stock}
                      </Text>
                      <Text>${i.price}</Text>
                    </Box>
                  </Box>
                </Box>
              );
            })}
        </Grid>
        <Box w="100%" my="0.5rem" display="flex" justifyContent={"center"}>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={pageSize}
            total={filterItems.length}
            onChange={(page: number, pageSize: number) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            }}
            showSizeChanger
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Inventory;
