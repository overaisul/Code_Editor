import util from "util";
import ChildProcess from "child_process";

export const execPromisified = util.promisify(ChildProcess.exec);
