"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICourse, ICourseWithAuthor } from "@/app/interfaces/interfaces";
import { getAllCourseApi } from "@/app/api";
import { sliceHelper } from "./sliceHelper";

interface ICourseState {
  allCourses: ICourseWithAuthor[] | null;
  currentCourse: ICourseWithAuthor | null;
  loading: boolean;
  error: string | null;
}

const initialState: ICourseState = {
  allCourses: null,
  currentCourse: null,
  loading: false,
  error: null,
};

export const fetchGetAllCourses = createAsyncThunk("getAllCorses", async () => {
  try {
    return await getAllCourseApi();
  } catch (error) {
    throw error;
  }
});

const coursesSlice = createSlice({
  name: "coursesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    sliceHelper(builder, fetchGetAllCourses).addCase(
      fetchGetAllCourses.fulfilled,
      (state: any, action: any) => {
        state.loading = false;
        state.allCourses = action.payload as ICourse[];
      }
    );
  },
});

export const selectCourses = (state: RootState) => state.courses;

export default coursesSlice.reducer;
