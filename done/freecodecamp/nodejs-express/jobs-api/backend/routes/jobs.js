import express from 'express';
import { getAllJobs, getJob, createJob, updateJob, removeJob } from '../controllers/jobs.js';

const router = express.Router();

router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getJob).delete(removeJob).patch(updateJob)

export default router