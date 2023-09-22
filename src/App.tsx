import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Heading,
  Text,
  useDisclosure,
  DrawerCloseButton,
} from "@chakra-ui/react";
import classes from "./App.module.css";
import { AiFillSetting } from "react-icons/ai";
import { FaCashRegister, FaWarehouse } from "react-icons/fa";
import { BiSolidGroup, BiSolidDashboard } from "react-icons/bi";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoGraph } from "react-icons/go";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import "./App.scss";
import Pos from "./Pages/PoS/Pos";
import Inventory from "./Pages/Inventory/Inventory";
import Employee from "./Pages/Employee/Employee";
import Report from "./Pages/Report/Report";
import Setting from "./Pages/Setting/Setting";

type Menu = {
  onClick?: () => void;
  title: string;
  icon: React.ReactNode;
  path?: string;
};

function App() {
  const navigate = useNavigate();
  const username = "tester";
  const email = "tester@email.com";
  const projectId = "askfjoiawefjasdfmzcxweaf";

  const path = location.pathname;

  const menu: Menu[] = [
    {
      onClick: () => {
        navigate("/");
      },
      path: "/",
      title: "Dashboard",
      icon: <BiSolidDashboard />,
    },
    {
      onClick: () => {
        navigate("/pos");
      },
      title: "PoS",
      path: "/pos",
      icon: <FaCashRegister />,
    },
    {
      onClick: () => {
        navigate("/inventory");
      },
      title: "Inventory",
      path: "/inventory",
      icon: <FaWarehouse />,
    },
    {
      onClick: () => {
        navigate("/employee");
      },
      title: "Employee",
      path: "/employee",
      icon: <BiSolidGroup />,
    },
    {
      onClick: () => {
        navigate("/report");
      },
      title: "Report",
      path: "/report",
      icon: <GoGraph />,
    },
    {
      onClick: () => {
        window.open(
          `https://crafting-ticket-dev.web.app/?username=${username}&email=${email}&projectId=${projectId}`,
          "_blank"
        );
      },
      title: "แจ้งปัญหา",
      icon: <RiCustomerService2Fill />,
    },
    {
      onClick: () => {
        navigate("/setting");
      },
      title: "Setting",
      path: "/setting",
      icon: <AiFillSetting />,
    },
    {
      onClick: () => {
        navigate("/");
      },
      title: "Logout",
      icon: <FiLogOut />,
    },
  ];

  return (
    <Box w="100vw" h="100dvh" bg="#232323" color="#fff">
      <Box
        position="fixed"
        top="0px"
        display={["flex", "none", "none", "none", "none", "none"]}
        w="100%"
        p="0.5rem"
        bg="#000"
      >
        <MenuDrawer menu={menu} path={path} />
        <Heading textAlign={"center"} w="full">
          Brand Logo
        </Heading>
      </Box>
      <Box w="100%" flex={"auto"} h="100%" overflow="auto" display="flex">
        <Box
          w="15%"
          className={classes.navBar}
          h="100%"
          overflowY={"auto"}
          display={["none", "block", "block", "block", "block", "block"]}
        >
          <Heading className={classes.logo}>Brand Logo</Heading>
          <Box className={classes.navPanel}>
            {menu.map((m, index) => {
              return (
                <Box
                  key={index}
                  onClick={m.onClick}
                  className={
                    m.path && m.path === path ? classes.currentPage : ""
                  }
                >
                  {m.icon}
                  <Text className={classes.navText}>{m.title}</Text>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box
          w="100%"
          className={classes.webContent}
          overflowY="auto"
          maxH="100vh"
          pt={["3.5rem", "0", "0", "0", "0", "0"]}
        >
          <Box w="100%" h="100%" p="1rem">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pos" element={<Pos />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/report" element={<Report />} />
              <Route path="/setting" element={<Setting />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;

interface MenuDrawerProps {
  menu: Menu[];
  path: string;
}
const MenuDrawer: React.FC<MenuDrawerProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { menu, path } = props;
  return (
    <>
      <Button
        variant={"unstyled"}
        onClick={onOpen}
        border="1px solid #aaa5"
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <RxHamburgerMenu />
      </Button>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#333" color="#fff">
          <DrawerCloseButton />
          <DrawerBody className={classes.navPanelDrawer}>
            <Heading fontFamily={"inherit"} textAlign={"center"}>
              Menu
            </Heading>
            {menu.map((i, index) => {
              return (
                <Box
                  key={index}
                  onClick={i.onClick}
                  bg={path === i.path ? "#aaa5" : "#0000"}
                >
                  {i.icon}
                  {i.title}
                </Box>
              );
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
