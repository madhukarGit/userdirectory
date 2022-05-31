import { Box, styled, Avatar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardDiv from "../../pages/CardDiv";

const Container = styled(Box)(({ theme }) => ({
  marginTop: "4rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const BoxContainer = styled(Box)(({ theme }) => ({
  marginTop: "2rem",
}));

const CourseDashboard = () => {
  const [courseData, setCourseData] = useState([]);
  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const { data } = await axios.get("http://localhost:8000/api/courses");
    console.log(data);
    setCourseData(data);
  };

  const mapCourses =
    courseData &&
    courseData.map((c) => (
      <BoxContainer key={c._id}>
        <CardDiv
          title={c.name}
          body={c.description}
          img={c.image.Location}
          id={c.slug}
          lessons={c.lessons.length}
        />
      </BoxContainer>
    ));
  return <Container>{mapCourses}</Container>;
};

export default CourseDashboard;
