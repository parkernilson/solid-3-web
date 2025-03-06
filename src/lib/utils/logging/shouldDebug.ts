import { PUBLIC_LOG_LEVEL } from '$env/static/public';
import type { LogLevel } from './log';

export const shouldDebug = () => PUBLIC_LOG_LEVEL === ('debug' satisfies LogLevel);
