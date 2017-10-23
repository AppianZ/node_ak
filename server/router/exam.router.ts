import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
import checkToken from '../middleware/check.token';
import ExamApi from '../apis/exam';
import CommonApi from '../apis/common';
import * as util from '../libs/util';

router.get('/', checkToken, async function(req: Request, res: Response, next: NextFunction) {
	let examId = req.query.id; // 考试id
	const course = req.query.course;

	const $state = new ExamApi(req).getExamInit(examId, course);
	const wx = new CommonApi(req).wxConfig();
	try {
		const state:any = await $state;
		state.wxConfig = await wx;
		state.app = util.getApplication(req);
    res.baseRender('exam/index', state);
	} catch (err) {
		next(err);
	}
});

router.get('/answer', checkToken, async function(req: Request, res: Response, next: NextFunction) {
	let examId = req.query.id; // 考试id
	const course = req.query.course;

	const $state = new ExamApi(req).getAnalysis(examId, course);
	const wx = new CommonApi(req).wxConfig();
	try {
		const state = await $state;
		state.wxConfig = await wx;
    state.app = util.getApplication(req);
    res.baseRender('exam/answer', state);
	} catch (err) {
		next(err);
	}
});

module.exports = function (app, project) {
	project = project ? `/${project}/exam` : '/exam';
	app.use(`${project}`, router);
};
