import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGenre } from "../store";

const SelectGenre = ({ genres, type }) => {
  const dispatch = useDispatch();
  return (
    <Select
      className="flex"
      onChange={(e) => {
        dispatch(
          fetchDataByGenre({
            // genres,
            genre: e.target.value,
            type,
          })
        );
      }}
    >
      {genres.slice(1,11).map((genre) => {
        return (
          <option className="OptionChild" value={genre.id} key={genre.id+genre.name}>
            {genre.name}
          </option>
        );
      })}
    </Select>
  );
};

const Select = styled.select`
  margin-left: 3rem;
  cursor: pointer;
  font-size: 1.2rem;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  option{
    font-size: 17px !important;
  }
  }
`;
export default SelectGenre;