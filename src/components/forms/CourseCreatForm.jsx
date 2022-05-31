import { Avatar, Badge, Box, Button, styled, Typography } from "@mui/material";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

const TextArea = styled("textarea")(({ theme }) => ({
  width: "20rem",
  height: "8rem",
  border: "1px solid #05386B",
  "&:active": { border: "1px solid #05386B" },
}));

const ContainerBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "1rem",
}));

const BadgeDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginLeft: "4rem",
  cursor: "pointer",
}));

const Header = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: 700,
  color: "#123C69",
  marginBottom: "2rem",
  textTransform: "uppercase",
  letterSpacing: "2px",
}));

const courseCreateForm = ({
  handleSubmit,
  handleImage,
  handleChange,
  values,
  setValues,
  preview,
  handleImageRemove,
}) => {
  const options = [];
  for (let i = 9.99; i <= 19.99; i++) {
    options.push(
      <MenuItem key={i.toFixed(2)} value={i.toFixed(2)} defaultValue={9.99}>
        ${i.toFixed(2)}
      </MenuItem>
    );
  }
  return (
    <React.Fragment>
      <div>
        <form onSubmit={handleSubmit}>
          <ContainerBox className="control-group">
            <Header>Create Course </Header>

            <div className="form-control">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={values.category}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <TextArea
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.paid}
                  onChange={(v) => setValues({ ...values, paid: !values.paid })}
                >
                  <MenuItem value={true}>Paid</MenuItem>
                  <MenuItem value={false}>Free</MenuItem>
                </Select>
              </FormControl>
            </div>
            {values.paid && (
              <div className="form-control">
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={9.99}
                    onChange={(v) => {
                      console.log("v is ", v);
                      setValues({ ...values, price: v.target.value });
                    }}
                  >
                    {options}
                  </Select>
                </FormControl>
              </div>
            )}
          </ContainerBox>
        </form>

        <form>
          <ContainerBox>
            <div className="form-control">
              <BadgeDiv>
                <input
                  type="file"
                  name="loading"
                  onChange={handleImage}
                  accept="image/*"
                  hidden
                />
                <Badge
                  badgeContent="X"
                  color="secondary"
                  onClick={handleImageRemove}
                >
                  <Avatar alt="Travis Howard" src={preview} />
                </Badge>
              </BadgeDiv>
            </div>
            <Button
              variant="contained"
              onClick={handleSubmit}
              color="secondary"
            >
              Save & Continue
            </Button>
          </ContainerBox>
        </form>
      </div>
    </React.Fragment>
  );
};

export default courseCreateForm;
