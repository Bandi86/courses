import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { BadrequestError } from "../errors/bad-request.js";
import notFound from "../middleware/not-found.js";
import Job from "../models/Job.js";

// GET ALL JOBS
const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
});

// SINGLE ID JOB
const getJob = asyncHandler(async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new notFound("No job with id");
  }
  res.status(StatusCodes.OK).json({ job });
});

// CREATE JOB
const createJob = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
});

//UPDATE JOB PATCH
const updateJob = asyncHandler(async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadrequestError("Company or Position fields cannot be empty");
  }

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new notFound(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
});

//DELETE JOB
const removeJob = asyncHandler(async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new notFound(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
});

export { getAllJobs, getJob, createJob, updateJob, removeJob };
