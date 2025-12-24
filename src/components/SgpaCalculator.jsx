import { useState, useEffect } from "react";
import Stepper from "./Stepper";
import { SgpaData } from "../data/SgpaData";
import { gradePoints, gradeOptions } from "../utils/gradeMap";

const SgpaCalculator = () => {
  const semesters = Object.keys(SgpaData);

  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const branches = semester ? Object.keys(SgpaData[semester]) : [];
  const subjects = SgpaData?.[semester]?.[branch] || [];

  const [subjectState, setSubjectState] = useState({});
  const [sgpa, setSgpa] = useState(null);

  /* Initialize subject object */
  useEffect(() => {
    if (subjects.length > 0) {
      const initialState = subjects.reduce((acc, sub) => {
        acc[sub.code] = {
          credits: sub.credits,
          grade: "",
        };
        return acc;
      }, {});
      setSubjectState(initialState);
      setSgpa(null);
    }
  }, [subjects]);

  /* Handle grade change */
  const handleGradeChange = (code, value) => {
    setSubjectState((prev) => ({
      ...prev,
      [code]: {
        ...prev[code],
        grade: value,
      },
    }));
  };

  /* Check if all grades selected */
  const allGradesSelected =
    subjects.length > 0 &&
    subjects.every(
      (sub) => subjectState[sub.code]?.grade !== ""
    );

  /* Calculate SGPA */
  const calculateSGPA = () => {
    let totalCredits = 0;
    let weightedSum = 0;

    Object.values(subjectState).forEach(({ credits, grade }) => {
      if (gradePoints[grade] !== undefined) {
        totalCredits += credits;
        weightedSum += credits * gradePoints[grade];
      }
    });

    const result =
      totalCredits > 0
        ? (weightedSum / totalCredits).toFixed(2)
        : "0.00";

    setSgpa(result);
    setCurrentStep(5);
  };

  return (
    <div className="px-3 sm:px-4">
      {/* Page Title */}
      <div className="w-full mt-10">
        <div
          className="max-w-5xl mx-auto rounded-xl sm:rounded-2xl
          bg-gradient-to-r from-[#0b0f2f]/90 via-[#120b3d]/90 to-[#1a0f4f]/90
          backdrop-blur-xl border border-white/10
          shadow-lg shadow-purple-900/30
          px-5 py-6 sm:px-8 sm:py-8 text-center"
        >
          <h1
            className="text-2xl sm:text-4xl font-bold tracking-wide
            bg-gradient-to-r from-purple-400 to-pink-400
            bg-clip-text text-transparent"
          >
            SGPA Calculator
          </h1>

          <p className="mt-2 text-xs sm:text-base text-gray-300">
            Calculate your Semester Grade Point Average
          </p>
        </div>
      </div>

      {/* Stepper */}
      <Stepper currentStep={currentStep} />

      {/* Selectors */}
      <div className="w-full max-w-5xl mx-auto mt-8">
        <div
          className="flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-6
          bg-white/5 backdrop-blur-xl border border-white/10
          rounded-xl p-4 sm:p-6 shadow-md shadow-purple-900/20"
        >
          {/* Semester */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-300">
              Select Semester
            </label>
            <select
              value={semester}
              onChange={(e) => {
                setSemester(e.target.value);
                setBranch("");
                setCurrentStep(2);
              }}
              className="w-full rounded-lg px-4 py-3
              bg-[#0b0f2f] text-white text-sm
              border border-purple-500/40
              focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="" disabled>
                Choose Semester
              </option>
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>

          {/* Branch */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-300">
              Select Branch
            </label>
            <select
              value={branch}
              onChange={(e) => {
                setBranch(e.target.value);
                setCurrentStep(3);
              }}
              disabled={!semester}
              className="w-full rounded-lg px-4 py-3
              bg-[#0b0f2f] text-white text-sm
              border border-white/20
              focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="" disabled>
                Choose Branch
              </option>
              {branches.map((br) => (
                <option key={br} value={br}>
                  {br}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Subjects */}
      {currentStep >= 3 && (
        <div className="max-w-5xl mx-auto mt-8">
          <div
            className="bg-white/5 backdrop-blur-xl border border-white/10
            rounded-xl p-4 sm:p-6 shadow-lg shadow-purple-900/30"
          >
            <h2 className="text-lg font-semibold text-white mb-4">
              Enter Grades
            </h2>

            <div className="space-y-4">
              {subjects.map((sub) => (
                <div
                  key={sub.code}
                  className="flex flex-col gap-3
                  bg-[#0b0f2f]/80 rounded-xl p-4
                  border border-white/10"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {sub.code} — {sub.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      Credits: {sub.credits}
                    </p>
                  </div>

                  <select
                    value={subjectState[sub.code]?.grade || ""}
                    onChange={(e) =>
                      handleGradeChange(sub.code, e.target.value)
                    }
                    className="w-full rounded-lg px-4 py-3
                    bg-[#0b0f2f] text-white text-sm
                    border border-purple-500/40
                    focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="" disabled>
                      Select Grade
                    </option>
                    {gradeOptions.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Calculate Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={calculateSGPA}
                disabled={!allGradesSelected}
                className={`w-full sm:w-auto
                  px-8 py-3 rounded-xl text-sm font-semibold transition
                  ${
                    allGradesSelected
                      ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/40"
                      : "bg-gray-600/40 text-gray-400 cursor-not-allowed"
                  }`}
              >
                Calculate SGPA
              </button>
            </div>

            {/* Result */}
            {sgpa && (
              <div
                className="mt-6 rounded-xl text-center
                bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-purple-600/20
                border border-purple-500/30 backdrop-blur-xl
                shadow-lg shadow-purple-900/30 p-5"
              >
                <p className="text-xs text-gray-300">
                  Your SGPA
                </p>
                <h3 className="text-3xl font-extrabold text-purple-400 mt-1">
                  {sgpa}
                </h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SgpaCalculator;
