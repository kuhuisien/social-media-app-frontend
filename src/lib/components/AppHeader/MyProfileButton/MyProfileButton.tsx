import { gql, useQuery } from "@apollo/client";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GET_MY_PROFILE = gql`
  query {
    me {
      id
    }
  }
`;

const MyProfileButton = () => {
  const navigate = useNavigate();

  const { data } = useQuery(GET_MY_PROFILE);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (data && data.me) {
      setUserId(data.me.id);
    }
  }, [data]);

  const onMyProfileButtonClick = () => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <Button key="profile" type="primary" onClick={onMyProfileButtonClick}>
      My profile
    </Button>
  );
};

export default MyProfileButton;
