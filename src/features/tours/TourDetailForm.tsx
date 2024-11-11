import styled from "styled-components";
import { SubmitHandler, useForm, FieldErrors, FieldValues } from "react-hook-form";

import useCreateCabin from "../cabins/useCreateCabin";
import useEditCabin from "../cabins/useEditCabin";
import Button from "~/components/Button";
import { FileInput, Form, FormRow, Input } from "~/components/form";
import Cabin from "~/types/cabin.type";
import toast from "react-hot-toast";
import Textarea from "~/components/form/Textarea";
import { Location, StartDate, StartLocation, Tour, TourInput } from "~/types";
// import { useModalContext } from "~/components/Modal";
// import Cabin from "../../types/cabin.type";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getDataGeolocation } from "~/services/apiGeoService";
import { HiXMark } from "react-icons/hi2";
import useCreateTour from "./useCreateTour";
import useUpdateTour from "./useUpdateTour";

const Buttons = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-left: auto;
  margin-right: 0;
  padding-top: 2rem;
`;

const DateField = styled.div`
display: flex;
flex-direction: column;
gap: 1.2rem;
`;

const DateBox = styled.div`
display: flex;
gap: 1.2rem;
& input{
  border: solid #1414c8;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  outline: none;
  width: 24rem;
}
& .react-datepicker-popper{
  /* width: 20%; */
}
& .react-datepicker{
  /* width: 100%; */
}
& .react-datepicker__navigation--previous {
  /* width: 100%; */
 left: 0;
 /* padding: 2rem; */
 display: flex;
 width: 14%;
 height: 2.4rem;
 /* background-color: #1414c8; */
 justify-content: left;
 padding-left: 0.8rem;
 outline: none;
}
& .react-datepicker__navigation--next {
  /* width: 100%; */
 right: 0;
 /* padding: 2rem; */
 display: flex;
 width: 14%;
 height: 2.4rem;
 /* background-color: #1414c8; */
 justify-content: left;
 padding-left: 0.8rem;
 outline: none;
}
& .react-datepicker__header__dropdown{
  /* width: 100%; */
  
}
& .react-datepicker__header {
  /* width: 100%; */
  /* height: ; */
  /* display: flex;
  flex-direction: column;
  gap: 1rem; */
}
& button{
  width: 10rem;
}
`;

const LocationBox = styled.div`
display: flex;
flex-direction: column;
gap: 1.2rem;
 & a{
  color: #1414c8; 
 }
`;

const LocationSearchBox = styled.div`
display: flex;
gap: 1.2rem;
`;

const LocationsList = styled.div`
display: flex;
gap: 0.6rem;
justify-content: space-between;
margin-top: 0.6rem;
`;

const StartDateList = styled.div`
display: flex;
gap: 0.6rem;
justify-content: space-between;
margin-top: 0.6rem;
`;

const LocationField = styled.div`
display: flex;
flex-direction: column;
gap: 1.2rem;
`;

const Image = styled.img`
width: 30rem;
border-radius: 10px;
`

// const Textarea = styled.textarea`
//   padding: 1.6rem 1.2rem;
//   border-radius: var(--border-radius-sm);
//   /* border-color: inherit; */
//   border: 1.5px solid var(--color-grey-200);
//   width: 55%;
//   resize: none;

//   &:focus {
//     /* border: none; */
//   }
// `;

interface Inputs extends FieldValues {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
}

interface TourFormProps {
  // * because now we can pass in this setShowForm via cloneElement in Modal.Window component so therefore this prop can be optional because we have case we don't need to pass in setShowForm prop tp TourForm when we use it with Modal component right

  onCloseModal?: (show: boolean) => void;
  tour: Tour;
}

// function TourForm({ tourToEdit }: TourFormProps) {
function TourDetailForm({ tour }: TourFormProps) {




  // const { open: setShowForm } = useModalContext()!;
  const { _id: tourId, name, duration, difficulty, description, summary, startDates, startLocation, locations, imageCover, images, maxGroupSize, price, ratingsAverage, ratingsQuantity, type, vip } = tour || {};
  const isWorking = true

  return (
    <Form>
      <FormRow label="name" errorMsg={""}>
        {/* <Input type="text" id="name" {...register("name", { required: true })} /> 
        instead use it with required true we can custom it with the message text to show the message on UI for users right*/}
        <Input
          type="text"
          id="name"
          value={name}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="type" errorMsg={""}>
        <Input
          type="text"
          id="type"
          value={type}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="difficulty" errorMsg={""}>
        <Input
          type="text"
          id="difficulty"
          value={difficulty}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Max Group Size" errorMsg={""}>
        <Input
          type="number"
          id="maxGroupSize"
          value={maxGroupSize}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="price" errorMsg={""}>
        <Input
          type="number"
          id="price"
          value={price}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="duration" errorMsg={""}>
        <Input
          type="number"
          id="duration"
          value={duration}
          disabled={isWorking}
          defaultValue={0}
        />
      </FormRow>

      <FormRow label="summary" errorMsg={""}>
        <Textarea
          id="summary"
          value={summary}
          disabled={isWorking}
        ></Textarea>
      </FormRow>

      <FormRow label="description" errorMsg={""}>
        <Textarea
          id="description"
          value={description}
          disabled={isWorking}
        ></Textarea>
      </FormRow>

      <FormRow label="Image Cover" errorMsg={""} widthOfItem="49rem">
        <Image src={imageCover} id="imageCover" alt="" />
      </FormRow>
      <FormRow label="image 1" errorMsg={""} widthOfItem="49rem">
        <Image src={images[0]} id="image1" alt="" />
      </FormRow>
      <FormRow label="image 2" errorMsg={""} widthOfItem="49rem">
        <Image src={images[1]} id="image2" alt="" />
      </FormRow>
      <FormRow label="image 3" errorMsg={""
      } widthOfItem="49rem">
        <Image src={images[1]} id="image3" alt="" />
      </FormRow >

      <FormRow label="start dates" widthOfItem="40rem" errorMsg={""
      }>
        <DateField>
          {startDates?.map((date: StartDate, ind) => <StartDateList>
            <p>
              <span>Start Date {ind + 1}: </span>
              <span>{new Date(date?.date)?.toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: '2-digit' })}</span>
            </p>
          </StartDateList>
          )}
          {/* <Input
            type="text"
            id="difficulty"
            {...register("difficulty", { required: "This field is required" })}
            disabled={isWorking}
          /> */}
        </DateField>
      </FormRow >

      <FormRow label="start location" widthOfItem="38.6rem" errorMsg={""}>
        <LocationField>
          <LocationBox>
            <>
              {startLocation?.address && <p>{startLocation.address}</p>}</>
          </LocationBox>
          <>
          </>
        </LocationField>
      </FormRow >

      <FormRow label="locations" widthOfItem="42rem" errorMsg={""
      }>
        <LocationField>
          <LocationBox>
            <>
              {locations?.map((loc) => <LocationsList>
                <p>Day {loc.day}: {loc.address}</p>
              </LocationsList>)}</>
          </LocationBox>
          <>
          </>
        </LocationField>
      </FormRow >
    </Form >
  );
}

export default TourDetailForm;
