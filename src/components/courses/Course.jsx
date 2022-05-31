import { Avatar, Badge, Box, styled } from "@mui/material";
import { useState } from "react";
import React from "react";
import CourseCreateForm from "../forms/CourseCreatForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContainerDiv = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const AvatarDiv = styled(Avatar)(({ theme }) => ({
  height: "25%",
  width: "25%",
  marginLeft: "8rem",
}));

const Course = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    paid: false,
    loading: false,
    imagePreview: "",
    category: "",
  });

  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    console.log("e name ", e.target.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setValues({ ...values, [e.target.name]: true });
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/course/upload-image",
          { image: uri }
        );
        console.log("Image uploaded ", data);
        setImage(data);
        setValues({ ...values, loading: false });
        toast.success("Image uploaded sucessfully");
      } catch (err) {
        console.log(err);
        setValues({ ...values, [e.target.name]: false });
        toast.error("Image upload failed ! try later");
      }
    });
  };

  const handleImageRemove = async (e) => {
    e.preventDefault();

    try {
      setValues({ ...values, loading: true });

      const res = await axios.post(
        "http://localhost:8000/api/course/remove-image",
        {
          image,
        }
      );
      setImage({});
      setPreview("");
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/api/course", {
        ...values,
        image,
      });
      toast("Great, please add lectures !");
      navigate("/courses");
    } catch (err) {
      toast.error("course failed to save !");
    }
  };

  return (
    <ContainerDiv>
      <CourseCreateForm
        handleSubmit={handleSubmit}
        handleImage={handleImage}
        handleChange={handleChange}
        values={values}
        setValues={setValues}
        preview={preview}
        handleImageRemove={handleImageRemove}
      />
      {preview && (
        <React.Fragment>
          <AvatarDiv alt="Travis Howard" src={preview} />
        </React.Fragment>
      )}
    </ContainerDiv>
  );
};

export default Course;
