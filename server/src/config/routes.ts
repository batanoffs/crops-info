import { Router } from 'express';

import appRouter from '../routes/mainRoutes';

export function configRoutes(app: Router): void {
    app.use('/api', appRouter);
}

export default { configRoutes };
