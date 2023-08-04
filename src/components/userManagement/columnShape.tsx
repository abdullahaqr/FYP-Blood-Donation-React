import FlexBox from "components/FlexBox";
import { H6, Tiny } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";

const UserListColumnShape = [
  {
    Header: "Name",
    // accessor: "name",
    accessor: "first_name",
    minWidth: 200,
    Cell: ({ row }: any) => {
      // const { avatar, name, phone } = row.original;
      const { avatar, first_name, last_name ,phone_number, seat_no} = row.original;
      return (
        <FlexBox alignItems="center">
          {/* <UkoAvatar src={avatar} /> */}
          <UkoAvatar src={"/static/avatar/001-man.svg"} />
          <FlexBox flexDirection="column" ml={1}>
            <H6 color="text.primary">{first_name + " "+ last_name}</H6>
            {/* <Tiny color="text.disabled">{phone_number}</Tiny> */}
            <Tiny color="text.disabled">{seat_no}</Tiny>
          </FlexBox>
        </FlexBox>
      );
    },
  },
  // {
  //   Header: "Role",
  //   accessor: "role",
  //   minWidth: 200,
  //   Cell: ({ value }: any) => (
  //     <Small
  //       sx={{
  //         borderRadius: 10,
  //         padding: ".2rem 1rem",
  //         color: "background.paper",
  //         backgroundColor: "#A798FF",
  //       }}
  //     >
  //       {value}
  //     </Small>
  //   ),
  // },
  {
    Header: "Email",
    accessor: "email",
    minWidth: 150,
  },
  // {
  //   Header: "Age",
  //   accessor: "age",
  //   minWidth: 150,
  // },
  {
    Header: "Phone Number",
    accessor: "phone_number",
    minWidth: 150,
  },
  {
    Header: "Gender",
    accessor: "gender",
    minWidth: 100,
    maxWidth: 100,
  },
  // {
  //   Header: "Blood Group",
  //   accessor: "blood_group",
  //   minWidth: 100,
  //   maxWidth: 100,
  // },
  // {
  //   Header: "Verified",
  //   accessor: "verified",
  //   minWidth: 100,
  //   maxWidth: 100,
  // },
  {
    Header: "University Name",
    accessor: "university_name",
    minWidth: 100,
    maxWidth: 100,
  },
];


const PostListColumnShape = [
  {
    Header: "Post Name",
    // accessor: "name",
    accessor: "title",
    minWidth: 700,
    Cell: ({ row }: any) => {
      // const { avatar, name, phone } = row.original;
      const { avatar, title, category ,status} = row.original;
      return (
        <FlexBox alignItems="center">
          {/* <UkoAvatar src={avatar} /> */}
          <FlexBox flexDirection="column" ml={1}>
            <H6 color="text.primary">{title}</H6>
            {/* <Tiny color="text.disabled">{phone_number}</Tiny> */}
            <Tiny color="text.disabled">{category}</Tiny>
          </FlexBox>
        </FlexBox>
      );
    },
  },
  {
    Header: "Status",
    accessor: "status",
    minWidth: 100,
  },
  {
    Header: "Actions",
    accessor: "blog-post-actions",
    minWidth: 150,
  },
];

const EventListColumnShape = [
  {
    Header: "Event Name",
    // accessor: "name",
    accessor: "event_name",
    minWidth: 300,
    Cell: ({ row }: any) => {
      // const { avatar, name, phone } = row.original;
      const { avatar, event_name, start_date, end_date, start_time, end_time, city, address , status} = row.original;
      return (
        <FlexBox alignItems="center">
          {/* <UkoAvatar src={avatar} /> */}
          <FlexBox flexDirection="column" ml={1}>
            <H6 color="text.primary">{event_name}</H6>
            {/* <Tiny color="text.disabled">{phone_number}</Tiny> */}
          </FlexBox>
        </FlexBox>
      );
    },
  },
  {
    Header: "Start Date",
    accessor: "start_date",
    minWidth: 100,
  },
  {
    Header: "End Date",
    accessor: "end_date",
    minWidth: 100,
  },
  {
    Header: "Start Time",
    accessor: "start_time",
    minWidth: 100,
  },
  {
    Header: "End Time",
    accessor: "end_time",
    minWidth: 100,
  },
  {
    Header: "Actions",
    accessor: "event-actions",
    minWidth: 150,
  },
];


const BlogCategoryList = [
  {
    Header: "Category Name",
    accessor: "category-name",
    minWidth: 200,
    Cell: ({ row }: any) => {
      const { avatar, name, phone } = row.original;
      return (
        <FlexBox alignItems="center">
          <FlexBox flexDirection="column" ml={1}>
            <H6 color="text.primary">{name}</H6>
          </FlexBox>
        </FlexBox>
      );
    },
  },
  // {
  //   Header: "Role",
  //   accessor: "role",
  //   minWidth: 200,
  //   Cell: ({ value }: any) => (
  //     <Small
  //       sx={{
  //         borderRadius: 10,
  //         padding: ".2rem 1rem",
  //         color: "background.paper",
  //         backgroundColor: "#A798FF",
  //       }}
  //     >
  //       {value}
  //     </Small>
  //   ),
  // },
  {
    Header: "Actions",
    accessor: "blog-categoty-actions",
    minWidth: 150,
  },
];

const GetUniversities = [
  {
    Header: "University_Name",
    accessor: "university-name",
    minWidth: 200,
    Cell: ({ row }: any) => {
      const { avatar, name, phone } = row.original;
      return (
        <FlexBox alignItems="center">
          <FlexBox flexDirection="column" ml={1}>
            <H6 color="text.primary">{name}</H6>
          </FlexBox>
        </FlexBox>
      );
    },
  },
  {
    Header: "Actions",
    accessor: "blog-categoty-actions",
    minWidth: 150,
  },
];

export { BlogCategoryList, EventListColumnShape, GetUniversities, PostListColumnShape, UserListColumnShape };

