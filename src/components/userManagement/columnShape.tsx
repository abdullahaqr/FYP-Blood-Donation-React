import FlexBox from "components/FlexBox";
import { H6, Tiny } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";

const UserListColumnShape = [
  {
    Header: "Name",
    accessor: "name",
    minWidth: 200,
    Cell: ({ row }: any) => {
      const { avatar, name, phone } = row.original;
      return (
        <FlexBox alignItems="center">
          <UkoAvatar src={avatar} />
          <FlexBox flexDirection="column" ml={1}>
            <H6 color="text.primary">{name}</H6>
            <Tiny color="text.disabled">{phone}</Tiny>
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
  {
    Header: "Age",
    accessor: "age",
    minWidth: 150,
  },
  {
    Header: "Gender",
    accessor: "gender",
    minWidth: 100,
    maxWidth: 100,
  },
  {
    Header: "Blood Group",
    accessor: "bloodGroup",
    minWidth: 100,
    maxWidth: 100,
  },
  {
    Header: "Verified",
    accessor: "verified",
    minWidth: 100,
    maxWidth: 100,
  },
];

export default UserListColumnShape;
