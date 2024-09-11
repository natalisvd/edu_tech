"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICourse, ICourseWithAuthor } from "@/app/interfaces/interfaces";
import {
  createCourseApi,
  deleteCourseApi,
  getAllCourseApi,
  updateCourseApi,
} from "@/app/api";
import { sliceHelper } from "./sliceHelper";

interface ICoursesState {
  allCourses: ICourseWithAuthor[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ICoursesState = {
  allCourses: null,
  loading: false,
  error: null,
};

export const fetchGetAllCourses = createAsyncThunk("fetchGetAllCourses", async () => {
  try {
    return await getAllCourseApi();
  } catch (error) {
    throw error;
  }
});

export const fetchCreateCourse = createAsyncThunk(
  "fetchCreateCourse",
  async (body: FormData) => {
    try {
      return await createCourseApi(body);
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUpdateCourse = createAsyncThunk(
  "fetchUpdateCourse",
  async ({ courseId, formData }: { courseId: string; formData: FormData }) => {
    try {
      return await updateCourseApi(courseId, formData);
    } catch (error) {
      throw error;
    }
  }
);

export const fetchDeleteCourse = createAsyncThunk(
  "fetchDeleteCourse",
  async (courseId: string) => {
    try {
      return await deleteCourseApi(courseId);
    } catch (error) {
      throw error;
    }
  }
);

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
    sliceHelper(builder, fetchCreateCourse).addCase(
      fetchCreateCourse.fulfilled,
      (state: any, action: any) => {
        state.loading = false;
        state.allCourses = [...state.allCourses, action.payload];
      }
    );
    sliceHelper(builder, fetchUpdateCourse).addCase(
      fetchUpdateCourse.fulfilled,
      (state: any, action: any) => {
        state.loading = false;
        state.allCourses = state.allCourses.map((course: ICourse) =>
          course.id === action.payload.id ? action.payload : course
        );
      }
    );
    sliceHelper(builder, fetchDeleteCourse).addCase(
      fetchDeleteCourse.fulfilled,
      (state: any, action: any) => {
        state.loading = false;
        state.allCourses = [...state.allCourses.filter(
          (course: ICourse) => course.id !== action.payload.id
        )]
      }
    );
  },
});

export const selectCourses = (state: RootState) => state.courses;

export default coursesSlice.reducer;
