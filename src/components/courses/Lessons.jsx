import { Box, Card, styled, Typography, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AddIcon from "@mui/icons-material/Add";

const Container = styled(Box)(({ theme }) => ({
  marginTop: "4rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
}));

const ImgDiv = styled("img")(({ theme }) => ({
  height: "5rem",
  width: "5rem",
  borderRadius: "50%",
}));

const BoxDiv = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  marginTop: "1rem",
}));

const TypoH1 = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: "700",
  color: "#4056A1",
  letterSpacing: "1px",
  backgroundImage: "linear-gradient(to right, white , yellow)",
  borderRadius: "10%",
}));

const TypoLessonsH1 = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  color: "#4056A1",
  letterSpacing: "1px",
  backgroundImage: "linear-gradient(to right, whitesmoke , #5CDB95)",
  borderRadius: "1%",
}));

const FlexColumnDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const AddLessonsDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
}));

const TypoBody = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  letterSpacing: "1px",
  fontWeight: 400,
  color: "#2C3531",
}));

const TypoBody2 = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  letterSpacing: "1px",
  fontWeight: 400,
  color: "#2C3531",
  padding: "10px 1rem",
}));

const MuiButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#8EE4AF",
  borderRadius: "50%",
  "&:hover": {
    backgroundColor: "#BCDB95",
  },
}));

const Lessons = () => {
  const { id } = useParams();
  const [course, setCourse] = useState("");

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/course/${id}`);
    console.log(data);
    setCourse(data);
  };
  return (
    <Container>
      <Card sx={{ width: 400, marginTop: "2rem" }}>
        <BoxDiv>
          <ImgDiv src={course.image ? course.image.Location : "/course.png"} />
          <FlexColumnDiv>
            <TypoH1>{course.name}</TypoH1>
            <TypoBody>
              {course.lessons && course.lessons.length} Lessons
            </TypoBody>
            <TypoBody>{course.category}</TypoBody>
          </FlexColumnDiv>
          <BoxDiv>
            <EditIcon
              sx={{ cursor: "pointer", marginRight: "1rem", color: "#4056a1" }}
            />
            <DoneAllIcon sx={{ cursor: "pointer", color: "#4056a1" }} />
          </BoxDiv>
        </BoxDiv>
        <TypoBody2>{course.description}</TypoBody2>
      </Card>
      <AddLessonsDiv>
        <TypoLessonsH1>Add Lessons</TypoLessonsH1>
        <MuiButton>
          <AddIcon sx={{ width: "4rem", height: "4rem" }} />
        </MuiButton>
      </AddLessonsDiv>
    </Container>
  );
};
export default Lessons;
