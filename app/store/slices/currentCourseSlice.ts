import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  ICourse,
  ICourseWithAuthor,
  ILesson,
} from "@/app/interfaces/interfaces";
import { addLessonToCourseApi, getCourseByIdApi } from "@/app/api";
import { sliceHelper } from "./sliceHelper";

interface ICurrentCourseState {
  currentCourse: ICourseWithAuthor | null;
  loading: boolean;
  error: string | null;
}
const initialState: ICurrentCourseState = {
  currentCourse: null,
  loading: false,
  error: null,
};

export const fetchGetCourseById = createAsyncThunk(
  "fetchGetCourseById",
  async (id: string) => {
    try {
      return await getCourseByIdApi(id);
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAddLessonToCourse = createAsyncThunk(
  "fetchAddLessonToCourse",
  async (body: ILesson) => {
    try {
      return await addLessonToCourseApi(body);
    } catch (error) {
      throw error;
    }
  }
);

const currentCourseSlice = createSlice({
  name: "currentCourseSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    sliceHelper(builder, fetchGetCourseById).addCase(
      fetchGetCourseById.fulfilled,
      (state: any, action: any) => {
        state.loading = false;
        state.currentCourse = action.payload as ICourse;
      }
    );
    sliceHelper(builder, fetchAddLessonToCourse).addCase(
      fetchAddLessonToCourse.fulfilled,
      (state: any, action: any) => {
        state.loading = false;
        state.currentCourse = {
          ...state.currentCourse,
          lessons: [...state.currentCourse.lessons, action.payload],
        };
      }
    );
  },
});

export const selectCourses = (state: RootState) => state.currentCourse;

export default currentCourseSlice.reducer;
