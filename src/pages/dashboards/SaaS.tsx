import { Box, Grid, useTheme } from "@mui/material";
import Analytics from "components/Dashboards/saas/Analytics";
import SaaSCard from "components/Dashboards/saas/Card";
import TotalSpent from "components/Dashboards/saas/TotalSpent";
import useTitle from "hooks/useTitle";
import BucketIcon from "icons/BucketIcon";
import EarningIcon from "icons/EarningIcon";
import PeopleIcon from "icons/PeopleIcon";
import WindowsLogoIcon from "icons/WindowsLogoIcon";
import { FC, useEffect, useState } from "react";
import apiHelper from "utils/axiosSetup";
import { endpoint } from "../../constants";

const SaaS: FC = () => {
  // change navbar title
  useTitle("Blood Donation");
  const [data, setData] = useState<any>([])

  useEffect(() => {
    apiHelper("get", endpoint.getDashboardFacts, undefined, true).then((res) => {
      if (res?.status === 200) {
        setData(res.data);
        console.log(res.data);
      }
    })
  }, [])


  const theme = useTheme();

  const cardList = [
    {
      price: data.event,
      Icon: BucketIcon,
      title: "Events",
      color: theme.palette.primary.main,
    },
    {
      price: data.donation,
      title: "Received Blood",
      Icon: EarningIcon,
      color: theme.palette.primary.purple,
    },
    {
      price: data.Volunteer,
      Icon: WindowsLogoIcon,
      title: "Volunteer",
      color: theme.palette.primary.red,
    },
    {
      price: data.donor,
      Icon: PeopleIcon,
      title: "Donors",
      color: theme.palette.primary.yellow,
    },
  ];

  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {cardList.map((card, index) => (
          <Grid item lg={3} xs={6} key={index}>
            <SaaSCard card={card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} pt={4}>
        <Grid item lg={8} md={7} xs={12}>
          <TotalSpent />
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
          <Analytics />
        </Grid>

        {/* <Grid item lg={8} md={7} xs={12}>
          <RecentOrders />
        </Grid>
        <Grid item lg={4} md={5} xs={12}>
          <TopSelling />
        </Grid> */}

        {/* <Grid item xs={12}>
          <Footer imageLink="/static/illustration/sass-dashboard.svg" />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default SaaS;
