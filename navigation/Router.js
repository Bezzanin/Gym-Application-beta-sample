import { createRouter } from '@expo/ex-navigation';

import RootNavigation from './RootNavigation';
import HomeScreen from '../screens/HomeScreen';
import ExercisesScreen from '../screens/ExercisesScreen';
import LoginScreen from '../screens/LoginScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import ProgramDashboardScreen from '../screens/ProgramDashboardScreen';
import LogedInDash from '../screens/LogedInDash';
import EditProgramScreen from '../screens/EditProgramScreen';
import EditProgramDashboard from '../screens/EditProgramDashboard';
import QuestionsScreen from '../screens/QuestionsScreen';
import ReplaceExerciseScreen from '../screens/ReplaceExerciseScreen';
import FinishWorkoutScreen from '../screens/FinishWorkoutScreen';
import XDayExercisesScreen from '../screens/XDayExercisesScreen';

import MusclesScreen from '../screens/MusclesScreen';
import NewDiary from '../screens/NewDiary';
import customProgram from '../screens/customProgram';
import customProgramMuscles from '../screens/customProgramMuscles';

export default createRouter(() => ({
  home: () => HomeScreen,
  exercises: () => ExercisesScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
  login:() => LoginScreen,
  exercise: () => ExerciseScreen,
  programs: () => ProgramsScreen,
  programDashboard: () => ProgramDashboardScreen,
  logedInDash: () => LogedInDash,
  editProgramDash: () => EditProgramDashboard,
  editProgram: () => EditProgramScreen,
  questions: () => QuestionsScreen,
  replaceExercise: () => ReplaceExerciseScreen,
  finishWorkout: () => FinishWorkoutScreen,
  XDayExercises: () => XDayExercisesScreen,
  musclesScreen: () => MusclesScreen,
  diary: () => NewDiary,
  customProgram: () => customProgram,
  customProgramMuscles: () => customProgramMuscles,
}));
