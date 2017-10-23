import { Router, Request, Response } from 'express';
const router = Router();

router.get('/loading', function (req: Request, res: Response) {
  res.baseRender('common/loading');
});

module.exports = function (app, project) {
  project = project ? `/${project}/common` : '/common';
  app.use(`${project}`, router);
};
